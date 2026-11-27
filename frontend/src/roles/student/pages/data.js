import { DashboardIcon, DocumentIcon, ListIcon, MonitorIcon, PeopleIcon } from './icons.jsx'

export const studentProfile = {
  name: 'Juan Dela Cruz',
  id: '2021-1001-MNL',
  yearLevel: '3rd Year',
  email: 'juan@email.com',
  course: 'BSIT',
  contactNo: '09171234567',
}

// Spec-aligned service catalog (SERVEASE overview). Extras live in ./extras.js
export const registrarServices = [
  { code: 'COE', name: 'Certificate of Enrollment (COE)', description: 'Official proof of enrollment for the current academic term.' },
  { code: 'COG', name: 'Certificate of Grades (COG)', description: 'Certified copy of your grades for scholarships and requirements.' },
  { code: 'TOR', name: 'Transcript of Records (TOR)', description: 'Complete academic record for transfer, employment, or further study.' },
  { code: 'GOOD MORAL', name: 'Good Moral Certificate', description: 'Certification of good character and student conduct.' },
]

export const osasServices = [
  { code: 'LOST ID', name: 'Report Lost Student ID', description: 'Report a lost student ID and start the replacement process.' },
  { code: 'STUDENT ID', name: 'Student ID Replacement', description: 'Request a replacement for a lost or damaged student ID.' },
]

export const itServices = [
  { code: 'PORTAL', name: 'Student Portal Assistance', description: 'Assistance with student portal access and account issues.' },
  { code: 'LAB', name: 'Computer Lab Request', description: 'Request access or resources for the computer lab.' },
]

export const departmentServices = {
  Registrar: registrarServices,
  OSAS: osasServices,
  'IT Department': itServices,
}

export const navigation = [
  { key: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { key: 'Registrar', label: 'Registrar', Icon: DocumentIcon },
  { key: 'OSAS', label: 'Student Affairs (OSAS)', Icon: PeopleIcon },
  { key: 'IT Department', label: 'IT Department', Icon: MonitorIcon },
  { key: 'my-requests', label: 'My Requests', Icon: ListIcon },
]

export const statuses = ['Pending', 'Processing', 'Completed', 'Rejected']

export const requestSteps = [
  'Request Submitted',
  'Under Review',
  'Ready for Release',
  'Completed',
]

export function statusClass(status) {
  return String(status ?? '').toLowerCase()
}

export function formatDate(value = new Date()) {
  return value.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}
