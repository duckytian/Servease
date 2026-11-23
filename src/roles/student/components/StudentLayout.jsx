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
  onNewRequest,
  children,
  overlays,
}) {
  return (
    <div className="min-h-screen min-h-svh bg-[#f7f3eb] text-[14px] text-[var(--text)]">
      <StudentSidebar activeSection={activeSection} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="ml-[72px] min-h-screen min-[901px]:ml-[246px]">
        <StudentTopbar
          activeSection={activeSection}
          user={user}
          onNavigate={onNavigate}
          showNotifications={showNotifications}
          onToggleNotifications={onToggleNotifications}
          onCloseNotifications={onCloseNotifications}
        />

        <main className="mx-auto w-full max-w-[1400px] px-5 pb-11 pt-6 min-[901px]:px-9 min-[901px]:pb-[52px] min-[901px]:pt-8">
          <PageHeader
            heading={heading}
            description={description}
            activeSection={activeSection}
            onNewRequest={onNewRequest}
          />

          {children}
        </main>
      </div>

      {overlays}
    </div>
  )
}

export default StudentLayout
