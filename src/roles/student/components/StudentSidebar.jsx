import ServEaseMark from '../../../components/ServEaseMark'
import { navigation } from '../pages/data.js'
import { LogoutIcon } from '../pages/icons.jsx'

function StudentSidebar({ activeSection, onNavigate, onLogout }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[72px] flex-col border-r border-[var(--border)] bg-white min-[901px]:w-[246px]">
      <div className="flex h-[72px] shrink-0 items-center justify-center gap-[11px] border-b border-[var(--border)] px-0 min-[901px]:justify-start min-[901px]:px-[22px]">
        <ServEaseMark className="size-10 shrink-0 text-[var(--forest)]" />
        <div className="hidden min-[901px]:block">
          <p className="text-[19px] font-bold leading-[1.1] tracking-[-0.3px] text-[#052d1b]">ServEase</p>
          <p className="mt-1 text-[8px] font-bold tracking-[2px] text-[#8a7344]">SERVICE + EASE</p>
        </div>
      </div>

      <nav className="flex flex-col gap-[6px] px-[10px] py-[18px] min-[901px]:px-[14px] min-[901px]:py-[22px]" aria-label="Student dashboard navigation">
        {navigation.map(({ key, label, Icon }) => (
          <button
            className={`flex min-h-11 w-full items-center justify-center gap-3 rounded-[10px] border-0 bg-transparent p-0 text-left text-[12px] font-semibold text-[#5f6f62] transition-colors duration-200 hover:bg-[#f6f2e8] hover:text-[var(--forest)] min-[901px]:justify-start min-[901px]:px-[14px] [&>svg]:size-[18px] [&>svg]:shrink-0 ${activeSection === key ? 'bg-[#eaf1e9] text-[var(--forest)]' : ''}`}
            key={key}
            type="button"
            onClick={() => onNavigate(key)}
          >
            <Icon />
            <span className="hidden min-[901px]:inline">{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-4 border-t border-[var(--border)] px-[10px] py-4 min-[901px]:items-stretch min-[901px]:px-[22px] min-[901px]:pb-[22px] min-[901px]:pt-[18px]">
        <div className="hidden flex-col gap-1 min-[901px]:flex">
          <span className="text-[11px] font-bold text-[#052d1b]">Student Portal</span>
          <small className="text-[10px] text-[var(--muted)]">Service Request System</small>
        </div>
        <button className="flex min-h-10 w-full items-center justify-center gap-[10px] rounded-[9px] border border-[var(--border)] bg-white p-0 text-[11px] font-bold text-[var(--forest)] transition-colors duration-200 hover:border-[var(--forest)] hover:bg-[var(--forest)] hover:text-white min-[901px]:justify-start min-[901px]:px-3 [&>svg]:size-4 [&>svg]:shrink-0" type="button" onClick={onLogout}>
          <LogoutIcon />
          <span className="hidden min-[901px]:inline">Log Out</span>
        </button>
      </div>
    </aside>
  )
}

export default StudentSidebar
