import { cardClass, eyebrowClass, headingClass, subTextClass } from '../classes.js'
import { ArrowRightIcon, DocumentIcon } from '../icons.jsx'

function DepartmentServices({ department, services, onSelectService, onViewRequests }) {
  return (
    <div className="space-y-4">
      <section className={cardClass} aria-labelledby="department-services-title">
        <div className="flex flex-col gap-3 border-b border-[#E7DFD0] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className={eyebrowClass}>Available Services</p>
            <h2 id="department-services-title" className={`${headingClass} text-[20px]`}>
              {department} Services
            </h2>
            <p className={subTextClass}>Select a service below to start your request.</p>
          </div>
          <span className="rounded-full border border-[#E7DFD0] bg-[#FBF9F5] px-3 py-1 text-[11px] font-bold text-[#073B23]">
            {services.length} services
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <button
              className="group flex items-center gap-3 rounded-xl border border-[#E7DFD0] bg-white px-4 py-3.5 text-left shadow-xs transition-all duration-150 hover:border-[#073B23] hover:bg-[#FBF9F5] hover:shadow-sm"
              key={service.code}
              type="button"
              onClick={() => onSelectService(service)}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#E4EFE5] text-[#0A4B2D] [&>svg]:size-5">
                <DocumentIcon />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-bold text-[#073B23]">{service.name}</span>
                <span className="mt-1 block text-[12px] leading-[1.5] text-[#8A7344]">
                  {service.description}
                </span>
              </span>
              <ArrowRightIcon className="size-4 shrink-0 text-[#8A7344] transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </section>

      <section className={`${cardClass} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
        <div>
          <p className={eyebrowClass}>Your Activity</p>
          <p className={subTextClass}>
            Follow every request from submission to release in My Requests.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#073B23] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#0A4B2D] active:scale-[0.98]"
          type="button"
          onClick={onViewRequests}
        >
          View My Requests
          <ArrowRightIcon className="size-4" />
        </button>
      </section>
    </div>
  )
}

export default DepartmentServices
