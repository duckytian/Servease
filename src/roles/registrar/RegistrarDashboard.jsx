import { useEffect, useMemo, useState } from 'react'
import { useRequests } from '../../data/requestStore.js'
import RegistrarLayout from './components/RegistrarLayout.jsx'
import DashboardOverview from './pages/DashboardOverview.jsx'
import RequestDetails from './pages/RequestDetails.jsx'
import RequestTable from './pages/RequestTable.jsx'
import StudentPortalView from './pages/StudentPortalView.jsx'
import TechStackAndWorkflowModal from './pages/TechStackAndWorkflowModal.jsx'
import UpdateStatusModal from './pages/UpdateStatusModal.jsx'

function RegistrarDashboard({ initialView = 'dashboard', onLogout }) {
  // Navigation states: 'dashboard', 'all-requests', 'pending', 'processing', 'completed', 'student-view'
  const [activeNav, setActiveNav] = useState(initialView)

  const [requests, setRequests] = useRequests()

  // Selected request for details view
  const [selectedRequest, setSelectedRequest] = useState(null)

  // Update Status modal state
  const [updatingRequest, setUpdatingRequest] = useState(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  // Tech stack & workflow modal state
  const [isTechStackModalOpen, setIsTechStackModalOpen] = useState(false)

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null)

  // Clear toast after 4 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  // Handle ESC key to close modals or go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isUpdateModalOpen) setIsUpdateModalOpen(false)
        if (isTechStackModalOpen) setIsTechStackModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isUpdateModalOpen, isTechStackModalOpen])

  // Calculate status counts dynamically
  const statusCounts = useMemo(() => {
    const counts = { Pending: 0, Processing: 0, Completed: 0 }
    requests.forEach((req) => {
      const st = req.status
      if (counts[st] !== undefined) {
        counts[st]++
      }
    })
    return counts
  }, [requests])

  // Filter requests based on active sidebar navigation
  const activeFilterStatus = useMemo(() => {
    if (activeNav === 'pending') return 'Pending'
    if (activeNav === 'processing') return 'Processing'
    if (activeNav === 'completed') return 'Completed'
    return null
  }, [activeNav])

  const showToast = (message) => {
    setToastMessage(message)
  }

  // Handle opening request details
  const handleOpenRequest = (req) => {
    setSelectedRequest(req)
  }

  // Handle closing request details and returning to current list
  const handleBackToList = () => {
    setSelectedRequest(null)
  }

  // Handle opening Update Status modal
  const handleOpenUpdateModal = (req) => {
    setUpdatingRequest(req)
    setIsUpdateModalOpen(true)
  }

  // Handle saving status and remarks update
  const handleSaveStatusUpdate = ({ ref, newStatus, remarks }) => {
    const now = new Date()
    const timeFormatted = now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }) + ' ' + now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })

    setRequests((prev) =>
      prev.map((item) => {
        if (item.ref !== ref) return item

        // Create new step in status history
        const newStepTitle =
          newStatus === 'Completed'
            ? 'Document Ready & Released'
            : newStatus === 'Processing'
              ? 'Under Active Processing'
              : 'Status Updated'

        const updatedHistory = [
          ...(item.statusHistory || []),
          {
            step: newStepTitle,
            time: timeFormatted,
            note: remarks,
            status: newStatus,
          },
        ]

        const updated = {
          ...item,
          status: newStatus,
          remarks: remarks,
          remarksTimestamp: timeFormatted,
          statusHistory: updatedHistory,
        }

        // If this is currently selected in request details, keep it in sync
        if (selectedRequest && selectedRequest.ref === ref) {
          setSelectedRequest(updated)
        }

        return updated
      })
    )

    setIsUpdateModalOpen(false)
    setUpdatingRequest(null)
    showToast(`Request ${ref} status updated to "${newStatus}" and remarks saved.`)
  }

  const handleNavigate = (navKey) => {
    setActiveNav(navKey)
    setSelectedRequest(null)
  }

  return (
    <RegistrarLayout
      activeNav={activeNav}
      onNavigate={handleNavigate}
      onLogout={onLogout}
      onSwitchToStudentView={() => {
        setActiveNav('student-view')
        setSelectedRequest(null)
      }}
      onOpenTechStackModal={() => setIsTechStackModalOpen(true)}
      statusCounts={statusCounts}
      totalCount={requests.length}
      overlays={
        <>
          {/* Update Status & Remarks Modal */}
          {isUpdateModalOpen && updatingRequest && (
            <UpdateStatusModal
              request={updatingRequest}
              isOpen={isUpdateModalOpen}
              onClose={() => {
                setIsUpdateModalOpen(false)
                setUpdatingRequest(null)
              }}
              onSave={handleSaveStatusUpdate}
            />
          )}

          {/* Tech Stack & Workflow Modal */}
          {isTechStackModalOpen && (
            <TechStackAndWorkflowModal
              isOpen={isTechStackModalOpen}
              onClose={() => setIsTechStackModalOpen(false)}
            />
          )}

          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="toast-notification" role="status">
              <span className="toast-notification__icon" aria-hidden="true">
                &check;
              </span>
              <span className="toast-notification__message">{toastMessage}</span>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                aria-label="Dismiss notification"
                className="toast-notification__close"
              >
                &times;
              </button>
            </div>
          )}
        </>
      }
    >
      {/* 1. Request Details View (Panel 4) */}
      {selectedRequest ? (
        <RequestDetails
          request={selectedRequest}
          onBack={handleBackToList}
          onOpenUpdateModal={handleOpenUpdateModal}
        />
      ) : activeNav === 'student-view' ? (
        /* 2. Student Portal View (Panel 6) */
        <StudentPortalView
          requests={requests}
          onBackToRegistrar={() => setActiveNav('dashboard')}
        />
      ) : activeNav === 'dashboard' ? (
        /* 3. Main Registrar Dashboard (Panel 2) */
        <DashboardOverview
          requests={requests}
          statusCounts={statusCounts}
          onOpenRequest={handleOpenRequest}
          onNavigate={handleNavigate}
        />
      ) : (
        /* 4. View Requests Table (Panel 3: All, Pending, Processing, Completed, Rejected) */
        <RequestTable
          requests={requests}
          activeFilterStatus={activeFilterStatus}
          onOpenRequest={handleOpenRequest}
          onShowToast={showToast}
        />
      )}
    </RegistrarLayout>
  )
}

export default RegistrarDashboard