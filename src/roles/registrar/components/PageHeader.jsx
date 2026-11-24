function PageHeader({ title, description, actions, badge }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="font-display text-[22px] font-extrabold tracking-tight text-[#073b23] sm:text-[24px]">
            {title}
          </h2>
          {badge && <div>{badge}</div>}
        </div>
        {description && (
          <p className="mt-1 text-[13px] text-[#6f7d72]">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2.5">{actions}</div>}
    </div>
  )
}

export default PageHeader