import { statusDotClasses } from '../pages/classes.js'
import { statusClass, studentProfile } from '../pages/data.js'
import { BellIcon } from '../pages/icons.jsx'

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
  const studentId = user?.userId ?? studentProfile.id

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#E7DFD0] bg-white/95 px-6 backdrop-blur-md max-[760px]:px-4">
      <div className="flex flex-col">
        <h1 className="font-display text-[19px] font-extrabold tracking-tight text-[#073B23] leading-tight sm:text-[21px]">
          Welcome, {studentProfile.name}!
        </h1>
        <p className="text-[12px] font-medium text-[#8A7344]">
          Student ID: {studentId} &bull; {studentProfile.course} &bull; {studentProfile.yearLevel}
        </p>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative">
          <button
            className={`relative grid size-9 place-items-center rounded-lg border border-[#E7DFD0] bg-[#FBF9F5] text-[#073B23] transition-all hover:border-[#073B23] hover:bg-white ${
              showNotifications ? 'border-[#073B23] bg-white' : ''
            }`}
            type="button"
            aria-label="Notifications"
            aria-expanded={showNotifications}
            aria-controls="sd-notification-panel"
            onClick={onToggleNotifications}
            title="Request updates"
          >
            <BellIcon className="size-[18px] text-[#8A7344]" />
            {notifications.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 grid min-w-[17px] place-items-center rounded-full border-2 border-white bg-[#8A7344] px-1 text-[9px] font-extrabold leading-[15px] text-white">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-[calc(100%+10px)] right-0 z-40 w-[330px] max-w-[calc(100vw-32px)] rounded-xl border border-[#E7DFD0] bg-white p-4 shadow-xl" id="sd-notification-panel">
              <div className="flex items-start justify-between gap-3 border-b border-[#E7DFD0] pb-3">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8A7344]">
                    Notifications
                  </p>
                  <h2 className="mt-1 font-display text-[15px] font-extrabold tracking-tight text-[#073B23]">
                    Request Updates
                  </h2>
                </div>
                <button
                  className="grid size-[26px] shrink-0 place-items-center rounded-lg border border-[#E7DFD0] bg-white text-[18px] leading-none text-[#8A7344] transition-all hover:bg-[#FBF9F5]"
                  type="button"
                  aria-label="Close notifications"
                  onClick={onCloseNotifications}
                >
                  &times;
                </button>
              </div>

              <ul className="max-h-[300px] divide-y divide-[#E7DFD0] overflow-y-auto p-0">
                {notifications.length === 0 ? (
                  <li className="py-7 text-center text-[12px] text-[#8A7344]">No request updates yet.</li>
                ) : (
                  notifications.map((item) => (
                    <li className="flex items-start gap-2.5 py-3" key={item.message}>
                      <span className={`mt-[5px] size-[7px] shrink-0 rounded-full ${statusDotClasses[statusClass(item.status)]}`} />
                      <div className="min-w-0 flex-1">
                        <strong className="block text-[12px] font-bold text-[#073B23]">{item.title}</strong>
                        <p className="mt-1 text-[11px] leading-[1.45] break-words text-[#8A7344]">{item.message}</p>
                      </div>
                      <time className="shrink-0 text-[10px] whitespace-nowrap text-[#8A7344]">{item.time}</time>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 border-l border-[#E7DFD0] pl-2">
          <div className="grid size-9 place-items-center rounded-full bg-[#073B23] text-[12px] font-extrabold text-[#8A7344] ring-2 ring-[#E7DFD0]">
            {initials}
          </div>
          <div className="hidden flex-col text-left sm:flex">
            <span className="text-[13px] font-bold leading-none text-[#073B23]">{studentProfile.name}</span>
            <span className="mt-1 text-[11px] font-medium leading-none text-[#8A7344]">Student Account</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default StudentTopbar
