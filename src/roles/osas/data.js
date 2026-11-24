export const osasStaff = {
  name: 'OSAS Staff',
  title: 'Student Affairs Staff',
  office: 'Office of Student Affairs and Services',
  avatar: 'OS',
  staffId: 'OSAS-001',
}

export const navigationItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'all-requests', label: 'All Requests' },
  { key: 'pending', label: 'Pending Requests', filterStatus: 'Pending' },
  { key: 'processing', label: 'Processing Requests', filterStatus: 'Processing' },
  { key: 'completed', label: 'Completed Requests', filterStatus: 'Completed' },
  { key: 'rejected', label: 'Rejected Requests', filterStatus: 'Rejected' },
]

export const requestTypes = [
  'All Types',
  'Student ID Replacement',
  'Certificate of Student Status',
  'Organization Clearance',
]

export const statusOptions = ['Pending', 'Processing', 'Completed', 'Rejected']
