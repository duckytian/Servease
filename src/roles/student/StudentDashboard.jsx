import { useEffect, useState } from 'react'
import StudentLayout from './components/StudentLayout.jsx'
import AddRequestModal from './pages/AddRequestModal.jsx'
import DashboardOverview from './pages/DashboardOverview.jsx'
import MyRequests from './pages/MyRequests.jsx'
import RequestDetails from './pages/RequestDetails.jsx'
import {
  departmentFilters,
  departmentTitles,
  emptyRequest,
  initialRequests,
  statuses,
  student,
} from './pages/data.js'
import { CalendarIcon, CheckIcon, ClockIcon, ListIcon } from './pages/icons.jsx'

function StudentDashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requests, setRequests] = useState(initialRequests)
  const [newRequest, setNewRequest] = useState(emptyRequest)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedRequest(null)
        setShowNotifications(false)
        setShowRequestForm(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isDepartmentView = Boolean(departmentFilters[activeSection])
  const visibleRows = isDepartmentView
    ? requests.filter((request) => request.department === departmentFilters[activeSection])
    : requests

  const statusCounts = statuses.reduce((counts, status) => {
    counts[status] = requests.filter((request) => request.status === status).length
    return counts
  }, {})

  const summaryCards = [
    {
      title: 'Total Requests',
      count: requests.length,
      description: 'All submitted service requests.',
      tone: 'total',
      Icon: CalendarIcon,
    },
    {
      title: 'Pending Requests',
      count: statusCounts.Pending,
      description: 'Requests awaiting review.',
      tone: 'pending',
      Icon: ClockIcon,
    },
    {
      title: 'Processing Requests',
      count: statusCounts.Processing,
      description: 'Requests currently being handled.',
      tone: 'processing',
      Icon: ListIcon,
    },
    {
      title: 'Completed Requests',
      count: statusCounts.Completed,
      description: 'Successfully completed requests.',
      tone: 'completed',
      Icon: CheckIcon,
    },
  ]

  const handleNavigate = (section) => {
    setActiveSection(section)
    setShowNotifications(false)
  }

  const handleToggleNotifications = () => setShowNotifications((current) => !current)

  const handleCloseNotifications = () => setShowNotifications(false)

  const handleRequestFormChange = (event) => {
    const { name, value } = event.target
    setNewRequest((current) => ({ ...current, [name]: value }))
  }

  const handleRequestFormSubmit = (event) => {
    event.preventDefault()

    const nextNumber =
      Math.max(...requests.map((request) => Number(request.ref.replace('SER-', '')))) + 1
    const submittedRequest = {
      ref: `SER-${String(nextNumber).padStart(4, '0')}`,
      department: newRequest.department,
      type: newRequest.type.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      status: 'Pending',
      remarks: newRequest.details.trim() || 'Awaiting review',
    }

    setRequests((current) => [submittedRequest, ...current])
    setNewRequest(emptyRequest)
    setShowRequestForm(false)
  }

  const heading =
    activeSection === 'dashboard'
      ? `Welcome! ${student.name} | Student ID: ${user?.userId ?? student.id}`
      : activeSection === 'my-requests'
        ? 'My Requests'
        : departmentTitles[activeSection]

  const description =
    activeSection === 'dashboard'
      ? 'Here is the latest activity across your submitted service requests.'
      : activeSection === 'my-requests'
        ? 'View all service requests you have submitted to ServEase.'
        : `Requests submitted to the ${activeSection}.`

  return (
    <StudentLayout
      activeSection={activeSection}
      user={user}
      onNavigate={handleNavigate}
      onLogout={onLogout}
      showNotifications={showNotifications}
      onToggleNotifications={handleToggleNotifications}
      onCloseNotifications={handleCloseNotifications}
      heading={heading}
      description={description}
      onNewRequest={() => setShowRequestForm(true)}
      overlays={
        <>
          {selectedRequest && (
            <RequestDetails request={selectedRequest} onClose={() => setSelectedRequest(null)} />
          )}

          {showRequestForm && (
            <AddRequestModal
              values={newRequest}
              onChange={handleRequestFormChange}
              onSubmit={handleRequestFormSubmit}
              onClose={() => setShowRequestForm(false)}
            />
          )}
        </>
      }
    >
      {activeSection === 'dashboard' && (
        <DashboardOverview
          requests={requests}
          statusCounts={statusCounts}
          summaryCards={summaryCards}
        />
      )}

      <MyRequests
        activeSection={activeSection}
        rows={visibleRows}
        onOpen={setSelectedRequest}
      />
    </StudentLayout>
  )
}

export default StudentDashboard
