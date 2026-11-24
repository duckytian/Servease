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
        className="inline-flex items-center gap-2 text-[12px] font-bold text-[#77786F] transition-colors hover:text-[#0A4B2D]"
        type="button"
        onClick={onBack}
      >
        <ArrowRightIcon className="size-4 rotate-180" />
        Back to My Requests
      </button>

      <section className={cardClass} aria-labelledby="request-details-title">
        <div className="mb-[18px] flex flex-col gap-2 border-b border-[#E3E8E5] pb-[14px] min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between">
          <div>
            <p className={eyebrowClass}>Request Details</p>
            <h2 id="request-details-title" className={headingClass}>
              {request.ref}
            </h2>
          </div>
          <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${statusBadgeClasses[statusClass(request.status)]}`}>
            {request.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 min-[901px]:grid-cols-2">
          <div>
            <h3 className="mb-3 text-[13px] font-bold text-[#073B23]">Request Information</h3>
            <dl className="space-y-2.5">
              {details.map(([label, value]) => (
                <div className="flex items-start justify-between gap-4 border-b border-[#F7F5F0] pb-2" key={label}>
                  <dt className="text-[11px] font-semibold text-[#77786F]">{label}</dt>
                  <dd className="text-right text-[12px] font-bold text-[#073B23]">{value}</dd>
                </div>
              ))}
              <div className="pt-1">
                <dt className="text-[11px] font-semibold text-[#77786F]">Purpose</dt>
                <dd className="mt-1 text-[12px] leading-[1.6] text-[#073B23]">{request.purpose}</dd>
              </div>
              {request.additionalRemarks && (
                <div className="pt-1">
                  <dt className="text-[11px] font-semibold text-[#77786F]">Additional Remarks</dt>
                  <dd className="mt-1 text-[12px] leading-[1.6] text-[#073B23]">{request.additionalRemarks}</dd>
                </div>
              )}
            </dl>
          </div>

          <div>
            <h3 className="mb-3 text-[13px] font-bold text-[#073B23]">Request Progress</h3>
            <ol className="space-y-0">
              {requestSteps.map((step, index) => {
                const isCurrent = index === activeStep
                const isDone = index < activeStep
                return (
                  <li className="relative flex items-start gap-3 pb-5 last:pb-0" key={step}>
                    {index < requestSteps.length - 1 && (
                      <span className={`absolute left-[11px] top-6 h-[calc(100%-20px)] w-[2px] ${isDone ? 'bg-[#16843F]' : 'bg-[#E3E8E5]'}`} />
                    )}
                    <span className={`relative z-10 grid size-6 shrink-0 place-items-center rounded-full ${isCurrent || isDone ? 'bg-[#16843F] text-white' : 'bg-[#F7F5F0] text-[#77786F]'}`}>
                      {isDone ? <CheckIcon className="size-3.5" /> : <ClockIcon className="size-3.5" />}
                    </span>
                    <div className="pt-[3px]">
                      <p className={`text-[12px] font-bold ${isCurrent || isDone ? 'text-[#16843F]' : 'text-[#77786F]'}`}>
                        {step}
                      </p>
                      {isCurrent && (
                        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#77786F]">
                          <span className={`${statusDotClass} ${statusDotClasses[statusClass(request.status)]}`} />
                          Current status: {request.status}
                        </p>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className={`${cardClass} border-[#E3E8E5] bg-[#F7F5F0]`} aria-labelledby="registrar-remarks-title">
        <div className="flex items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#073B23] text-white [&>svg]:size-4">
            <ChatIcon />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 id="registrar-remarks-title" className="text-[13px] font-bold text-[#073B23]">
                Registrar Remarks
              </h3>
              {request.remarksTimestamp && (
                <span className="text-[11px] text-[#77786F]">{request.remarksTimestamp}</span>
              )}
            </div>
            <p className="mt-2 text-[12px] leading-[1.6] text-[#073B23]">
              {request.remarks || 'No remarks provided yet.'}
            </p>
            <p className="mt-2 text-[11px] text-[#77786F]">
              This section is read-only. Only authorized Registrar staff can add or edit remarks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RequestDetails
