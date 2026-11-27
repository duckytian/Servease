const today = new Date().toLocaleDateString('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

function PageHeader({ heading, description }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#8A7344]">
          Student Dashboard
        </p>
        <h1 className="font-display text-[22px] font-extrabold tracking-tight text-[#073B23] sm:text-[24px]">
          {heading}
        </h1>
        <p className="mt-1 text-[12px] text-[#8A7344]">{description}</p>
      </div>
      <span className="shrink-0 rounded-lg border border-[#E7DFD0] bg-[#FBF9F5] px-3 py-1.5 text-[12px] font-semibold text-[#073B23] max-[760px]:hidden">
        {today}
      </span>
    </div>
  )
}

export default PageHeader
