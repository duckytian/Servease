import { useState } from 'react'
import { requestStatusWorkflow, technologyStackInfo } from './data.js'
import { CloseIcon } from './icons.jsx'

function TechStackAndWorkflowModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('workflow')

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-tech-stack-title"
    >
      <div
        className="flex max-h-[90vh] w-full max-w-[760px] flex-col rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e7dfd0] px-6 py-4.5">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-[#073b23] text-[#d8c39a]">
              <span className="font-display font-extrabold text-[13px]">SE</span>
            </div>
            <div>
              <h3
                id="modal-tech-stack-title"
                className="font-display text-[18px] font-extrabold tracking-tight text-[#073b23]"
              >
                System Specifications &amp; Workflow
              </h3>
              <p className="text-[12px] text-[#7a7a6d]">
                ServeEase Registrar Management System Technical Documentation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-[#7a7a6d] hover:bg-[#f7f3eb] hover:text-[#1f2d24]"
            aria-label="Close modal"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#e7dfd0] bg-[#fbf9f5] px-6">
          <button
            type="button"
            onClick={() => setActiveTab('workflow')}
            className={`border-b-2 px-4 py-3 text-[13px] font-bold transition-all ${
              activeTab === 'workflow'
                ? 'border-[#073b23] text-[#073b23]'
                : 'border-transparent text-[#7a7a6d] hover:text-[#1f2d24]'
            }`}
          >
            1. Request Status Workflow
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tech-stack')}
            className={`border-b-2 px-4 py-3 text-[13px] font-bold transition-all ${
              activeTab === 'tech-stack'
                ? 'border-[#073b23] text-[#073b23]'
                : 'border-transparent text-[#7a7a6d] hover:text-[#1f2d24]'
            }`}
          >
            2. Technology Stack
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 text-[13px] text-[#1f2d24]">
          {activeTab === 'workflow' ? (
            <div className="space-y-6">
              {/* Workflow Stepper Diagram in pure Green & Beige */}
              <div className="rounded-xl border border-[#e7dfd0] bg-[#fbf9f5] p-4 sm:p-5">
                <h4 className="font-display text-[15px] font-extrabold text-[#073b23]">
                  Lifecycle &amp; State Transitions
                </h4>
                <p className="mt-1 text-[12px] text-[#6e7368]">
                  How student requests travel from submission through registrar review to completion or rejection.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <div className="rounded-lg border border-[#eadbbd] bg-[#f7eed9] p-3 text-center">
                    <span className="inline-block rounded-full bg-[#8a7344] px-2 py-0.5 text-[9px] font-extrabold text-white uppercase">
                      Step 1
                    </span>
                    <h5 className="mt-1 font-display font-extrabold text-[#7a5b18]">Pending</h5>
                    <p className="mt-1 text-[11px] text-[#6e5d38]">
                      Student submits; queued for review.
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#cde5d2] bg-[#edf5ee] p-3 text-center">
                    <span className="inline-block rounded-full bg-[#0a4b2d] px-2 py-0.5 text-[9px] font-extrabold text-white uppercase">
                      Step 2
                    </span>
                    <h5 className="mt-1 font-display font-extrabold text-[#0a4b2d]">Processing</h5>
                    <p className="mt-1 text-[11px] text-[#073b23]">
                      Record audit &amp; document printing.
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#bce2c5] bg-[#e4efe5] p-3 text-center">
                    <span className="inline-block rounded-full bg-[#073b23] px-2 py-0.5 text-[9px] font-extrabold text-white uppercase">
                      Step 3 (Success)
                    </span>
                    <h5 className="mt-1 font-display font-extrabold text-[#073b23]">Completed</h5>
                    <p className="mt-1 text-[11px] text-[#042916]">
                      Sealed &amp; ready for release at window.
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Workflow Steps */}
              <div className="space-y-4">
                <h4 className="font-display text-[15px] font-extrabold text-[#073b23]">
                  Workflow Rules &amp; Responsibilities
                </h4>

                {requestStatusWorkflow.map((item) => (
                  <div
                    key={item.status}
                    className="rounded-xl border border-[#e7dfd0] bg-white p-4 shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f1ede4] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-extrabold text-[14px] text-[#073b23]">
                          {item.step}. {item.status}
                        </span>
                        <span className="rounded bg-[#f1e4c8] px-2 py-0.5 text-[10px] font-bold text-[#8a7344]">
                          Actor: {item.actor}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6e7368]">
                        Allowed Next:{' '}
                        <strong>{item.allowedTransitions.join(', ')}</strong>
                      </div>
                    </div>

                    <p className="mt-2 text-[12px] leading-relaxed text-[#1f2d24]">
                      {item.description}
                    </p>

                    <div className="mt-3 flex flex-col gap-1 text-[11px] text-[#5f6f62] sm:flex-row sm:justify-between">
                      <div>
                        <strong className="text-[#8a7344]">Required Inputs:</strong>{' '}
                        {item.requiredFields.join(', ')}
                      </div>
                      <div>
                        <strong className="text-[#8a7344]">Remarks Policy:</strong>{' '}
                        {item.remarksRequirement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-xl border border-[#e7dfd0] bg-[#fbf9f5] p-5">
                <h4 className="font-display text-[16px] font-extrabold text-[#073b23]">
                  Architecture &amp; Core Stack
                </h4>
                <p className="mt-1 text-[12px] text-[#6e7368]">
                  Strictly built with Green, Beige, and White palette and Poppins ExtraBold + Inter typography.
                </p>

                <dl className="mt-4 space-y-3 text-[12px]">
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#eee7da] pb-2">
                    <dt className="font-bold text-[#8a7344]">Frontend Framework:</dt>
                    <dd className="font-semibold text-[#073b23]">{technologyStackInfo.frontend}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#eee7da] pb-2">
                    <dt className="font-bold text-[#8a7344]">CSS Styling &amp; Design System:</dt>
                    <dd className="font-semibold text-[#073b23]">{technologyStackInfo.styling}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#eee7da] pb-2">
                    <dt className="font-bold text-[#8a7344]">Typography System:</dt>
                    <dd className="font-semibold text-[#073b23]">{technologyStackInfo.typography}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#eee7da] pb-2">
                    <dt className="font-bold text-[#8a7344]">Strict Color Palette:</dt>
                    <dd className="font-semibold text-[#073b23]">
                      Green (Forest &amp; Sage) &bull; Warm Beige (#F7F3EB, #E7DFD0) &bull; Crisp White (#FFFFFF)
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#eee7da] pb-2">
                    <dt className="font-bold text-[#8a7344]">Build Tool &amp; Bundler:</dt>
                    <dd className="font-semibold text-[#073b23]">{technologyStackInfo.buildTool}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="font-bold text-[#8a7344]">State Synchronization:</dt>
                    <dd className="font-semibold text-[#073b23]">{technologyStackInfo.architecture}</dd>
                  </div>
                </dl>
              </div>

              {/* Strict Color Palette Swatches */}
              <div>
                <h5 className="font-display font-extrabold text-[13px] text-[#073b23]">
                  Design Palette Swatches (Green, Beige, White)
                </h5>
                <div className="mt-2.5 grid grid-cols-2 gap-3 sm:grid-cols-5 text-[11px]">
                  <div className="rounded-lg border border-[#042916] bg-[#073b23] p-3 text-white">
                    <p className="font-bold">Forest Green</p>
                    <p className="opacity-80 font-mono">#073B23</p>
                  </div>
                  <div className="rounded-lg border border-[#073b23] bg-[#0a4b2d] p-3 text-white">
                    <p className="font-bold">Deep Sage Green</p>
                    <p className="opacity-80 font-mono">#0A4B2D</p>
                  </div>
                  <div className="rounded-lg border border-[#e7dfd0] bg-[#f7f3eb] p-3 text-[#1f2d24]">
                    <p className="font-bold">Warm Beige</p>
                    <p className="opacity-80 font-mono">#F7F3EB</p>
                  </div>
                  <div className="rounded-lg border border-[#e7dfd0] bg-[#8a7344] p-3 text-white">
                    <p className="font-bold">Beige Gold</p>
                    <p className="opacity-80 font-mono">#8A7344</p>
                  </div>
                  <div className="rounded-lg border border-[#e7dfd0] bg-white p-3 text-[#1f2d24]">
                    <p className="font-bold">Crisp White</p>
                    <p className="opacity-80 font-mono">#FFFFFF</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#e7dfd0] px-6 py-3.5 bg-[#fbf9f5]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#073b23] px-5 py-2 text-[12px] font-bold text-white transition-all hover:bg-[#042916]"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  )
}

export default TechStackAndWorkflowModal
