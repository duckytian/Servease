import { ForgotPasswordIcon, LoginHelpIcon } from '../auth/AuthIcons'

const navItems = [
  {
    key: 'forgot-password',
    label: 'Forgot Password',
    Icon: ForgotPasswordIcon,
    toneClass: 'bg-[#0A6B45] hover:bg-[#085838]',
  },
  {
    key: 'login-help',
    label: 'Login Help',
    Icon: LoginHelpIcon,
    toneClass: 'bg-[#2B2B2B] hover:bg-[#1B1B1B]',
  },
]

function AuthNavPanel({ activePage, onNavigate }) {
  return (
    <nav
      className="grid grid-cols-2 bg-white lg:flex lg:flex-col"
      aria-label="Authentication help navigation"
    >
      {navItems.map(({ key, label, Icon, toneClass }) => (
        <button
          key={key}
          type="button"
          className={`flex min-h-[104px] flex-col items-center justify-center gap-[10px] px-2 py-4 text-center text-[11px] font-semibold leading-[1.3] text-white transition-[transform,filter] duration-200 hover:-translate-y-px hover:brightness-110 lg:min-h-0 lg:flex-1 ${toneClass} ${activePage === key ? 'ring-2 ring-inset ring-white/60' : ''}`}
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
