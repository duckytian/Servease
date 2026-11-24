import { useEffect, useMemo, useState } from 'react'
import RegistrarLayout from './components/RegistrarLayout.jsx'
import { initialRequestsData } from './pages/data.js'
import DashboardOverview from './pages/DashboardOverview.jsx'
import RequestDetails from './pages/RequestDetails.jsx'
import RequestTable from './pages/RequestTable.jsx'
import StaffSettingsModal from './pages/StaffSettingsModal.jsx'
import StudentPortalView from './pages/StudentPortalView.jsx'
import TechStackAndWorkflowModal from './pages/TechStackAndWorkflowModal.jsx'
import UpdateStatusModal from './pages/UpdateStatusModal.jsx'

function RegistrarDashboard({ initialView = 'dashboard' }) {
  // Navigation states: 'dashboard', 'requests', 'student-view'
  const [activeNav, setActiveNav] = useState(initialView)

  // In-page status filter when arriving from dashboard cards or switching
  const [requestStatusFilter, setRequestStatusFilter] = useState('All Statuses')

  // Requests state initialized with realistic data records
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('servease_registrar_requests')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Normalize any legacy rejected requests to Processing
        return parsed.map((r) =>
          r.status === 'Rejected' ? { ...r, status: 'Processing' } : r
        )
      } catch (e) {
        console.error('Failed to parse saved requests', e)
      }
    }
    return initialRequestsData
  })

  // Selected request for details view
  const [selectedRequest, setSelectedRequest] = useState(null)

  // Update Status modal state
  const [updatingRequest, setUpdatingRequest] = useState(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  // Tech stack & workflow modal state
  const [isTechStackModalOpen, setIsTechStackModalOpen] = useState(false)

  // Staff settings modal state
  const [isStaffSettingsOpen, setIsStaffSettingsOpen] = useState(false)

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null)

  // Persist requests to localStorage for live session continuity
  useEffect(() => {
    localStorage.setItem('servease_registrar_requests', JSON.stringify(requests))
  }, [requests])

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
        if (isStaffSettingsOpen) setIsStaffSettingsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isUpdateModalOpen, isTechStackModalOpen, isStaffSettingsOpen])

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
    const timeFormatted =
      now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }) +
      ' ' +
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })

    setRequests((prev) =>
      prev.map((item) => {
        if (item.ref !== ref) return item

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

  // Handle navigation from sidebar or dashboard cards
  const handleNavigate = (navKey, filterStatus = null) => {
    setActiveNav(navKey)
    setSelectedRequest(null)
    if (filterStatus) {
      setRequestStatusFilter(filterStatus)
    }
  }

  return (
    <RegistrarLayout
      activeNav={activeNav}
      onNavigate={handleNavigate}
      onSwitchToStudentView={() => {
        setActiveNav('student-view')
        setSelectedRequest(null)
      }}
      onOpenTechStackModal={() => setIsTechStackModalOpen(true)}
      onOpenStaffSettings={() => setIsStaffSettingsOpen(true)}
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

          {/* Staff Settings Modal */}
          {isStaffSettingsOpen && (
            <StaffSettingsModal
              isOpen={isStaffSettingsOpen}
              onClose={() => setIsStaffSettingsOpen(false)}
            />
          )}

          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#bbf7d0] bg-[#073b23] px-4 py-3 text-[13px] font-semibold text-white shadow-xl animate-fade-in">
              <span className="grid size-6 place-items-center rounded-full bg-[#16a34a] text-white">
                &check;
              </span>
              <span>{toastMessage}</span>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="ml-2 text-white/70 hover:text-white"
              >
                &times;
              </button>
            </div>
          )}
        </>
      }
    >
      {/* 1. Request Details View */}
      {selectedRequest ? (
        <RequestDetails
          request={selectedRequest}
          onBack={handleBackToList}
          onOpenUpdateModal={handleOpenUpdateModal}
        />
      ) : activeNav === 'student-view' ? (
        /* 2. Student Portal View */
        <StudentPortalView
          requests={requests}
          onBackToRegistrar={() => setActiveNav('dashboard')}
        />
      ) : activeNav === 'dashboard' ? (
        /* 3. Main Registrar Dashboard */
        <DashboardOverview
          requests={requests}
          statusCounts={statusCounts}
          onOpenRequest={handleOpenRequest}
          onNavigate={handleNavigate}
        />
      ) : (
        /* 4. Request Management Page (REQUESTS) with in-page Status and Type filtering */
        <RequestTable
          key={requestStatusFilter}
          requests={requests}
          initialStatusFilter={requestStatusFilter}
          onOpenRequest={handleOpenRequest}
          onOpenUpdateModal={handleOpenUpdateModal}
          onShowToast={showToast}
        />
      )}
    </RegistrarLayout>
  )
}

export default RegistrarDashboard
