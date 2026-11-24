import { useEffect, useMemo, useState } from 'react'
import { useRequests } from '../../data/requestStore.js'
import ITLayout from './components/ITLayout.jsx'
import DashboardOverview from './pages/DashboardOverview.jsx'
import RequestDetails from './pages/RequestDetails.jsx'
import RequestTable from './pages/RequestTable.jsx'
import UpdateStatusModal from './pages/UpdateStatusModal.jsx'

function ITDashboard({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [requests, setRequests] = useRequests()
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [updatingRequest, setUpdatingRequest] = useState(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

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
    const counts = { Pending: 0, Processing: 0, Completed: 0 }
    requests.forEach((request) => {
      if (counts[request.status] !== undefined) counts[request.status]++
    })
    return counts
  }, [requests])

  const activeFilterStatus =
    activeNav === 'pending'
      ? 'Pending'
      : activeNav === 'processing'
        ? 'Processing'
        : activeNav === 'completed'
          ? 'Completed'
          : null

  const handleNavigate = (navKey) => {
    setActiveNav(navKey)
    setSelectedRequest(null)
  }

  const handleSaveStatusUpdate = ({ ref, newStatus, remarks, technician }) => {
    const now = new Date()
    const time = `${now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })} ${now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })}`

    setRequests((previous) =>
      previous.map((item) => {
        if (item.ref !== ref) return item
        const step =
          newStatus === 'Completed'
            ? 'Issue Resolved'
            : newStatus === 'Processing'
              ? 'Assigned for Technical Processing'
              : 'Status Updated'
        const updated = {
          ...item,
          status: newStatus,
          remarks,
          remarksTimestamp: time,
          technician: technician || item.technician || '',
          statusHistory: [
            ...(item.statusHistory || []),
            { step, time, note: remarks, status: newStatus },
          ],
        }
        if (selectedRequest?.ref === ref) setSelectedRequest(updated)
        return updated
      }),
    )

    setIsUpdateModalOpen(false)
    setUpdatingRequest(null)
    setToastMessage(`Request ${ref} updated to "${newStatus}".`)
  }

  return (
    <ITLayout
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
              <button type="button" onClick={() => setToastMessage(null)} className="ml-2 text-white/70 hover:text-white">&times;</button>
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
          requests={requests}
          activeFilterStatus={activeFilterStatus}
          onOpenRequest={setSelectedRequest}
          onShowToast={setToastMessage}
        />
      )}
    </ITLayout>
  )
}

export default ITDashboard
