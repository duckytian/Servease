const today = new Date().toLocaleDateString('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

function PageHeader({ heading, description }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-5 max-[760px]:items-start">
      <div>
        <p className="mb-[6px] text-[10px] font-extrabold tracking-[1.3px] text-[#0A4B2D] uppercase">
          Student Dashboard
        </p>
        <h1 className="mt-[6px] text-[20px] font-extrabold leading-[1.25] tracking-[-0.4px] text-[#073B23]">
          {heading}
        </h1>
        <p className="mt-[6px] text-[12px] text-[#77786F]">{description}</p>
      </div>
      <span className="shrink-0 rounded-lg border border-[#E3E8E5] bg-white px-[11px] py-[7px] text-[10.5px] font-semibold text-[#77786F] max-[760px]:hidden">
        {today}
      </span>
    </div>
  )
}

export default PageHeader
