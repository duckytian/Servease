import { cardClass, headingClass, iconToneClasses, statusDotClass, statusDotClasses, statusSegmentClasses } from './classes.js'
import { statuses, statusClass } from './data.js'

function DashboardOverview({ requests, statusCounts, summaryCards }) {
  return (
    <>
      <section className="mb-6" aria-labelledby="sd-summary-title">
        <div className="mb-[14px]">
          <h2 id="sd-summary-title" className={headingClass}>Summary of Requests</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[641px]:grid-cols-2 min-[1101px]:grid-cols-4">
          {summaryCards.map(({ title, count, description, tone, Icon }) => (
            <article className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-[0_4px_14px_rgba(22,104,184,0.06)]" key={title}>
              <div className={`mb-[14px] grid size-10 place-items-center rounded-[10px] [&>svg]:size-5 ${iconToneClasses[tone]}`}>
                <Icon />
              </div>
              <p className="text-[28px] font-extrabold leading-none text-[var(--text)]">{count}</p>
              <h3 className="mb-[6px] mt-2 text-[13px] font-bold text-[var(--text)]">{title}</h3>
              <p className="text-[11px] leading-[1.5] text-[var(--muted)]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${cardClass} mb-6`} aria-labelledby="sd-chart-title">
        <div className="mb-[18px] flex items-start justify-between gap-[18px]">
          <div>
            <h2 id="sd-chart-title" className={headingClass}>Request Status Overview</h2>
            <p className="mt-[6px] text-[11px] text-[var(--muted)]">Distribution of your requests based on their current status.</p>
          </div>
        </div>

        <div
          className="flex h-[14px] w-full overflow-hidden rounded-full bg-[#eee9dc]"
          role="img"
          aria-label={statuses
            .map((status) => `${status} ${statusCounts[status]}`)
            .join(', ')}
        >
          {statuses.map((status) => (
            <span
              className={`block h-full ${statusSegmentClasses[statusClass(status)]}`}
              key={status}
              style={{ width: `${(statusCounts[status] / requests.length) * 100}%` }}
            />
          ))}
        </div>

        <div className="mt-[14px] flex flex-wrap gap-[18px]">
          {statuses.map((status) => (
            <div className="flex items-center gap-[7px] text-[11px] text-[var(--muted)]" key={status}>
              <span className={`${statusDotClass} ${statusDotClasses[statusClass(status)]}`} />
              <span>{status}</span>
              <strong className="text-[12px] text-[var(--text)]">{statusCounts[status]}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default DashboardOverview
