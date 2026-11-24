import { eyebrowClass } from '../pages/classes.js'

function PageHeader({ heading, description }) {
  return (
    <div className="mb-5 flex flex-col items-stretch gap-4 min-[641px]:flex-row min-[641px]:items-start min-[641px]:justify-between">
      <div>
        <p className={eyebrowClass}>Student Dashboard</p>
        <h1 className="text-[20px] font-bold leading-[1.35] text-[var(--text)] min-[641px]:text-[24px]">{heading}</h1>
        <p className="mt-2 text-[12px] text-[var(--muted)]">{description}</p>
      </div>
    </div>
  )
}

export default PageHeader
