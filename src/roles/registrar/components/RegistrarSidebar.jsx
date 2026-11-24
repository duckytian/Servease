import ServEaseMark from '../../../components/ServEaseMark'
import { navigationItems } from '../pages/data.js'
import { LogoutIcon, StudentPortalIcon } from '../pages/icons.jsx'

function RegistrarSidebar({
  activeNav,
  onNavigate,
  onSwitchToStudentView,
  statusCounts = {},
  totalCount = 0,
}) {
  const getBadgeCount = (item) => {
    if (item.key === 'all-requests') return totalCount
    if (item.filterStatus) return statusCounts[item.filterStatus] ?? 0
    return null
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[230px] flex-col bg-[#073b23] text-white shadow-xl transition-all duration-300 max-[900px]:w-[70px]">
      {/* Brand Header */}
      <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-[#042916] px-5 max-[900px]:justify-center max-[900px]:px-0">
        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#042916] text-[#d8c39a] ring-1 ring-[#d8c39a]/30">
          <ServEaseMark className="size-6 text-[#d8c39a]" accent="#16a34a" />
        </div>
        <div className="flex flex-col max-[900px]:hidden">
          <span className="font-display text-[20px] font-extrabold tracking-tight text-white leading-none">
            ServEase
          </span>
          <span className="mt-1 text-[8px] font-bold tracking-[2.2px] text-[#d8c39a]">
            REGISTRAR PORTAL
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-5 max-[900px]:px-2">
        <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-[#d8c39a] max-[900px]:hidden">
          Menu
        </p>

        {navigationItems.map((item) => {
          const { key, label, Icon } = item
          const isActive = activeNav === key
          const count = getBadgeCount(item)

          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate(key)}
              title={label}
              className={`group flex w-full items-center gap-3.5 rounded-lg px-3.5 py-2.5 text-left text-[13px] font-medium transition-all duration-150 max-[900px]:justify-center max-[900px]:px-0 ${
                isActive
                  ? 'bg-[#042916] text-white shadow-xs font-semibold ring-1 ring-[#d8c39a]/30'
                  : 'text-[#e4efe5] hover:bg-[#0a4b2d] hover:text-white'
              }`}
            >
              <span className={`shrink-0 ${isActive ? 'text-[#d8c39a]' : 'text-[#a7c5b3] group-hover:text-white'}`}>
                <Icon className="size-[18px]" />
              </span>
              <span className="truncate max-[900px]:hidden">{label}</span>

              {count !== null && (
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold max-[900px]:hidden ${
                    isActive
                      ? 'bg-[#d8c39a] text-[#073b23]'
                      : 'bg-[#042916] text-[#d8c39a] group-hover:bg-[#042916]'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}

        {/* Live Student View Switcher inside menu */}
        <div className="pt-4 max-[900px]:pt-2">
          <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-[#d8c39a] max-[900px]:hidden">
            Live Preview
          </p>
          <button
            type="button"
            onClick={onSwitchToStudentView}
            className={`group flex w-full items-center gap-3.5 rounded-lg border border-[#d8c39a]/30 bg-[#042916]/50 px-3.5 py-2.5 text-left text-[13px] font-semibold text-[#f1e4c8] transition-all hover:bg-[#042916] hover:text-white max-[900px]:justify-center max-[900px]:px-0 ${
              activeNav === 'student-view' ? 'bg-[#042916] text-white ring-1 ring-[#d8c39a]' : ''
            }`}
            title="Switch to Student View"
          >
            <StudentPortalIcon className="size-[18px] shrink-0 text-[#d8c39a] group-hover:text-white" />
            <span className="truncate max-[900px]:hidden">Student View</span>
            <span className="ml-auto rounded bg-[#d8c39a]/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#f1e4c8] max-[900px]:hidden">
              Live
            </span>
          </button>
        </div>
      </nav>

      {/* Footer User & Logout */}
      <div className="shrink-0 border-t border-[#042916] p-3">
        <button
          type="button"
          onClick={() => {
            if (activeNav === 'student-view') {
              onNavigate('dashboard')
            } else {
              onSwitchToStudentView()
            }
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-[#c6dbcd] transition-colors hover:bg-[#0a4b2d] hover:text-white max-[900px]:justify-center max-[900px]:px-0"
        >
          <LogoutIcon className="size-[17px] shrink-0" />
          <span className="truncate max-[900px]:hidden">
            {activeNav === 'student-view' ? 'Back to Registrar' : 'Toggle Student View'}
          </span>
        </button>
      </div>
    </aside>
  )
}

export default RegistrarSidebar
