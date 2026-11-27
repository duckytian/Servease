import { useEffect, useState } from 'react'
import { useMyRequests, submitRequest } from '../../../../data/requestsApi.js'
import StudentLayout from '../../components/StudentLayout.jsx'
import Confirmation from '../Confirmation.jsx'
import MyRequests from '../MyRequests.jsx'
import RequestDetails from '../RequestDetails.jsx'
import RequestForm from '../RequestForm.jsx'
import { departmentServices, studentProfile } from '../data.js'
import DashboardOverview from './DashboardOverview.jsx'
import DepartmentServices from './DepartmentServices.jsx'

const DEPT_SLUG = { Registrar: 'registrar', OSAS: 'osas', 'IT Department': 'it' }
const DEPT_DISPLAY = { registrar: 'Registrar', osas: 'OSAS', it: 'IT Department' }

function StudentDashboard({ user, onLogout }) {
  const { requests: myRequests, reload: reloadRequests } = useMyRequests()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [view, setView] = useState('list')
  const [selectedService, setSelectedService] = useState(null)
  const [submittedRequest, setSubmittedRequest] = useState(null)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)


  const studentId = user?.userId ?? studentProfile.id
  const profile = {
    name: user?.name ?? studentProfile.name,
    course: user?.course ?? studentProfile.course,
    yearLevel: user?.yearLevel ?? studentProfile.yearLevel,
    email: user?.email ?? studentProfile.email,
    contactNo: user?.contactNumber ?? studentProfile.contactNo,
  }

  const ownRequests = myRequests.map((r) => ({
    ...r,
    department: DEPT_DISPLAY[r.department] || r.department,
  }))

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setShowNotifications(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavigate = (section) => {
    setActiveSection(section)
    setView('list')
    setSelectedService(null)
    setSubmittedRequest(null)
    setSelectedRequest(null)
    setShowNotifications(false)
  }

  const handleSelectService = (service) => {
    setSelectedService(service)
    setView('form')
    setShowNotifications(false)
  }

  const handleSubmitRequest = async (values) => {
    const departmentSlug = DEPT_SLUG[activeSection]
    try {
      const submitted = await submitRequest(departmentSlug, {
        serviceId: null,
        type: selectedService.name,
        academicYear: values.academicYear,
        semester: values.semester,
        purpose: values.purpose,
        additionalRemarks: values.additionalRemarks,
        // student identity comes from the JWT on the backend
      })
      // attach display fields the backend already returns
      setSubmittedRequest(submitted)
      setView('confirmation')
      await reloadRequests()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleOpenRequest = (request) => {
    setSelectedRequest(request)
    setView('details')
    setShowNotifications(false)
  }

  const headings = {
    dashboard: [`Welcome! ${profile.name} | Student ID: ${studentId}`, 'Here is the latest activity across your submitted service requests.'],
    'my-requests': ['My Requests', 'Track the status of your submitted service requests.'],
    details: ['Request Details', 'View the progress and registrar remarks for this request.'],
  }

  const [heading, description] =
    view === 'details' && activeSection === 'my-requests'
      ? headings.details
      : (activeSection === 'dashboard' && headings.dashboard) ||
        (activeSection === 'my-requests' && headings['my-requests']) || [
          `${activeSection} Services`,
          'Select a service to start your request.',
        ]

  const department = departmentServices[activeSection] ? activeSection : null
  const services = department ? departmentServices[department] : []

  return (
    <StudentLayout
      activeSection={activeSection}
      user={user}
      onNavigate={handleNavigate}
      onLogout={onLogout}
      showNotifications={showNotifications}
      onToggleNotifications={() => setShowNotifications((current) => !current)}
      onCloseNotifications={() => setShowNotifications(false)}
      heading={heading}
      description={description}
      requests={ownRequests}
    >
      {activeSection === 'dashboard' && (
        <DashboardOverview requests={ownRequests} onNavigate={handleNavigate} />
      )}

      {department && view === 'list' && (
        <DepartmentServices
          department={department}
          services={services}
          onSelectService={handleSelectService}
          onViewRequests={() => handleNavigate('my-requests')}
        />
      )}

      {department && view === 'form' && selectedService && (
        <RequestForm
          service={selectedService}
          profile={profile}
          studentId={studentId}
          onSubmit={handleSubmitRequest}
          onCancel={() => setView('list')}
        />
      )}

      {department && view === 'confirmation' && submittedRequest && (
        <Confirmation
          request={submittedRequest}
          onViewRequests={() => handleNavigate('my-requests')}
        />
      )}

      {activeSection === 'my-requests' &&
        (view === 'details' && selectedRequest ? (
          <RequestDetails request={selectedRequest} onBack={() => handleNavigate('my-requests')} />
        ) : (
          <MyRequests requests={ownRequests} onOpen={handleOpenRequest} />
        ))}
    </StudentLayout>
  )
}

export default StudentDashboard