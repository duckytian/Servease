import { useEffect, useMemo, useState } from 'react'
import { useRequests } from '../../data/requestStore.js'
import OSASLayout from './components/OSASLayout.jsx'
import DashboardOverview from './pages/DashboardOverview.jsx'
import RequestDetails from './pages/RequestDetails.jsx'
import RequestTable from './pages/RequestTable.jsx'
import UpdateStatusModal from './pages/UpdateStatusModal.jsx'

function OSASDashboard({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [allRequests, setAllRequests] = useRequests()
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [updatingRequest, setUpdatingRequest] = useState(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const requests = useMemo(
    () => allRequests.filter((request) => request.department?.toLowerCase() === 'osas'),
    [allRequests],
  )

  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 4000)
    return () => clearTimeout(timer)
  }, [toastMessage])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsUpdateModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const statusCounts = useMemo(() => {
    const counts = { Pending: 0, Processing: 0, Completed: 0, Rejected: 0 }
    requests.forEach((request) => {
      if (counts[request.status] !== undefined) counts[request.status]++
    })
    return counts
  }, [requests])

  const activeFilterStatus = {
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    rejected: 'Rejected',
  }[activeNav] ?? null

  const handleSaveStatusUpdate = ({ ref, newStatus, remarks, assignedStaff }) => {
    const now = new Date()
    const time = `${now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })} ${now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })}`

    setAllRequests((previous) =>
      previous.map((request) => {
        if (request.ref !== ref) return request
        const step =
          newStatus === 'Completed'
            ? 'Service Fulfilled'
            : newStatus === 'Rejected'
              ? 'Request Declined'
              : newStatus === 'Processing'
                ? 'Request Under Review'
                : 'Status Updated'
        const updated = {
          ...request,
          status: newStatus,
          remarks,
          remarksTimestamp: time,
          assignedStaff,
          statusHistory: [
            ...(request.statusHistory || []),
            { step, time, note: remarks, status: newStatus },
          ],
        }
        if (selectedRequest?.ref === ref) setSelectedRequest(updated)
        return updated
      }),
    )

    setIsUpdateModalOpen(false)
    setUpdatingRequest(null)
    setToastMessage(`OSAS request ${ref} updated to "${newStatus}".`)
  }

  const handleNavigate = (navKey) => {
    setActiveNav(navKey)
    setSelectedRequest(null)
  }

  return (
    <OSASLayout
      activeNav={activeNav}
      user={user}
      onNavigate={handleNavigate}
      onLogout={onLogout}
      statusCounts={statusCounts}
      totalCount={requests.length}
      overlays={
        <>
          {isUpdateModalOpen && updatingRequest && (
            <UpdateStatusModal
              key={updatingRequest.ref}
              request={updatingRequest}
              isOpen={isUpdateModalOpen}
              onClose={() => {
                setIsUpdateModalOpen(false)
                setUpdatingRequest(null)
              }}
              onSave={handleSaveStatusUpdate}
            />
          )}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#bbf7d0] bg-[#073b23] px-4 py-3 text-[13px] font-semibold text-white shadow-xl">
              <span className="grid size-6 place-items-center rounded-full bg-[#16a34a]">&check;</span>
              <span>{toastMessage}</span>
              <button type="button" onClick={() => setToastMessage(null)} className="ml-2 text-white/70 hover:text-white" aria-label="Dismiss notification">&times;</button>
            </div>
          )}
        </>
      }
    >
      {selectedRequest ? (
        <RequestDetails
          request={selectedRequest}
          onBack={() => setSelectedRequest(null)}
          onOpenUpdateModal={(request) => {
            setUpdatingRequest(request)
            setIsUpdateModalOpen(true)
          }}
        />
      ) : activeNav === 'dashboard' ? (
        <DashboardOverview
          requests={requests}
          statusCounts={statusCounts}
          onOpenRequest={setSelectedRequest}
          onNavigate={handleNavigate}
        />
      ) : (
        <RequestTable
          key={activeNav}
          requests={requests}
          activeFilterStatus={activeFilterStatus}
          onOpenRequest={setSelectedRequest}
          onShowToast={setToastMessage}
        />
      )}
    </OSASLayout>
  )
}

export default OSASDashboard
