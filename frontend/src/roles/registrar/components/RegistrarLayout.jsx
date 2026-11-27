import RegistrarSidebar from './RegistrarSidebar.jsx'
import RegistrarTopbar from './RegistrarTopbar.jsx'

function RegistrarLayout({
  user,
  activeNav,
  onNavigate,
  onLogout,
  onSwitchToStudentView,
  onOpenTechStackModal,
  statusCounts,
  totalCount,
  children,
  overlays,
}) {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[13px] text-[#073B23]">
      {/* Sidebar */}
      <RegistrarSidebar
        activeNav={activeNav}
        onNavigate={onNavigate}
        onLogout={onLogout}
        onSwitchToStudentView={onSwitchToStudentView}
        statusCounts={statusCounts}
        totalCount={totalCount}
      />

      {/* Main Content Area */}
      <div className="min-h-screen pl-[70px] transition-all duration-300 min-[901px]:pl-[230px]">
        <RegistrarTopbar
          user={user}
          activeNav={activeNav}
          onNavigate={onNavigate}
          onOpenTechStackModal={onOpenTechStackModal}
          onSwitchToStudentView={onSwitchToStudentView}
        />

        <main className="mx-auto w-full max-w-[1600px] p-3 sm:p-4 lg:p-5">
          {children}
        </main>
      </div>

      {/* Modals & Overlays */}
      {overlays}
    </div>
  )
}

export default RegistrarLayout