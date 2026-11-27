import { ArrowBackIcon, ChatIcon, CheckIcon, ClockIcon, EditIcon } from '../../icon.jsx'
import { buttonForest, cardClass, getStatusKey, statusBadgeClasses } from '../../classes.js'

function RequestDetails({ request, onBack, onOpenUpdateModal }) {
  if (!request) return null
  const history = request.statusHistory || []
  const statusKey = getStatusKey(request.status)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button type="button" onClick={onBack} className="mb-2 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#6e7368] hover:text-[#073b23]">
            <ArrowBackIcon className="size-4" /> Back to Requests
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-[26px] font-extrabold text-[#073b23]">Request Details</h2>
            <span className="rounded-lg bg-[#f1e4c8] px-3 py-1 font-mono text-[12px] font-bold text-[#073b23]">{request.ref}</span>
            <span className={`rounded-full px-3 py-0.5 text-[11px] font-extrabold uppercase ${statusBadgeClasses[statusKey]}`}>{request.status}</span>
          </div>
        </div>
        <button type="button" onClick={() => onOpenUpdateModal(request)} className={buttonForest}><EditIcon className="size-4" />Update Status &amp; Remarks</button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className={cardClass}>
          <h3 className="border-b border-[#e7dfd0] pb-3 text-[15px] font-extrabold text-[#073b23]">Student Information</h3>
          <dl className="mt-3 divide-y divide-[#f2ede4] text-[13px]">
            {[
              ['Student ID', request.studentId],
              ['Full Name', request.studentName],
              ['Course/Program', request.course || 'Not specified'],
              ['Year Level', request.yearLevel || 'Not specified'],
              ['Email', request.email || 'Not specified'],
              ['Contact No.', request.contactNo || 'Not specified'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-2.5"><dt className="text-[#7a7a6d]">{label}</dt><dd className="text-right font-semibold text-[#1f2d24]">{value}</dd></div>
            ))}
          </dl>
        </section>

        <section className={cardClass}>
          <h3 className="border-b border-[#e7dfd0] pb-3 text-[15px] font-extrabold text-[#073b23]">OSAS Service Request</h3>
          <dl className="mt-3 divide-y divide-[#f2ede4] text-[13px]">
            {[
              ['Service', request.type || request.shortType],
              ['Assigned OSAS Staff', request.assignedStaff || 'Unassigned'],
              ['Academic Year', request.academicYear || 'Not specified'],
              ['Semester', request.semester || 'Not specified'],
              ['Purpose', request.purpose || 'Not specified'],
              ['Additional Details', request.additionalRemarks || 'N/A'],
              ['Date Submitted', request.date],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-2.5"><dt className="text-[#7a7a6d]">{label}</dt><dd className="text-right font-semibold text-[#1f2d24]">{value}</dd></div>
            ))}
          </dl>
        </section>
      </div>

      <section className={cardClass}>
        <h3 className="border-b border-[#e7dfd0] pb-3 text-[16px] font-extrabold text-[#073b23]">Status History</h3>
        {history.length ? (
          <div className="mt-6 space-y-6">
            {history.map((step, index) => {
              const isLast = index === history.length - 1
              return (
                <div key={`${step.time}-${index}`} className="relative flex items-start gap-4">
                  {!isLast && <div className="absolute bottom-[-24px] left-[13px] top-7 w-0.5 bg-[#e7dfd0]" />}
                  <div className={`relative z-10 grid size-7 shrink-0 place-items-center rounded-full text-white ${step.status === 'Completed' ? 'bg-[#073b23]' : 'bg-[#0a4b2d]'}`}>
                    {step.status === 'Completed' ? <CheckIcon className="size-3.5" /> : <ClockIcon className="size-3.5" />}
                  </div>
                  <div className="flex-1 rounded-lg border border-[#e7dfd0] bg-[#fbf9f5] p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-extrabold text-[#1f2d24]">{step.step}</span>
                      <span className={`w-fit rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${statusBadgeClasses[getStatusKey(step.status)]}`}>{step.status}</span>
                    </div>
                    <div className="mt-1 text-[11px] font-semibold text-[#8a7344]">{step.time}</div>
                    <p className="mt-1.5 text-[12px] text-[#5f6f62]">{step.note}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : <p className="pt-4 text-[12px] text-[#6e7368]">No status history is available.</p>}
      </section>

      <section className="rounded-xl border border-[#cde5d2] bg-[#edf5ee] p-5">
        <div className="flex items-start gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#073b23] text-[#d8c39a]"><ChatIcon className="size-4" /></div>
          <div className="flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h4 className="font-extrabold text-[#073b23]">OSAS Remarks</h4>
              {request.remarksTimestamp && <span className="text-[11px] text-[#6e7368]">{request.remarksTimestamp}</span>}
            </div>
            <p className="mt-1.5 text-[13px] text-[#1f2d24]">{request.remarks || 'No OSAS remarks recorded yet.'}</p>
          </div>
          <button type="button" onClick={() => onOpenUpdateModal(request)} className="text-[12px] font-bold text-[#073b23] hover:underline">Edit Remarks</button>
        </div>
      </section>
    </div>
  )
}

export default RequestDetails