import { useState } from 'react'
import { getStatusKey, statusBadgeClasses } from './classes.js'
import { statusOptions } from './data.js'
import { CloseIcon } from './icons.jsx'

function UpdateStatusModal({ request, isOpen, onClose, onSave }) {
  const [newStatus, setNewStatus] = useState(request?.status || 'Completed')
  const [remarks, setRemarks] = useState(request?.remarks || '')
  const [error, setError] = useState('')
  const [prevRef, setPrevRef] = useState(request?.ref)
  const maxChars = 500

  if (request?.ref !== prevRef) {
    setPrevRef(request?.ref)
    setNewStatus(request?.status || 'Completed')
    setRemarks(request?.remarks || '')
    setError('')
  }

  if (!isOpen || !request) return null

  const currentStatusKey = getStatusKey(request.status)

  const quickRemarkPresets = [
    'Your document is ready for release. Please visit the Registrar Office window.',
    'Your request is currently being processed by the records section.',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!remarks.trim()) {
      setError('Remarks are required so the student understands the status update.')
      return
    }

    onSave({
      ref: request.ref,
      newStatus,
      remarks: remarks.trim(),
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-update-status-title"
    >
      <div
        className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#e7dfd0] pb-4">
          <h3
            id="modal-update-status-title"
            className="font-display text-[18px] font-extrabold tracking-tight text-[#073b23]"
          >
            Update Request Status
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-[#7a7a6d] transition-colors hover:bg-[#f7f3eb] hover:text-[#1f2d24]"
            aria-label="Close dialog"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        {/* Read-Only Summary */}
        <div className="mt-4 rounded-xl border border-[#e7dfd0] bg-[#fbf9f5] p-4 text-[13px]">
          <div className="grid grid-cols-2 gap-y-2.5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a7344]">
                Request No.
              </span>
              <p className="font-mono font-bold text-[#073b23]">{request.ref}</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a7344]">
                Student Name
              </span>
              <p className="font-semibold text-[#1f2d24]">{request.studentName}</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a7344]">
                Request Type
              </span>
              <p className="font-medium text-[#1f2d24]">
                {request.shortType || request.type}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a7344]">
                Current Status
              </span>
              <div className="mt-0.5">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                    statusBadgeClasses[currentStatusKey]
                  }`}
                >
                  {request.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Status Dropdown */}
          <div>
            <label
              htmlFor="update-status-select"
              className="mb-1.5 block text-[12px] font-bold text-[#1f2d24]"
            >
              Update Status <span className="text-[#8a7344]">*</span>
            </label>
            <select
              id="update-status-select"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full rounded-lg border border-[#e7dfd0] bg-white px-3.5 py-2.5 text-[13px] font-semibold text-[#1f2d24] outline-none transition-all focus:border-[#073b23] focus:ring-2 focus:ring-[#073b23]/15"
            >
              {statusOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Remarks Textarea */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="update-remarks-text"
                className="text-[12px] font-bold text-[#1f2d24]"
              >
                Remarks <span className="text-[#8a7344]">*</span>
              </label>
              <span className="text-[11px] font-medium text-[#7a7a6d]">
                {remarks.length}/{maxChars}
              </span>
            </div>
            <textarea
              id="update-remarks-text"
              rows={4}
              maxLength={maxChars}
              value={remarks}
              onChange={(e) => {
                setRemarks(e.target.value)
                if (error) setError('')
              }}
              placeholder="Enter instructions, remarks, or pickup details for the student..."
              className="w-full rounded-lg border border-[#e7dfd0] bg-white p-3 text-[13px] text-[#1f2d24] placeholder:text-[#9ca3af] outline-none transition-all focus:border-[#073b23] focus:ring-2 focus:ring-[#073b23]/15"
            />
            {error && (
              <p className="mt-1 text-[11px] font-semibold text-[#8a7344]">
                {error}
              </p>
            )}

            {/* Quick Templates */}
            <div className="mt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a7344]">
                Quick Templates:
              </span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {(['For Release', 'Being Processed']).map((label, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setRemarks(quickRemarkPresets[idx])
                      if (error) setError('')
                    }}
                    className="rounded bg-[#f7f3eb] border border-[#e7dfd0] px-2 py-1 text-[10px] font-medium text-[#073b23] transition-colors hover:bg-[#e4efe5]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons in strict Green, Beige, White */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e7dfd0]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#e7dfd0] bg-white px-4 py-2 text-[13px] font-semibold text-[#6e7368] transition-colors hover:bg-[#f7f3eb] hover:text-[#1f2d24]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#073b23] px-5 py-2 text-[13px] font-bold text-white shadow-xs transition-all hover:bg-[#042916] active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateStatusModal
