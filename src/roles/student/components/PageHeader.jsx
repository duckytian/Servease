import { eyebrowClass } from '../pages/classes.js'
import { PlusIcon } from '../pages/icons.jsx'

function PageHeader({ heading, description, activeSection, onNewRequest }) {
  return (
    <div className="mb-5 flex flex-col items-stretch gap-4 min-[641px]:flex-row min-[641px]:items-start min-[641px]:justify-between">
      <div>
        <p className={eyebrowClass}>Student Dashboard</p>
        <h1 className="text-[20px] font-bold leading-[1.35] text-[var(--text)] min-[641px]:text-[24px]">{heading}</h1>
        <p className="mt-2 text-[12px] text-[var(--muted)]">{description}</p>
      </div>

      {activeSection === 'my-requests' && (
        <button
          className="inline-flex h-10 items-center gap-2 rounded-lg border-0 bg-[var(--forest)] px-4 text-[12px] font-bold whitespace-nowrap text-[var(--accent-light)] shadow-[0_6px_14px_rgba(7,59,35,0.18)] transition-all duration-150 hover:-translate-y-px hover:bg-[#052d1b] hover:shadow-[0_8px_18px_rgba(7,59,35,0.24)] min-[641px]:self-auto self-start [&>svg]:size-4"
          type="button"
          onClick={onNewRequest}
        >
          <PlusIcon />
          <span>New Request</span>
        </button>
      )}
    </div>
  )
}

export default PageHeader
