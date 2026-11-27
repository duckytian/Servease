import PageHeader from './PageHeader.jsx'
import StudentSidebar from './StudentSidebar.jsx'
import StudentTopbar from './StudentTopbar.jsx'

function StudentLayout({
  activeSection,
  user,
  onNavigate,
  onLogout,
  showNotifications,
  onToggleNotifications,
  onCloseNotifications,
  heading,
  description,
  requests,
  children,
  overlays,
}) {
  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[13px] text-[#073B23]">
      <StudentSidebar
        activeSection={activeSection}
        onNavigate={onNavigate}
        onLogout={onLogout}
        requestCount={requests?.length ?? 0}
      />

      <div className="min-h-screen pl-[70px] transition-all duration-300 min-[901px]:pl-[230px]">
        <StudentTopbar
          user={user}
          showNotifications={showNotifications}
          onToggleNotifications={onToggleNotifications}
          onCloseNotifications={onCloseNotifications}
          requests={requests}
        />

        <main className="mx-auto w-full max-w-[1600px] p-3 sm:p-4 lg:p-5">
          {activeSection !== 'dashboard' && <PageHeader heading={heading} description={description} />}
          {children}
        </main>
      </div>

      {overlays}
    </div>
  )
}

export default StudentLayout
