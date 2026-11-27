import { useEffect, useMemo, useState } from 'react'
import { updateOsasStatus, useOsasRequests } from '../../../../data/osasApi.js'
import OSASLayout from '../../components/OSASLayout.jsx'
import DashboardOverview from './DashboardOverview.jsx'
import RequestDetails from './RequestDetails.jsx'
import RequestTable from './RequestTable.jsx'
import UpdateStatusModal from './UpdateStatusModal.jsx'

function OSASDashboard({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('dashboard')
  const { requests: allRequests, error: loadError, reload } = useOsasRequests()
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [updatingRequest, setUpdatingRequest] = useState(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const requests = useMemo(
    () => allRequests.filter((request) => request.department?.toLowerCase() === 'osas'),
    [allRequests],
  )

  useEffect(() => {
    if (loadError) setToastMessage(loadError)
  }, [loadError])

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

  const handleSaveStatusUpdate = async ({ ref, newStatus, remarks, assignedStaff }) => {
    try {
      const updated = await updateOsasStatus(ref, { newStatus, remarks, assignedStaff })
      await reload()
      if (selectedRequest?.ref === ref) setSelectedRequest(updated)
      setIsUpdateModalOpen(false)
      setUpdatingRequest(null)
      setToastMessage(`OSAS request ${ref} updated to "${newStatus}".`)
    } catch (err) {
      setToastMessage(`Not saved: ${err.message}`)
    }
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
              <span className="grid size-6 place-items-center rounded-full bg-[#16a34a]">✓</span>
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