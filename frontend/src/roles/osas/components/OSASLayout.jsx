import OSASSidebar from './OSASSidebar.jsx'
import OSASTopbar from './OSASTopbar.jsx'

function OSASLayout({
  activeNav,
  user,
  onNavigate,
  onLogout,
  statusCounts = {},
  totalCount = 0,
  children,
  overlays,
}) {
  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[13px] text-[#073B23]">
      <OSASSidebar
        activeNav={activeNav}
        onNavigate={onNavigate}
        onLogout={onLogout}
        statusCounts={statusCounts}
        totalCount={totalCount}
      />

      <div className="min-h-screen pl-[70px] transition-[padding] duration-300 min-[901px]:pl-[230px]">
        <OSASTopbar user={user} />
        <main className="mx-auto w-full max-w-[1600px] p-3 sm:p-4 lg:p-5">{children}</main>
      </div>

      {overlays}
    </div>
  )
}

export default OSASLayout
