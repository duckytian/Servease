import ServEaseMark from '../../../components/ServEaseMark'
import { navigationItems, osasStaff } from '../pages/data.js'
import {
  AllRequestsIcon,
  CompletedIcon,
  DashboardIcon,
  LogoutIcon,
  PendingIcon,
  ProcessingIcon,
  RejectedIcon,
} from '../pages/icons.jsx'

const icons = {
  dashboard: DashboardIcon,
  'all-requests': AllRequestsIcon,
  pending: PendingIcon,
  processing: ProcessingIcon,
  completed: CompletedIcon,
  rejected: RejectedIcon,
}

function OSASLayout({
  activeNav,
  user,
  onNavigate,
  onLogout,
  statusCounts,
  totalCount,
  children,
  overlays,
}) {
  const getCount = (item) =>
    item.key === 'all-requests'
      ? totalCount
      : item.filterStatus
        ? statusCounts[item.filterStatus] || 0
        : null

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[13px] text-[#263a2f]">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[230px] flex-col bg-[#073b23] text-white shadow-xl max-[900px]:w-[70px]">
        <div className="flex h-[72px] items-center gap-3 border-b border-[#042916] px-5 max-[900px]:justify-center max-[900px]:px-0">
          <div className="grid size-9 place-items-center rounded-lg bg-[#042916] text-[#d8c39a] ring-1 ring-[#d8c39a]/30">
            <ServEaseMark className="size-6 text-[#d8c39a]" accent="#16a34a" />
          </div>
          <div className="flex flex-col max-[900px]:hidden">
            <span className="font-display text-[20px] font-extrabold leading-none">ServEase</span>
            <span className="mt-1 text-[8px] font-bold tracking-[2.2px] text-[#d8c39a]">OSAS PORTAL</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-5 max-[900px]:px-2">
          <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-[#d8c39a] max-[900px]:hidden">Menu</p>
          {navigationItems.map((item) => {
            const Icon = icons[item.key]
            const active = activeNav === item.key
            const count = getCount(item)
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.key)}
                title={item.label}
                className={`group flex w-full items-center gap-3.5 rounded-lg px-3.5 py-2.5 text-left text-[13px] transition-all max-[900px]:justify-center max-[900px]:px-0 ${
                  active
                    ? 'bg-[#042916] font-semibold text-white ring-1 ring-[#d8c39a]/30'
                    : 'text-[#e4efe5] hover:bg-[#0a4b2d] hover:text-white'
                }`}
              >
                <Icon className="size-[18px] shrink-0" />
                <span className="truncate max-[900px]:hidden">{item.label}</span>
                {count !== null && (
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold max-[900px]:hidden ${active ? 'bg-[#d8c39a] text-[#073b23]' : 'bg-[#042916] text-[#d8c39a]'}`}>{count}</span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="shrink-0 border-t border-[#042916] p-3">
          <button type="button" onClick={onLogout} title="Logout" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] font-medium text-[#c6dbcd] hover:bg-[#0a4b2d] hover:text-white max-[900px]:justify-center max-[900px]:px-0">
            <LogoutIcon className="size-[17px]" />
            <span className="max-[900px]:hidden">Logout</span>
          </button>
        </div>
      </aside>

      <div className="min-h-screen pl-[70px] min-[901px]:pl-[230px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#e7dfd0] bg-white/95 px-6 backdrop-blur-md">
          <div>
            <h1 className="font-display text-[19px] font-extrabold tracking-tight text-[#073b23] sm:text-[21px]">Welcome, {osasStaff.name}!</h1>
            <p className="text-[12px] font-medium text-[#7a7a6d]">{osasStaff.office} &bull; Student Affairs Request Management</p>
          </div>
          <div className="flex items-center gap-3 border-l border-[#e7dfd0] pl-4">
            <div className="grid size-9 place-items-center rounded-full bg-[#073b23] text-[12px] font-extrabold text-[#d8c39a] ring-2 ring-[#e7dfd0]">{osasStaff.avatar}</div>
            <div className="hidden flex-col sm:flex">
              <span className="text-[13px] font-bold leading-none text-[#1f2d24]">{user?.userId || osasStaff.staffId}</span>
              <span className="mt-1 text-[11px] text-[#7a7a6d]">{osasStaff.title}</span>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1600px] p-3 sm:p-4 lg:p-5">{children}</main>
      </div>
      {overlays}
    </div>
  )
}

export default OSASLayout