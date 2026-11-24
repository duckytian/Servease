import {
  DashboardIcon,
  AllRequestsIcon,
  PendingIcon,
  ProcessingIcon,
  CompletedIcon,
} from './icons.jsx'

export const registrarStaff = {
  name: 'Director A. Cruz',
  title: 'Registrar Staff',
  office: 'Registrar Office',
  avatar: 'AC',
  staffId: 'REG-001',
}

export const navigationItems = [
  { key: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { key: 'all-requests', label: 'All Requests', Icon: AllRequestsIcon },
  { key: 'pending', label: 'Pending Requests', Icon: PendingIcon, filterStatus: 'Pending' },
  { key: 'processing', label: 'Processing Requests', Icon: ProcessingIcon, filterStatus: 'Processing' },
  { key: 'completed', label: 'Completed Requests', Icon: CompletedIcon, filterStatus: 'Completed' },
]

export const requestTypes = [
  'All Types',
  'Certificate of Registration (COR)',
  'Certificate of Enrollment (COE)',
  'Certificate of Grades (COG)',
  'Transcript of Records (TOR)',
  'Good Moral Certificate',
  'Lost ID Replacement',
  'PC Repair',
  'Portal Access',
]

export const statusOptions = ['Pending', 'Processing', 'Completed']

export const initialRequestsData = [
  {
    ref: 'SER-0056',
    studentId: '2021-1045-MNL',
    studentName: 'Daniel Hernandez',
    course: 'BSCE',
    yearLevel: '4th Year',
    email: 'daniel.h@email.com',
    contactNo: '09615678901',
    type: 'Certificate of Enrollment (COE)',
    shortType: 'COE',
    academicYear: '2023 - 2024',
    semester: '1st Semester',
    purpose: 'Professional Organization Membership',
    additionalRemarks: 'PICE Student Chapter',
    date: 'Nov 24, 2023',
    status: 'Completed',
    remarks: 'COE released with PICE student chapter verification.',
    remarksTimestamp: 'Nov 24, 2023 12:45 PM',
    statusHistory: [
      { step: 'Request Submitted', time: 'Nov 24, 2023 11:00 AM', note: 'Application filed.', status: 'Completed' },
      { step: 'Under Review', time: 'Nov 24, 2023 12:00 PM', note: 'Approved.', status: 'Completed' },
      { step: 'Document Ready', time: 'Nov 24, 2023 12:45 PM', note: 'Document ready.', status: 'Completed' },
    ],
  },
]

export const technologyStackInfo = {
  frontend: 'React 19 (Modern functional components & Hooks: useState, useEffect, useMemo)',
  styling: 'Tailwind CSS v4 with custom responsive design tokens and CSS variables',
  typography: 'Display Font: Poppins ExtraBold (800) | Text Font: Inter (300-700)',
  colorPalette: {
    primary: 'Deep Forest Green (#073B23) & Soft Green (#0A4B2D)',
    background: 'Warm Beige (#F7F3EB, #F1E4C8) & Crisp White (#FFFFFF)',
    statuses: {
      pending: 'Warm Beige (#8A7344 / #F7EED9)',
      processing: 'Deep Sage Green (#0A4B2D / #EDF5EE)',
      completed: 'Forest Green (#073B23 / #E4EFE5)',
      total: 'Deep Forest Green (#073B23)',
    },
  },
  buildTool: 'Vite 8 for ultra-fast bundling and Hot Module Replacement (HMR)',
  architecture: 'Component-driven, modular UI structure with bidirectional real-time state synchronization',
  icons: 'Custom scalable SVG vector icons matching ServeEase design guidelines',
}

export const requestStatusWorkflow = [
  {
    step: 1,
    status: 'Pending',
    actor: 'Student / System',
    description: 'Student submits a request through the portal. The request enters the registrar queue with status "Pending" and initial submission timestamp.',
    allowedTransitions: ['Processing'],
    requiredFields: ['Request Type', 'Purpose', 'Student Information'],
    remarksRequirement: 'Optional on initial receipt; automated acknowledgment generated.',
  },
  {
    step: 2,
    status: 'Processing',
    actor: 'Registrar Staff',
    description: 'Registrar reviews the student records, curriculum ledger, and payment/clearance status. Status moves to "Processing" while documents are generated.',
    allowedTransitions: ['Completed', 'Pending'],
    requiredFields: ['Staff ID', 'Review Notes'],
    remarksRequirement: 'Mandatory informative remarks for student tracking (e.g., "Grades validation underway").',
  },
  {
    step: 3,
    status: 'Completed',
    actor: 'Registrar Staff',
    description: 'Document has been printed, sealed, signed, and is ready for student pickup or electronic release. Status reaches terminal success state "Completed".',
    allowedTransitions: ['Processing'],
    requiredFields: ['Release Instructions', 'Office Window / Schedule'],
    remarksRequirement: 'Mandatory pickup instructions and release location.',
  },
]