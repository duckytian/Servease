import { cardClass, eyebrowClass, pageTitleClass, statusBadgeClasses, subTextClass } from './classes.js'
import { statusClass } from './data.js'
import { CheckIcon } from './icons.jsx'

function Confirmation({ request, onViewRequests }) {
  const summary = [
    ['Reference Number', request.ref],
    ['Student Name', request.studentName],
    ['Student ID', request.studentId],
    ['Request Type', request.type],
    ['Academic Year', request.academicYear],
    ['Semester', request.semester],
    ['Date Submitted', request.date],
    ['Department', request.department],
  ]

  return (
    <section className={cardClass} aria-labelledby="confirmation-title">
      <div className="flex flex-col items-center border-b border-[#E7DFD0] pb-5 text-center">
        <span className="mb-3 grid size-12 place-items-center rounded-lg bg-[#E4EFE5] text-[#0A4B2D] [&>svg]:size-6">
          <CheckIcon />
        </span>
        <p className={eyebrowClass}>Submission Complete</p>
        <h2 id="confirmation-title" className={`${pageTitleClass} text-[22px] sm:text-[24px]`}>
          Request Submitted Successfully!
        </h2>
        <p className={`${subTextClass} mt-2 max-w-[460px]`}>
          Your request is waiting for review by the Registrar Office. You can track its status in My Requests.
        </p>
      </div>

      <dl className="mt-4 divide-y divide-[#E7DFD0]">
        {summary.map(([label, value]) => (
          <div className="flex items-start justify-between gap-4 py-2.5" key={label}>
            <dt className="text-[12px] font-medium text-[#8A7344]">{label}</dt>
            <dd className="text-right text-[13px] font-bold text-[#073B23]">{value}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 py-2.5">
          <dt className="text-[12px] font-medium text-[#8A7344]">Current Status</dt>
          <dd>
            <span className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${statusBadgeClasses[statusClass(request.status)]}`}>
              {request.status}
            </span>
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex justify-center">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#073B23] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#0A4B2D] active:scale-[0.98]"
          type="button"
          onClick={onViewRequests}
        >
          View My Requests
        </button>
      </div>
    </section>
  )
}

export default Confirmation
