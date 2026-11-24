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
    <div className="min-h-screen bg-[#F7F5F0] text-[#073B23]">
      <StudentSidebar activeSection={activeSection} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="ml-[76px] min-h-screen min-[901px]:ml-[232px]">
        <StudentTopbar
          user={user}
          showNotifications={showNotifications}
          onToggleNotifications={onToggleNotifications}
          onCloseNotifications={onCloseNotifications}
          requests={requests}
        />

        <main className="mx-auto w-full max-w-[1440px] px-[26px] pt-[22px] pb-9 max-[760px]:px-4 max-[760px]:pt-[18px] max-[760px]:pb-[30px]">
          {activeSection !== 'dashboard' && <PageHeader heading={heading} description={description} />}
          {children}
        </main>
      </div>

      {overlays}
    </div>
  )
}

export default StudentLayout
