import { statusClass, studentProfile } from '../pages/data.js'
import { BellIcon } from '../pages/icons.jsx'

const dotClasses = {
  pending: 'bg-[#C76E00]',
  processing: 'bg-[#3B82F6]',
  completed: 'bg-[#8B5CF6]',
  rejected: 'bg-[#EF4444]',
}

function StudentTopbar({ user, showNotifications, onToggleNotifications, onCloseNotifications, requests = [] }) {
  const notifications = requests.slice(0, 5).map((request) => ({
    title: `${request.status} request`,
    message: `${request.ref} · ${request.shortType || request.type}`,
    time: request.date,
    status: request.status,
  }))
  const initials = studentProfile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="sticky top-0 z-20 flex h-[68px] items-center justify-end border-b border-[#E7DFD0] bg-[#F5F0E6] px-6 backdrop-blur-[10px] max-[760px]:px-4">
      <div className="flex items-center gap-[14px]">
        <div className="flex items-center gap-[10px]">
          <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#073B23] text-[11px] font-extrabold tracking-[0.3px] text-white" aria-hidden="true">
            {initials}
          </span>
          <div className="hidden min-[641px]:block">
            <p className="text-[12px] font-extrabold text-[#073B23]">Welcome! {studentProfile.name}</p>
            <p className="mt-[2px] text-[10px] text-[#77786F]">Student ID: {user?.userId ?? studentProfile.id}</p>
          </div>
        </div>

        <div className="relative">
          <button
            className={`relative grid size-9 place-items-center rounded-[10px] border border-[#E3E8E5] bg-white text-[#073B23] transition-colors duration-200 hover:bg-[#F7F5F0] [&>svg]:size-[17px] ${
              showNotifications ? 'bg-[#F7F5F0]' : ''
            }`}
            type="button"
            aria-label="Notifications"
            aria-expanded={showNotifications}
            aria-controls="sd-notification-panel"
            onClick={onToggleNotifications}
          >
            <BellIcon />
            {notifications.length > 0 && (
              <span className="absolute -top-[5px] -right-[5px] grid min-w-[17px] place-items-center rounded-[9px] bg-[#D94F45] px-1 text-[9px] font-extrabold text-white">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-[calc(100%+10px)] right-0 z-40 w-[330px] max-w-[calc(100vw-32px)] rounded-[14px] border border-[#E3E8E5] bg-white p-4 shadow-[0_18px_40px_rgba(16,35,25,0.14)]" id="sd-notification-panel">
              <div className="flex items-start justify-between gap-3 border-b border-[#E3E8E5] pb-3">
                <div>
                  <p className="text-[9px] font-extrabold tracking-[1.4px] text-[#0A4B2D] uppercase">Notifications</p>
                  <h2 className="mt-1 text-[14px] font-extrabold text-[#073B23]">Request Updates</h2>
                </div>
                <button
                  className="size-[26px] rounded-[7px] border-0 bg-[#F7F5F0] text-[15px] leading-none text-[#77786F]"
                  type="button"
                  aria-label="Close notifications"
                  onClick={onCloseNotifications}
                >
                  ×
                </button>
              </div>

              <ul className="max-h-[300px] overflow-y-auto p-0">
                {notifications.length === 0 ? (
                  <li className="py-7 text-center text-[11.5px] text-[#77786F]">No request updates yet.</li>
                ) : (
                  notifications.map((item) => (
                    <li className="flex items-start gap-[10px] border-b border-[#E3E8E5] py-3 last:border-b-0" key={item.message}>
                      <span className={`mt-[5px] size-[7px] shrink-0 rounded-full ${dotClasses[statusClass(item.status)]}`} />
                      <div className="min-w-0 flex-1">
                        <strong className="block text-[11.5px] font-extrabold text-[#073B23]">{item.title}</strong>
                        <p className="mt-[3px] text-[10.5px] leading-[1.45] break-words text-[#77786F]">{item.message}</p>
                      </div>
                      <time className="shrink-0 text-[9.5px] whitespace-nowrap text-[#77786F]">{item.time}</time>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default StudentTopbar
