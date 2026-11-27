function Icon({ children, className = 'size-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      {children}
    </svg>
  )
}

export function DashboardIcon(props) { return <Icon {...props}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></Icon> }
export function AllRequestsIcon(props) { return <Icon {...props}><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="2" cy="6" r="1" fill="currentColor" /><circle cx="2" cy="12" r="1" fill="currentColor" /><circle cx="2" cy="18" r="1" fill="currentColor" /></Icon> }
export function PendingIcon(props) { return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon> }
export function ProcessingIcon(props) { return <Icon {...props}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16M16 21h5v-5" /></Icon> }
export function CompletedIcon(props) { return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 5-5" /></Icon> }
export function RejectedIcon(props) { return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="m15 9-6 6m0-6 6 6" /></Icon> }
export function SearchIcon(props) { return <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.5-4.5" /></Icon> }
export function ExportIcon(props) { return <Icon {...props}><path d="M12 3v12m-4-4 4 4 4-4M5 21h14" /></Icon> }
export function ArrowBackIcon(props) { return <Icon {...props}><path d="m12 5-7 7 7 7M5 12h14" /></Icon> }
export function EditIcon(props) { return <Icon {...props}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" /></Icon> }
export function LogoutIcon(props) { return <Icon {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></Icon> }
export function CloseIcon(props) { return <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon> }
export function CheckIcon(props) { return <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon> }
export function ClockIcon(props) { return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon> }
export function ChatIcon(props) { return <Icon {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Icon> }