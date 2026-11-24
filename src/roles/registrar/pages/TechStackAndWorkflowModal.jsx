import { getStatusKey, statusBadgeClasses } from './classes.js'
import { requestStatusWorkflow, technologyStackInfo } from './data.js'
import { CloseIcon, InfoIcon } from './icons.jsx'

function TechStackAndWorkflowModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const colorEntries = Object.entries(technologyStackInfo.colorPalette ?? {})

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-tech-stack-title"
    >
      <div
        className="max-h-[88vh] w-full max-w-[720px] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e7dfd0] pb-4">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-[#073b23] text-[#d8c39a]">
              <InfoIcon className="size-4" />
            </span>
            <div>
              <h3
                id="modal-tech-stack-title"
                className="font-display text-[18px] font-extrabold tracking-tight text-[#073b23]"
              >
                Tech Stack &amp; Request Workflow
              </h3>
              <p className="text-[11px] text-[#7a7a6d]">
                How ServEase is built and how requests move through the registrar.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-[#7a7a6d] transition-colors hover:bg-[#f7f3eb] hover:text-[#1f2d24]"
            aria-label="Close dialog"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        <section className="mt-5" aria-labelledby="tech-stack-heading">
          <h4
            id="tech-stack-heading"
            className="font-display text-[14px] font-extrabold text-[#073b23]"
          >
            Technology Stack
          </h4>
          <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ['Frontend', technologyStackInfo.frontend],
              ['Styling', technologyStackInfo.styling],
              ['Typography', technologyStackInfo.typography],
              ['Build Tool', technologyStackInfo.buildTool],
              ['Architecture', technologyStackInfo.architecture],
              ['Icons', technologyStackInfo.icons],
              ...colorEntries.map(([key, value]) => [
                key.replace(/([A-Z])/g, ' $1'),
                typeof value === 'string'
                  ? value
                  : Object.entries(value)
                      .map(([name, description]) => `${name}: ${description}`)
                      .join(' | '),
              ]),
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-[#e7dfd0] bg-[#fbf9f5] p-3.5"
              >
                <dt className="text-[10px] font-bold uppercase tracking-wider text-[#8a7344]">
                  {label}
                </dt>
                <dd className="mt-1 text-[12px] leading-relaxed text-[#1f2d24]">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-7" aria-labelledby="workflow-heading">
          <h4
            id="workflow-heading"
            className="font-display text-[14px] font-extrabold text-[#073b23]"
          >
            Request Status Workflow
          </h4>
          <ol className="mt-3 space-y-3">
            {requestStatusWorkflow.map((step) => (
              <li
                key={step.step}
                className="rounded-xl border border-[#e7dfd0] bg-white p-4 shadow-xs"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="grid size-6 place-items-center rounded-full bg-[#073b23] text-[11px] font-extrabold text-white">
                    {step.step}
                  </span>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                      statusBadgeClasses[getStatusKey(step.status)]
                    }`}
                  >
                    {step.status}
                  </span>
                  <span className="text-[11px] font-semibold text-[#8a7344]">{step.actor}</span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[#1f2d24]">
                  {step.description}
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2 text-[11px] text-[#5f6f62] sm:grid-cols-3">
                  <p>
                    <strong className="text-[#073b23]">Next:</strong>{' '}
                    {step.allowedTransitions.join(', ')}
                  </p>
                  <p>
                    <strong className="text-[#073b23]">Fields:</strong>{' '}
                    {step.requiredFields.join(', ')}
                  </p>
                  <p>
                    <strong className="text-[#073b23]">Remarks:</strong>{' '}
                    {step.remarksRequirement}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}

export default TechStackAndWorkflowModal
