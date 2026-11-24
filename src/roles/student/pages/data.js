import { DashboardIcon, DocumentIcon, ListIcon, MonitorIcon, PeopleIcon } from './icons.jsx'

export const studentProfile = {
  name: 'Juan Dela Cruz',
  id: '2021-1001-MNL',
  yearLevel: '3rd Year',
  email: 'juan@email.com',
  course: 'BSIT',
  contactNo: '09171234567',
}

export const registrarServices = [
  {
    code: 'COE',
    name: 'Certificate of Enrollment (COE)',
    description: 'Official proof of enrollment for the current academic term.',
  },
  {
    code: 'COG',
    name: 'Certificate of Grades (COG)',
    description: 'Certified copy of your grades for scholarships and requirements.',
  },
  {
    code: 'COR',
    name: 'Certificate of Registration (COR)',
    description: 'Registration record for the academic year and semester.',
  },
  {
    code: 'TOR',
    name: 'Transcript of Records (TOR)',
    description: 'Complete academic record for transfer, employment, or further study.',
  },
  {
    code: 'GOOD MORAL',
    name: 'Good Moral Certificate',
    description: 'Certification of good character and student conduct.',
  },
]

export const osasServices = [
  {
    code: 'LOST ID',
    name: 'Report Lost Student ID',
    description: 'Notify OSAS that your student ID has been lost and request assistance with the next steps.',
  },
  {
    code: 'ID REQUEST',
    name: 'Request for Student ID',
    description: 'Submit a request for a student ID card.',
  },
  {
    code: 'STATUS',
    name: 'Certificate of Student Status',
    description: 'Official confirmation of your enrollment status.',
  },
  {
    code: 'CLEARANCE',
    name: 'Organization Clearance',
    description: 'Clearance for student organization activities and events.',
  },
]

export const itServices = [
  {
    code: 'ACCOUNT',
    name: 'Portal Account Reset',
    description: 'Reset your ServEase portal password or recover access.',
  },
  {
    code: 'WIFI',
    name: 'Campus Wi-Fi Access',
    description: 'Request access credentials for the campus network.',
  },
  {
    code: 'WORKSTATION',
    name: 'Lab Workstation Request',
    description: 'Reserve a workstation for a lab session or project.',
  },
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
