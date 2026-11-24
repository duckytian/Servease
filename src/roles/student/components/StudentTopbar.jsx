import { eyebrowClass, statusDotClass, statusDotClasses } from '../pages/classes.js'
import { statusClass, studentProfile } from '../pages/data.js'
import { BellIcon } from '../pages/icons.jsx'

function StudentTopbar({ user, showNotifications, onToggleNotifications, onCloseNotifications, requests = [] }) {
  const notifications = requests.slice(0, 5).map((request) => ({
    title: `${request.status} request`,
    message: `${request.ref} · ${request.shortType || request.type}`,
    time: request.date,
    status: request.status,
  }))

  return (
    <header className="sticky top-0 z-10 flex min-h-[72px] items-center justify-between gap-5 border-b border-[var(--border)] bg-white px-5 min-[901px]:px-9">
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="grid size-[38px] shrink-0 place-items-center rounded-full border-2 border-[#e7dcc3] bg-[var(--forest)] text-[12px] font-bold text-white" aria-hidden="true">JD</div>
          <div className="hidden min-[641px]:block">
            <p className="text-[12px] font-bold text-[var(--text)]">Welcome! {studentProfile.name}</p>
            <p className="mt-[3px] text-[10px] text-[var(--muted)]">Student ID: {user?.userId ?? studentProfile.id}</p>
          </div>

          <div className="relative">
            <button
              className={`relative grid size-[38px] place-items-center rounded-[10px] border border-[#dfe3e8] bg-white text-[var(--forest)] shadow-[0_2px_6px_rgba(15,35,56,0.08)] transition-[background,border-color,box-shadow] duration-200 hover:border-[#cbdcc8] hover:bg-[#eaf1e9] [&>svg]:size-[18px] ${showNotifications ? 'border-[#cbdcc8] bg-[#eaf1e9]' : ''}`}
              type="button"
              aria-label="Notifications"
              aria-expanded={showNotifications}
              aria-controls="sd-notification-panel"
              onClick={onToggleNotifications}
            >
              <BellIcon />
              {notifications.length > 0 && (
                <span className="absolute -right-[6px] -top-[6px] grid size-[18px] place-items-center rounded-full border-2 border-white bg-[#d92d20] text-[9px] font-bold leading-none text-white">{notifications.length}</span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-[calc(100%+12px)] z-30 w-[340px] max-w-[calc(100vw-32px)] rounded-xl border border-[var(--border)] bg-white p-[18px] shadow-[0_16px_36px_rgba(15,35,56,0.16)]" id="sd-notification-panel">
                <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] pb-[14px]">
                  <div>
                    <p className={eyebrowClass}>Notifications</p>
                    <h2 className="text-[15px] font-bold text-[#052d1b]">Request Updates</h2>
                  </div>
                  <button
                    className="size-[26px] rounded-[7px] border-0 bg-[#f3f0e8] text-[18px] leading-none text-[#6f7d70]"
                    type="button"
                    aria-label="Close notifications"
                    onClick={onCloseNotifications}
                  >
                    ×
                  </button>
                </div>

                <ul className="max-h-[320px] overflow-y-auto p-0">
                  {notifications.length === 0 ? (
                    <li className="py-4 text-center text-[12px] text-[var(--muted)]">
                      No request updates yet.
                    </li>
                  ) : (
                    notifications.map((item) => (
                      <li className="flex items-start gap-3 border-t border-[#eee9dc] py-[15px] first:border-t-0 first:pt-0" key={item.message}>
                        <span className={`${statusDotClass} mt-[5px] ${statusDotClasses[statusClass(item.status)]}`} />
                        <div className="flex-1">
                          <p className="text-[12px] font-bold text-[var(--text)]">{item.title}</p>
                          <p className="mt-1 text-[11px] leading-[1.5] text-[var(--muted)]">{item.message}</p>
                        </div>
                        <time className="shrink-0 text-[10px] whitespace-nowrap text-[var(--muted)]">{item.time}</time>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default StudentTopbar
