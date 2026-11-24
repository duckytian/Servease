import { ArrowRightIcon, DocumentIcon } from '../icons.jsx'

function DepartmentServices({ department, services, onSelectService, onViewRequests }) {
  return (
    <div className="space-y-4">
      <section
        className="rounded-2xl border border-[#E3E8E5] bg-white p-4 shadow-[0_2px_10px_rgba(18,44,30,0.04)] min-[641px]:p-5"
        aria-labelledby="department-services-title"
      >
        <div className="mb-4 flex flex-col gap-3 border-b border-[#E3E8E5] pb-4 min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between">
          <div>
            <p className="mb-[6px] text-[10px] font-bold uppercase tracking-[1.4px] text-[#0A4B2D]">
              Available Services
            </p>
            <h2 id="department-services-title" className="text-[17px] font-extrabold leading-tight text-[#073B23]">
              {department} Services
            </h2>
            <p className="mt-1 text-[11.5px] text-[#77786F]">
              Select a service below to start your request.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full bg-[#F7F5F0] px-3 py-[6px] text-[10.5px] font-bold text-[#073B23]">
            {services.length} services
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[641px]:grid-cols-2">
          {services.map((service) => (
            <button
              className="group flex items-center gap-[13px] rounded-2xl border border-[#E3E8E5] bg-white px-4 py-[14px] text-left shadow-[0_1px_4px_rgba(18,44,30,0.03)] transition duration-200 hover:-translate-y-[1px] hover:border-[#E3E8E5] hover:bg-[#F7F5F0] hover:shadow-[0_4px_12px_rgba(13,81,52,0.08)] focus-visible:border-[#073B23] focus-visible:outline-none"
              key={service.code}
              type="button"
              onClick={() => onSelectService(service)}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#F7F5F0] text-[#073B23] [&>svg]:size-5">
                <DocumentIcon />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-bold text-[#073B23]">{service.name}</span>
                <span className="mt-[3px] block text-[11px] leading-[1.5] text-[#77786F]">
                  {service.description}
                </span>
              </span>
              <ArrowRightIcon className="size-4 shrink-0 text-[#073B23] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-[#E3E8E5] bg-white p-4 shadow-[0_2px_10px_rgba(18,44,30,0.04)] min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between min-[641px]:p-5">
        <div>
          <p className="mb-[6px] text-[10px] font-bold uppercase tracking-[1.4px] text-[#0A4B2D]">
            Your Activity
          </p>
          <p className="text-[11.5px] text-[#77786F]">
            Follow every request from submission to release in My Requests.
          </p>
        </div>
        <button
          className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-[10px] border border-[#E3E8E5] bg-[#F7F5F0] px-4 text-[11.5px] font-bold text-[#073B23] transition-colors duration-200 hover:bg-[#0A4B2D] hover:text-white"
          type="button"
          onClick={onViewRequests}
        >
          View My Requests
          <ArrowRightIcon className="size-3.5" />
        </button>
      </section>
    </div>
  )
}

export default DepartmentServices
