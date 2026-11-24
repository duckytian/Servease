export const itStaff = {
  name: 'IT Support Staff',
  title: 'Technical Support',
  office: 'Information Technology Office',
  avatar: 'IT',
  staffId: 'IT-001',
}

export const navigationItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'all-requests', label: 'All Requests' },
  { key: 'pending', label: 'Pending Requests', filterStatus: 'Pending' },
  { key: 'processing', label: 'Processing Requests', filterStatus: 'Processing' },
  { key: 'completed', label: 'Completed Requests', filterStatus: 'Completed' },
]

export const requestTypes = [
  'All Types',
  'PC Repair',
  'Portal Access',
  'Network Issues',
  'Email Issues',
  'Software Installation',
]

export const statusOptions = ['Pending', 'Processing', 'Completed']