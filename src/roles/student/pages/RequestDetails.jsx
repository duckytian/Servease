import { closeButtonClass, eyebrowClass, modalButtonClass, modalClass, statusBadgeClasses } from './classes.js'
import { statusClass } from './data.js'

function RequestDetails({ request, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[rgba(5,45,27,0.45)] p-5" onClick={onClose}>
      <div
        className={modalClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sd-request-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div>
            <p className={eyebrowClass}>Request Details</p>
            <h2 id="sd-request-details-title" className="text-[20px] font-bold text-[#052d1b]">{request.ref}</h2>
          </div>
          <button className={closeButtonClass} type="button" onClick={onClose} aria-label="Close request details">
            ×
          </button>
        </div>

        <dl>
          <div className="flex justify-between gap-4 border-b border-[#eee9dc] py-[13px]">
            <dt className="text-[11px] text-[var(--muted)]">Department</dt>
            <dd className="text-right text-[11px] font-semibold text-[var(--text)]">{request.department}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-[#eee9dc] py-[13px]">
            <dt className="text-[11px] text-[var(--muted)]">Type of Request</dt>
            <dd className="text-right text-[11px] font-semibold text-[var(--text)]">{request.type}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-[#eee9dc] py-[13px]">
            <dt className="text-[11px] text-[var(--muted)]">Date Submitted</dt>
            <dd className="text-right text-[11px] font-semibold text-[var(--text)]">{request.date}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-[#eee9dc] py-[13px]">
            <dt className="text-[11px] text-[var(--muted)]">Current Status</dt>
            <dd className="text-right text-[11px] font-semibold text-[var(--text)]">
              <span className={`inline-flex rounded-full px-[9px] py-[5px] text-[9px] font-bold uppercase tracking-[0.4px] whitespace-nowrap ${statusBadgeClasses[statusClass(request.status)]}`}>
                {request.status}
              </span>
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-[#eee9dc] py-[13px]">
            <dt className="text-[11px] text-[var(--muted)]">Staff Remarks</dt>
            <dd className="text-right text-[11px] font-semibold text-[var(--text)]">{request.remarks}</dd>
          </div>
        </dl>

        <button className={modalButtonClass} type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default RequestDetails
