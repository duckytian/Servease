import { ForgotPasswordIcon, LoginHelpIcon } from '../auth/AuthIcons'

const navItems = [
  {
    key: 'forgot-password',
    label: 'Forgot Password',
    Icon: ForgotPasswordIcon,
    toneClass: 'bg-[#073B23] hover:bg-[#0A4B2D]',
    textClass: 'text-[#FFFFFF]',
    ringClass: 'ring-[#FFFFFF]/60',
  },
  {
    key: 'login-help',
    label: 'Login Help',
    Icon: LoginHelpIcon,
    toneClass: 'bg-[#374151] hover:bg-[#1F2937]',
    textClass: 'text-[#FFFFFF]',
    ringClass: 'ring-[#FFFFFF]/60',
  },
]

function AuthNavPanel({ activePage, onNavigate }) {
  return (
    <nav
      className="grid grid-cols-2 bg-[#FFFFFF] lg:flex lg:flex-col"
      aria-label="Authentication help navigation"
    >
        {navItems.map(({ key, label, Icon, toneClass, textClass, ringClass }) => (
        <button
          key={key}
          type="button"
          className={`flex min-h-[104px] flex-col items-center justify-center gap-[10px] px-2 py-4 text-center text-[11px] font-semibold leading-[1.3] transition-[transform,filter] duration-200 hover:-translate-y-px hover:brightness-110 lg:min-h-0 lg:flex-1 ${toneClass} ${textClass} ${activePage === key ? `ring-2 ring-inset ${ringClass}` : ''}`}
          aria-current={activePage === key ? 'page' : undefined}
          onClick={() => onNavigate(key)}
        >
          <Icon className="size-[22px] shrink-0" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

export default AuthNavPanel
