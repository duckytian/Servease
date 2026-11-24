import ServEaseMark from '../../../components/ServEaseMark'
import { navigation } from '../pages/data.js'
import { LogoutIcon } from '../pages/icons.jsx'

function StudentSidebar({ activeSection, onNavigate, onLogout }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[76px] flex-col border-r border-[#0A4B2D] bg-[#073B23] text-white min-[901px]:w-[232px]">
      <div className="flex h-[68px] shrink-0 items-center gap-[10px] border-b border-[#0A4B2D] px-[18px] min-[901px]:px-5">
        <ServEaseMark className="size-[30px] shrink-0" />
        <div className="hidden min-[901px]:block">
          <p className="text-[17px] leading-none font-extrabold tracking-[-0.4px] text-[#D8C6A5]">ServEase</p>
          <p className="mt-1 text-[8px] font-extrabold tracking-[1.8px] text-[#FFFDF5]">SERVICE + EASE</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-[18px]" aria-label="Student dashboard navigation">
        {navigation.map(({ key, label, Icon }) => {
          const isActive = activeSection === key
          return (
            <button
              className={`relative flex min-h-[42px] w-full items-center gap-[11px] rounded-[10px] border-0 px-3 text-left text-[12.5px] font-semibold transition-colors duration-200 [&>svg]:size-[18px] [&>svg]:shrink-0 ${
                isActive
                  ? 'bg-[#0A4B2D] text-white before:absolute before:inset-y-[11px] before:left-0 before:w-[3px] before:rounded-r-[3px] before:bg-white before:content-[""]'
                  : 'bg-transparent text-white/70 hover:bg-[#0A4B2D] hover:text-white'
              }`}
              key={key}
              type="button"
              onClick={() => onNavigate(key)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon />
              <span className="hidden whitespace-nowrap min-[901px]:inline">{label}</span>
            </button>
          )
        })}
      </nav>

      <div className="flex flex-col gap-3 border-t border-[#0A4B2D] px-3 py-4">
        <button
          className="flex min-h-[40px] w-full items-center justify-center gap-[10px] rounded-[10px] border-0 bg-[#0A4B2D] px-3 text-[11.5px] font-extrabold text-white transition-colors duration-200 hover:bg-white hover:text-[#073B23] min-[901px]:justify-start [&>svg]:size-4 [&>svg]:shrink-0"
          type="button"
          onClick={onLogout}
        >
          <LogoutIcon />
          <span className="hidden min-[901px]:inline">Log Out</span>
        </button>
      </div>
    </aside>
  )
}

export default StudentSidebar
