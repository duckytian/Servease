import { cardClass, eyebrowClass, headingClass } from '../classes.js'
import { ArrowRightIcon, DocumentIcon } from '../icons.jsx'

function DepartmentServices({ department, services, onSelectService, onViewRequests }) {
  return (
    <div className="space-y-5">
      <section className={cardClass} aria-labelledby="department-services-title">
        <div className="mb-[16px] flex flex-col gap-2 border-b border-[var(--border-light)] pb-[14px] min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between">
          <div>
            <p className={eyebrowClass}>Available Services</p>
            <h2 id="department-services-title" className={headingClass}>
              {department} Services
            </h2>
            <p className="mt-1 text-[11px] text-[var(--muted)]">
              Select a service below to start your request.
            </p>
          </div>
          <span className="rounded-full bg-[#e4efe5] px-3 py-1 text-[11px] font-bold text-[var(--forest)]">
            {services.length} services
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[641px]:grid-cols-2">
          {services.map((service) => (
            <button
              className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white p-4 text-left transition-colors duration-150 hover:border-[var(--forest)] hover:bg-[#f6faf6]"
              key={service.code}
              type="button"
              onClick={() => onSelectService(service)}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-[#e4efe5] text-[var(--forest)] [&>svg]:size-5">
                <DocumentIcon />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-bold text-[var(--text)]">
                  {service.name}
                </span>
                <span className="mt-[3px] block text-[11px] leading-[1.5] text-[var(--muted)]">
                  {service.description}
                </span>
              </span>
              <ArrowRightIcon className="size-4 shrink-0 text-[var(--forest)] transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </section>

      <section className={`${cardClass} flex flex-col gap-3 min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between`}>
        <div>
          <p className={eyebrowClass}>Your Activity</p>
          <p className="text-[12px] text-[var(--muted)]">
            Follow every request from submission to release in My Requests.
          </p>
        </div>
        <button
          className="inline-flex h-9 items-center justify-center rounded-lg border border-[var(--forest)] bg-[var(--forest)] px-4 text-[12px] font-bold text-white transition-colors duration-150 hover:bg-[#052d1b]"
          type="button"
          onClick={onViewRequests}
        >
          View My Requests
        </button>
      </section>
    </div>
  )
}

export default DepartmentServices
