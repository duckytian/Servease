export const registrar = {
  name: 'Registrar Staff',
  id: 'REG-0001',
}

export const requests = [
  {
    ref: 'SER-0012',
    type: 'COG',
    date: 'Oct 25, 2023',
    status: 'Completed',
    remarks: 'Ready for pickup',
  },
  {
    ref: 'SER-0015',
    type: 'TOR',
    date: 'Nov 02, 2023',
    status: 'Processing',
    remarks: 'Request queued',
  },
  {
    ref: 'SER-0016',
    type: 'Good Moral',
    date: 'Nov 05, 2023',
    status: 'Pending',
    remarks: 'Awaiting approval',
  },
  {
    ref: 'SER-0018',
    type: 'COG',
    date: 'Nov 08, 2023',
    status: 'Pending',
    remarks: 'Awaiting review',
  },
  {
    ref: 'SER-0019',
    type: 'TOR',
    date: 'Nov 10, 2023',
    status: 'Completed',
    remarks: 'Released to student',
  },
  {
    ref: 'SER-0020',
    type: 'Good Moral',
    date: 'Nov 12, 2023',
    status: 'Rejected',
    remarks: 'Missing details',
  },
]

export const statuses = ['Pending', 'Processing', 'Completed', 'Rejected']

export function statusClass(status) {
  return status.toLowerCase()
}
