import { cardClass, eyebrowClass, headingClass, statusBadgeClasses, statusDotClass, statusDotClasses } from './classes.js'
import { requestSteps, statusClass } from './data.js'
import { ArrowRightIcon, ChatIcon, CheckIcon, ClockIcon } from './icons.jsx'

function RequestDetails({ request, onBack }) {
  const details = [
    ['Reference Number', request.ref],
    ['Request Type', request.type],
    ['Date Submitted', request.date],
    ['Academic Year', request.academicYear],
    ['Semester', request.semester],
  ]

  const activeStep = {
    Pending: 0,
    Processing: 1,
    Completed: 3,
    Rejected: 0,
  }[request.status] ?? 0

  return (
    <div className="space-y-5">
      <button
        className="group inline-flex items-center gap-2 text-[12px] font-bold text-[#073B23] transition-colors hover:text-[#0A4B2D]"
        type="button"
        onClick={onBack}
      >
        <ArrowRightIcon className="size-4 rotate-180 transition-transform group-hover:-translate-x-1" />
        Back to My Requests
      </button>

      <section className={cardClass} aria-labelledby="request-details-title">
        <div className="flex flex-col gap-3 border-b border-[#E7DFD0] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className={eyebrowClass}>Request Details</p>
            <h2 id="request-details-title" className={`${headingClass} text-[22px]`}>
              {request.ref}
            </h2>
          </div>
          <span className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${statusBadgeClasses[statusClass(request.status)]}`}>
            {request.status}
          </span>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className={cardClass} aria-labelledby="request-information-title">
          <h3 id="request-information-title" className="mb-4 font-display text-[15px] font-extrabold tracking-tight text-[#073B23]">
            Request Information
          </h3>
          <dl className="divide-y divide-[#E7DFD0]">
            {details.map(([label, value]) => (
              <div className="flex items-start justify-between gap-4 py-2.5" key={label}>
                <dt className="text-[12px] font-medium text-[#8A7344]">{label}</dt>
                <dd className="text-right text-[13px] font-bold text-[#073B23]">{value}</dd>
              </div>
            ))}
            <div className="py-2.5">
              <dt className="text-[12px] font-medium text-[#8A7344]">Purpose</dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-[#073B23]">{request.purpose}</dd>
            </div>
            {request.additionalRemarks && (
              <div className="py-2.5">
                <dt className="text-[12px] font-medium text-[#8A7344]">Additional Remarks</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-[#073B23]">{request.additionalRemarks}</dd>
              </div>
            )}
          </dl>
        </section>

        <section className={cardClass} aria-labelledby="request-progress-title">
          <h3 id="request-progress-title" className="mb-4 font-display text-[15px] font-extrabold tracking-tight text-[#073B23]">
            Request Progress
          </h3>
          <ol className="space-y-6">
            {requestSteps.map((step, index) => {
              const isCurrent = index === activeStep
              const isDone = index < activeStep
              return (
                <li className="relative flex items-start gap-4" key={step}>
                  {index < requestSteps.length - 1 && (
                    <span className={`absolute left-[13px] top-7 -bottom-6 w-0.5 ${isDone ? 'bg-[#073B23]' : 'bg-[#E7DFD0]'}`} />
                  )}
                  <span className={`relative z-10 grid size-7 shrink-0 place-items-center rounded-full text-white ${
                    isDone ? 'bg-[#073B23]' : isCurrent ? 'bg-[#0A4B2D]' : 'bg-[#FBF9F5] text-[#8A7344]'
                  }`}>
                    {isDone ? <CheckIcon className="size-3.5 stroke-[3]" /> : <ClockIcon className="size-3.5" />}
                  </span>
                  <div className="pt-0.5">
                    <p className={`text-[13px] font-bold ${isCurrent || isDone ? 'text-[#073B23]' : 'text-[#8A7344]'}`}>
                      {step}
                    </p>
                    {isCurrent && (
                      <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#8A7344]">
                        <span className={`${statusDotClass} ${statusDotClasses[statusClass(request.status)]}`} />
                        Current status: {request.status}
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      </div>

      <section className="rounded-xl border border-[#CDE5D2] bg-[#EDF5EE] p-5 shadow-xs" aria-labelledby="registrar-remarks-title">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#073B23] text-[#8A7344] [&>svg]:size-4">
            <ChatIcon />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 id="registrar-remarks-title" className="font-display text-[15px] font-extrabold tracking-tight text-[#073B23]">
                Registrar Remarks
              </h3>
              {request.remarksTimestamp && (
                <span className="text-[11px] font-semibold text-[#8A7344]">{request.remarksTimestamp}</span>
              )}
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[#073B23]">
              {request.remarks || 'No remarks provided yet.'}
            </p>
            <p className="mt-2 text-[12px] text-[#8A7344]">
              This section is read-only. Only authorized Registrar staff can add or edit remarks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RequestDetails
