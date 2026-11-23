import { cardClass, headingClass } from './classes.js'
import RequestTable from './RequestTable.jsx'

const statusIndicators = [
  { label: 'Pending', color: '#D6A23A' },
  { label: 'Processing', color: '#34966B' },
  { label: 'Completed', color: '#073B23' },
  { label: 'Rejected', color: '#C45B4D' },
]

function MyRequests({ activeSection, rows, onOpen }) {
  return (
    <section className={cardClass} aria-labelledby="sd-tracker-title">
      <div className="flex flex-col gap-[18px] min-[641px]:flex-row min-[641px]:items-start min-[641px]:justify-between">
        <div>
          <h2 id="sd-tracker-title" className={headingClass}>
            {activeSection === 'dashboard' ? 'Status Tracker' : 'Submitted Requests'}
          </h2>
          <p className="mt-[6px] text-[11px] text-[var(--muted)]">
            {activeSection === 'dashboard'
              ? 'Your submitted requests and their latest status.'
              : 'Select a reference number to view request details.'}
          </p>
        </div>

        {activeSection === 'dashboard' && (
          <div
            className="flex flex-nowrap items-center gap-x-[18px] whitespace-nowrap min-[641px]:justify-end min-[641px]:pt-[3px]"
            aria-label="Status indicators"
          >
            {statusIndicators.map(({ label, color }) => (
              <span className="flex items-center gap-[6px] text-[10px] text-[var(--muted)]" key={label}>
                <span
                  aria-hidden="true"
                  className="inline-block size-[7px] shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-[18px]">
        <RequestTable rows={rows} onOpen={onOpen} />
      </div>
    </section>
  )
}

export default MyRequests
