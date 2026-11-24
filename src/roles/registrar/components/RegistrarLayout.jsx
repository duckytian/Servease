import RegistrarSidebar from './RegistrarSidebar.jsx'
import RegistrarTopbar from './RegistrarTopbar.jsx'

function RegistrarLayout({
  activeNav,
  onNavigate,
  onSwitchToStudentView,
  onOpenTechStackModal,
  onOpenStaffSettings,
  statusCounts,
  totalCount,
  children,
  overlays,
}) {
  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[13px] text-[#263a2f]">
      {/* Sidebar */}
      <RegistrarSidebar
        activeNav={activeNav}
        onNavigate={onNavigate}
        onSwitchToStudentView={onSwitchToStudentView}
        statusCounts={statusCounts}
        totalCount={totalCount}
      />

      {/* Main Content Area */}
      <div className="min-h-screen pl-[70px] transition-all duration-300 min-[901px]:pl-[230px]">
        <RegistrarTopbar
          activeNav={activeNav}
          onNavigate={onNavigate}
          onOpenTechStackModal={onOpenTechStackModal}
          onSwitchToStudentView={onSwitchToStudentView}
          onOpenStaffSettings={onOpenStaffSettings}
        />

        <main className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Modals & Overlays */}
      {overlays}
    </div>
  )
}

export default RegistrarLayout
