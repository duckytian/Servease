import { cardClass, eyebrowClass, headingClass, iconToneClasses, statusBadgeClasses, statusDotClass, statusDotClasses } from '../classes.js'
import { departmentServices, statuses, statusClass } from '../data.js'
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  DocumentIcon,
  ListIcon,
} from '../icons.jsx'

function DashboardOverview({ requests, onNavigate }) {
  const counts = requests.reduce(
    (current, request) => {
      if (request.status in current) current[request.status] += 1
      return current
    },
    { Pending: 0, Processing: 0, Completed: 0, Rejected: 0 },
  )

  const summaryCards = [
    { title: 'Total Requests', count: requests.length, tone: 'total', Icon: CalendarIcon },
    { title: 'Pending', count: counts.Pending, tone: 'pending', Icon: ClockIcon },
    { title: 'Processing', count: counts.Processing, tone: 'processing', Icon: ListIcon },
    { title: 'Completed', count: counts.Completed, tone: 'completed', Icon: CheckIcon },
  ]

  const trackedRequests = [...requests].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="space-y-5">
      <section className={cardClass} aria-labelledby="student-overview-title">
        <div className="mb-[16px] border-b border-[var(--border-light)] pb-[14px]">
          <p className={eyebrowClass}>Student Overview</p>
          <h2 id="student-overview-title" className={headingClass}>
            Request Summary
          </h2>
          <p className="mt-1 text-[11px] text-[var(--muted)]">
            A snapshot of every request you have submitted across departments.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 min-[641px]:grid-cols-4">
          {summaryCards.map(({ title, count, tone, Icon }) => (
            <article className="rounded-xl border border-[var(--border)] bg-[#fbf9f5] p-4" key={title}>
              <span className={`mb-3 grid size-9 place-items-center rounded-[10px] [&>svg]:size-[18px] ${iconToneClasses[tone]}`}>
                <Icon />
              </span>
              <p className="text-[24px] font-extrabold leading-none text-[var(--text)]">{count}</p>
              <h3 className="mt-2 text-[12px] font-bold text-[var(--text)]">{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={cardClass} aria-labelledby="status-tracker-title">
        <div className="mb-[16px] flex flex-col gap-3 border-b border-[var(--border-light)] pb-[14px] min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between">
          <div>
            <p className={eyebrowClass}>Status Tracker</p>
            <h2 id="status-tracker-title" className={headingClass}>
              Request Status Tracker
            </h2>
            <p className="mt-1 text-[11px] text-[var(--muted)]">
              Live status of your submitted requests across all departments.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#8a7344]">
              Indicator:
            </span>
            {statuses.map((status) => (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--muted)]" key={status}>
                <span className={`${statusDotClass} ${statusDotClasses[statusClass(status)]}`} />
                {status}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[#fbf9f5]">
                {['Ref No.', 'Department', 'Type of Request', 'Date Submitted', 'Current Status', 'Staff Remarks'].map(
                  (column) => (
                    <th
                      className="px-3 py-[10px] text-[10px] font-bold uppercase tracking-[0.8px] text-[#6f7d70]"
                      key={column}
                      scope="col"
                    >
                      {column}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {trackedRequests.length === 0 ? (
                <tr>
                  <td className="px-3 py-6 text-center text-[12px] text-[var(--muted)]" colSpan={6}>
                    You have not submitted any requests yet.
                  </td>
                </tr>
              ) : (
                trackedRequests.map((request) => (
                  <tr
                    className="border-b border-[var(--border-light)] transition-colors duration-150 last:border-b-0 hover:bg-[#fbfaf7]"
                    key={request.ref}
                  >
                    <td className="px-3 py-[11px] text-[12px] font-bold text-[var(--text)]">{request.ref}</td>
                    <td className="px-3 py-[11px] text-[12px] text-[var(--text)]">{request.department}</td>
                    <td className="px-3 py-[11px] text-[12px] text-[var(--text)]">
                      {request.shortType || request.type}
                    </td>
                    <td className="px-3 py-[11px] text-[12px] text-[var(--muted)]">{request.date}</td>
                    <td className="px-3 py-[11px]">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusBadgeClasses[statusClass(request.status)]}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-3 py-[11px] text-[12px] text-[var(--muted)]">
                      {request.remarks || <span aria-label="No remarks">—</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={cardClass} aria-labelledby="departments-title">
        <div className="mb-[16px] border-b border-[var(--border-light)] pb-[14px]">
          <p className={eyebrowClass}>Departments</p>
          <h2 id="departments-title" className={headingClass}>
            Where would you like to request?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[641px]:grid-cols-3">
          {Object.keys(departmentServices).map((department) => (
            <button
              className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-white p-4 text-left transition-colors duration-150 hover:border-[var(--forest)] hover:bg-[#f6faf6]"
              key={department}
              type="button"
              onClick={() => onNavigate(department)}
            >
              <span className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#e4efe5] text-[var(--forest)] [&>svg]:size-[18px]">
                  <DocumentIcon />
                </span>
                <span>
                  <span className="block text-[12px] font-bold text-[var(--text)]">{department}</span>
                  <span className="mt-1 block text-[11px] text-[var(--muted)]">
                    {departmentServices[department].length} available services
                  </span>
                </span>
              </span>
              <ArrowRightIcon className="size-4 shrink-0 text-[var(--forest)] transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardOverview
