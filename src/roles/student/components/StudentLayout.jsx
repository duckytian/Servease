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
  requests,
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
          requests={requests}
        />

        <main className="mx-auto w-full max-w-[1600px] px-4 pb-8 pt-4 min-[901px]:px-6 min-[901px]:pb-8 min-[901px]:pt-5">
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
