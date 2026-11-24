import { cardClass, eyebrowClass, headingClass, statusBadgeClasses } from './classes.js'
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
      <div className="flex flex-col items-center border-b border-[#E3E8E5] pb-[18px] text-center">
        <span className="mb-3 grid size-12 place-items-center rounded-full bg-[#F7F5F0] text-[#16843F] [&>svg]:size-6">
          <CheckIcon />
        </span>
        <p className={eyebrowClass}>Submission Complete</p>
        <h2 id="confirmation-title" className={headingClass}>
          Request Submitted Successfully!
        </h2>
        <p className="mt-2 max-w-[460px] text-[12px] leading-[1.6] text-[#77786F]">
          Your request is waiting for review by the Registrar Office. You can track its status in My Requests.
        </p>
      </div>

      <dl className="mt-[18px] grid grid-cols-1 gap-x-6 gap-y-3 min-[641px]:grid-cols-2">
        {summary.map(([label, value]) => (
          <div className="flex items-start justify-between gap-4 border-b border-[#F7F5F0] pb-2" key={label}>
            <dt className="text-[11px] font-semibold text-[#77786F]">{label}</dt>
            <dd className="text-right text-[12px] font-bold text-[#073B23]">{value}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[11px] font-semibold text-[#77786F]">Current Status</dt>
          <dd>
            <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${statusBadgeClasses[statusClass(request.status)]}`}>
              {request.status}
            </span>
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex justify-center">
        <button
          className="inline-flex h-10 items-center justify-center rounded-lg border-0 bg-[#073B23] px-6 text-[12px] font-bold text-white transition-colors duration-150 hover:bg-[#0A4B2D]"
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
