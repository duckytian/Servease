import { useEffect, useState } from 'react'
import { createRequest, useRequests } from '../../../../data/requestStore.js'
import StudentLayout from '../../components/StudentLayout.jsx'
import Confirmation from '../Confirmation.jsx'
import MyRequests from '../MyRequests.jsx'
import RequestDetails from '../RequestDetails.jsx'
import RequestForm from '../RequestForm.jsx'
import { departmentServices, studentProfile } from '../data.js'
import DashboardOverview from './DashboardOverview.jsx'
import DepartmentServices from './DepartmentServices.jsx'

function StudentDashboard({ user, onLogout }) {
  const [requests] = useRequests()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [view, setView] = useState('list')
  const [selectedService, setSelectedService] = useState(null)
  const [submittedRequest, setSubmittedRequest] = useState(null)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)

  const studentId = user?.userId ?? studentProfile.id
  const ownRequests = requests.filter((request) => request.studentId === studentId)
  const department = departmentServices[activeSection] ? activeSection : null
  const services = department ? departmentServices[department] : []

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

  const handleSubmitRequest = (values) => {
    const submitted = createRequest({
      studentId,
      studentName: studentProfile.name,
      course: studentProfile.course,
      yearLevel: studentProfile.yearLevel,
      email: studentProfile.email,
      contactNo: studentProfile.contactNo,
      department,
      type: selectedService.name,
      shortType: selectedService.code,
      academicYear: values.academicYear,
      semester: values.semester,
      purpose: values.purpose,
      additionalRemarks: values.additionalRemarks,
    })

    setSubmittedRequest(submitted)
    setView('confirmation')
  }

  const handleOpenRequest = (request) => {
    setSelectedRequest(request)
    setView('details')
    setShowNotifications(false)
  }

  const headings = {
    dashboard: [
      `Welcome! ${studentProfile.name} | Student ID: ${studentId}`,
      'Here is the latest activity across your submitted service requests.',
    ],
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
      onNewRequest={() => handleNavigate('Registrar')}
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
          profile={studentProfile}
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
