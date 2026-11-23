import { DashboardIcon, DocumentIcon, PeopleIcon, MonitorIcon } from './icons.jsx'

export const student = {
  name: 'Juan Dela Cruz',
  id: '2021-1001-MNL',
}

export const initialRequests = [
  {
    ref: 'SER-0012',
    department: 'Registrar',
    type: 'COG',
    date: 'Oct 25, 2023',
    status: 'Completed',
    remarks: 'Ready for pickup',
  },
  {
    ref: 'SER-0013',
    department: 'Student Affairs',
    type: 'Report Lost ID',
    date: 'Oct 26, 2023',
    status: 'Processing',
    remarks: 'ID processing',
  },
  {
    ref: 'SER-0014',
    department: 'IT Department',
    type: 'Portal Inquiry',
    date: 'Oct 28, 2023',
    status: 'Pending',
    remarks: 'Awaiting review',
  },
  {
    ref: 'SER-0015',
    department: 'Registrar',
    type: 'TOR',
    date: 'Nov 02, 2023',
    status: 'Processing',
    remarks: 'Request queued',
  },
  {
    ref: 'SER-0016',
    department: 'Registrar',
    type: 'Good Moral',
    date: 'Nov 05, 2023',
    status: 'Pending',
    remarks: 'Awaiting approval',
  },
  {
    ref: 'SER-0017',
    department: 'IT Department',
    type: 'Request PC',
    date: 'Nov 06, 2023',
    status: 'Rejected',
    remarks: 'Insufficient details',
  },
]

export const statuses = ['Pending', 'Processing', 'Completed', 'Rejected']

export const emptyRequest = {
  department: 'Registrar',
  type: '',
  details: '',
  date: '',
}

export const navigation = [
  { key: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { key: 'Registrar', label: 'Registrar', Icon: DocumentIcon },
  { key: 'OSAS', label: 'Student Affairs (OSAS)', Icon: PeopleIcon },
  { key: 'IT Department', label: 'IT Department', Icon: MonitorIcon },
]

export const departmentFilters = {
  Registrar: 'Registrar',
  OSAS: 'Student Affairs',
  'IT Department': 'IT Department',
}

export const departmentTitles = {
  Registrar: 'Registrar Requests',
  OSAS: 'Student Affairs Requests',
  'IT Department': 'IT Department Requests',
}

export const notifications = [
  {
    title: 'Request completed',
    message: 'SER-0012 · COG is ready for pickup at the Registrar.',
    time: 'Nov 06, 2023',
    status: 'Completed',
  },
  {
    title: 'Request rejected',
    message: 'SER-0017 · Request PC needs additional details.',
    time: 'Nov 06, 2023',
    status: 'Rejected',
  },
  {
    title: 'Request in progress',
    message: 'SER-0015 · TOR is now queued for processing.',
    time: 'Nov 02, 2023',
    status: 'Processing',
  },
  {
    title: 'Request received',
    message: 'SER-0016 · Good Moral is awaiting approval.',
    time: 'Nov 05, 2023',
    status: 'Pending',
  },
]

export function statusClass(status) {
  return status.toLowerCase()
}
