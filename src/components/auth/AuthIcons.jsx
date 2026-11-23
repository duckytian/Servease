function Icon({ children, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      {children}
    </svg>
  )
}

export function ForgotPasswordIcon(props) {
  return (
    <Icon {...props}>
      <path d="M7 10a5 5 0 0 1 10 0c0 3.5 1.5 5 1.5 5h-13S7 13.5 7 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 4V2.5M5.5 6 4.4 5M18.5 6l1.1-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Icon>
  )
}

export function LoginHelpIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.6 2.3c-.8.4-1.2 1-1.2 1.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16.8" r="1" fill="currentColor" />
    </Icon>
  )
}
