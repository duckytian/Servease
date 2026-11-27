import {
  buttonForest,
  cardClass,
  getStatusKey,
  statusBadgeClasses
} from './classes.js';
import {
  ArrowBackIcon,
  ChatIcon,
  CheckIcon,
  ClockIcon,
  EditIcon
} from './icons.jsx';

function RequestDetails({request, onBack, onOpenUpdateModal}) {
  if (!request) return null;

  const statusKey = getStatusKey(request.status);

  return (
    <div className="space-y-6">
      {/* Back Link and Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="group mb-2 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#77786F] transition-colors hover:text-[#073B23]"
          >
            <ArrowBackIcon className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; Back to All Requests</span>
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-[22px] font-extrabold tracking-tight text-[#073B23] sm:text-[26px]">
              Request Details
            </h2>
            <span className="rounded-lg bg-[#F4F2ED] px-3 py-1 font-mono text-[12px] font-bold text-[#073B23]">
              {request.ref}
            </span>
            <span
              className={`rounded-full px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${
                statusBadgeClasses[statusKey]
              }`}
            >
              {request.status}
            </span>
          </div>
        </div>

        {/* Action Button: Update Request Status */}
        <button
          type="button"
          onClick={() => onOpenUpdateModal(request)}
          className={buttonForest}
        >
          <EditIcon className="size-4" />
          <span>Update Status &amp; Remarks</span>
        </button>
      </div>

      {/* Grid: Student Info & Request Info */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Student Information Card */}
        <div className={cardClass}>
          <div className="border-b border-[#E7DFD0] pb-3">
            <h3 className="font-display text-[15px] font-extrabold text-[#073B23]">
              Student Information
            </h3>
          </div>
          <dl className="mt-3 divide-y divide-[#E7DFD0] text-[13px]">
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Student ID</dt>
              <dd className="font-mono font-bold text-[#073B23]">
                {request.studentId}
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Full Name</dt>
              <dd className="font-bold text-[#073B23]">
                {request.studentName}
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Course/Program</dt>
              <dd className="font-semibold text-[#073B23]">
                {request.course || 'BSIT'}
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Year Level</dt>
              <dd className="font-semibold text-[#073B23]">
                {request.yearLevel || '3rd Year'}
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Email</dt>
              <dd className="font-medium text-[#073B23]">
                {request.email ||
                  `${request.studentName.toLowerCase().replace(/\s+/g, '.')}@email.com`}
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Contact No.</dt>
              <dd className="font-mono font-medium text-[#073B23]">
                {request.contactNo || '09171234567'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Request Information Card */}
        <div className={cardClass}>
          <div className="border-b border-[#E7DFD0] pb-3">
            <h3 className="font-display text-[15px] font-extrabold text-[#073B23]">
              Request Information
            </h3>
          </div>
          <dl className="mt-3 divide-y divide-[#E7DFD0] text-[13px]">
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Request Type</dt>
              <dd className="font-bold text-[#073B23]">{request.type}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Academic Year</dt>
              <dd className="font-semibold text-[#073B23]">
                {request.academicYear || '2023 - 2024'}
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Semester</dt>
              <dd className="font-semibold text-[#073B23]">
                {request.semester || '1st Semester'}
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Purpose</dt>
              <dd className="font-medium text-[#073B23]">
                {request.purpose || 'Official Document Submission'}
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Additional Remarks</dt>
              <dd className="font-medium text-[#77786F]">
                {request.additionalRemarks || 'N/A'}
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#77786F]">Date Submitted</dt>
              <dd className="font-semibold text-[#073B23]">{request.date}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Status History Stepper Card */}
      <div className={cardClass}>
        <div className="border-b border-[#E7DFD0] pb-3">
          <h3 className="font-display text-[16px] font-extrabold text-[#073B23]">
            Status History
          </h3>
          <p className="text-[12px] text-[#77786F]">
            Audit timeline of all state transitions and timestamps.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          {(request.statusHistory || []).map((stepItem, index) => {
            const stepStatusKey = getStatusKey(stepItem.status);
            const isLast = index === request.statusHistory.length - 1;
            const isCompletedStep = stepItem.status === 'Completed';
            const isPendingStep = stepItem.time === 'Pending';

            return (
              <div key={index} className="relative flex items-start gap-4">
                {/* Connecting Vertical Line */}
                {!isLast && (
                  <div
                    className={`absolute left-[13px] top-7 -bottom-6 w-0.5 ${
                      isCompletedStep ? 'bg-[#073B23]' : 'bg-[#E7DFD0]'
                    }`}
                  />
                )}

                {/* Circle Icon */}
                <div
                  className={`relative z-10 grid size-7 shrink-0 place-items-center rounded-full text-white ${
                    isCompletedStep
                      ? 'bg-[#073B23]'
                      : isPendingStep
                        ? 'bg-[#F4F2ED] text-[#77786F]'
                        : 'bg-[#0A4B2D]'
                  }`}
                >
                  {isCompletedStep ? (
                    <CheckIcon className="size-3.5 stroke-[3]" />
                  ) : (
                    <ClockIcon className="size-3.5" />
                  )}
                </div>

                {/* Content Box */}
                <div className="flex-1 rounded-lg border border-[#E7DFD0] bg-[#FBF9F5] p-3.5 sm:p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-display text-[14px] font-extrabold text-[#073B23]">
                      {stepItem.step}
                    </span>
                    <span
                      className={`inline-block w-fit rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                        statusBadgeClasses[stepStatusKey]
                      }`}
                    >
                      {stepItem.status}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-[#8A7344]">
                    {stepItem.time}
                  </div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-[#77786F]">
                    {stepItem.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Registrar Remarks Banner */}
      <div className="rounded-xl border border-[#E7DFD0] bg-[#F4F2ED] p-5 shadow-xs">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#073B23] text-[#8A7344]">
              <ChatIcon className="size-4" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-display text-[14px] font-extrabold text-[#073B23]">
                  Registrar Remarks
                </h4>
                {request.remarksTimestamp && (
                  <span className="text-[11px] text-[#77786F]">
                    &bull; {request.remarksTimestamp}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#073B23]">
                {request.remarks || 'No remarks recorded yet.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenUpdateModal(request)}
            className="shrink-0 text-[12px] font-bold text-[#073B23] hover:underline"
          >
            Edit Remarks
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;
