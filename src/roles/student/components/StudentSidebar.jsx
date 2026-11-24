import ServEaseMark from '../../../components/ServEaseMark'
import { navigation } from '../pages/data.js'
import { LogoutIcon } from '../pages/icons.jsx'

function StudentSidebar({ activeSection, onNavigate, onLogout, requestCount = 0 }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[230px] flex-col bg-[#073B23] text-white shadow-xl transition-all duration-300 max-[900px]:w-[70px]">
      <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-[#0A4B2D] px-5 max-[900px]:justify-center max-[900px]:px-0">
        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#0A4B2D] text-[#8A7344] ring-1 ring-[#8A7344]/30">
          <ServEaseMark className="size-6" />
        </div>
        <div className="flex flex-col max-[900px]:hidden">
          <span className="font-display text-[20px] font-extrabold tracking-tight text-white leading-none">
            ServEase
          </span>
          <span className="mt-1 text-[8px] font-bold tracking-[2.2px] text-[#8A7344]">
            STUDENT PORTAL
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-5 max-[900px]:px-2" aria-label="Student dashboard navigation">
        <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-[#8A7344] max-[900px]:hidden">
          Menu
        </p>

        {navigation.map(({ key, label, Icon }) => {
          const isActive = activeSection === key
          const count = key === 'my-requests' ? requestCount : null

          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate(key)}
              title={label}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex w-full items-center gap-3.5 rounded-lg px-3.5 py-2.5 text-left text-[13px] font-medium transition-all duration-150 max-[900px]:justify-center max-[900px]:px-0 ${
                isActive
                  ? 'bg-[#0A4B2D] text-white shadow-xs font-semibold ring-1 ring-[#8A7344]/30'
                  : 'text-white hover:bg-[#0A4B2D] hover:text-white'
              }`}
            >
              <span className={`shrink-0 ${isActive ? 'text-[#8A7344]' : 'text-white group-hover:text-white'}`}>
                <Icon className="size-[18px]" />
              </span>
              <span className="truncate max-[900px]:hidden">{label}</span>
              {count !== null && (
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold max-[900px]:hidden ${
                    isActive
                      ? 'bg-[#8A7344] text-[#073B23]'
                      : 'bg-[#0A4B2D] text-[#8A7344] group-hover:bg-[#0A4B2D]'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="shrink-0 border-t border-[#0A4B2D] p-3">
        <button
          type="button"
          onClick={onLogout}
          title="Logout"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-white transition-colors hover:bg-[#0A4B2D] hover:text-white max-[900px]:justify-center max-[900px]:px-0"
        >
          <LogoutIcon className="size-[17px] shrink-0" />
          <span className="truncate max-[900px]:hidden">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default StudentSidebar
