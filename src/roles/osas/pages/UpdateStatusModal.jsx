import { useState } from 'react'
import { CloseIcon } from './icons.jsx'
import { getStatusKey, statusBadgeClasses } from './classes.js'
import { statusOptions } from './data.js'

function UpdateStatusModal({ request, isOpen, onClose, onSave }) {
  const [newStatus, setNewStatus] = useState(request?.status || 'Pending')
  const [remarks, setRemarks] = useState(request?.remarks || '')
  const [assignedStaff, setAssignedStaff] = useState(request?.assignedStaff || '')
  const [error, setError] = useState('')

  if (!isOpen || !request) return null
  const statusKey = getStatusKey(request.status)
  const presets = [
    'Your request has been received and is being reviewed by the OSAS team.',
    'Your request is under processing. We will update you when the next step is ready.',
    'Your request has been approved. Please follow the instructions provided by OSAS.',
    'We are unable to proceed with this request. Please review the remarks and contact OSAS if you need assistance.',
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!assignedStaff.trim()) {
      setError('Assign an OSAS staff member before saving.')
      return
    }
    if (!remarks.trim()) {
      setError('OSAS remarks are required for this status update.')
      return
    }
    onSave({
      ref: request.ref,
      newStatus,
      remarks: remarks.trim(),
      assignedStaff: assignedStaff.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="osas-update-title">
      <div className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#e7dfd0] pb-4">
          <h3 id="osas-update-title" className="text-[18px] font-extrabold text-[#073b23]">Update OSAS Request</h3>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center rounded-lg text-[#7a7a6d] hover:bg-[#f7f3eb]" aria-label="Close dialog"><CloseIcon className="size-4" /></button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-y-2.5 rounded-xl border border-[#e7dfd0] bg-[#fbf9f5] p-4 text-[13px]">
          <div><span className="text-[11px] font-bold uppercase text-[#8a7344]">Request No.</span><p className="font-mono font-bold text-[#073b23]">{request.ref}</p></div>
          <div><span className="text-[11px] font-bold uppercase text-[#8a7344]">Student</span><p className="font-semibold">{request.studentName}</p></div>
          <div><span className="text-[11px] font-bold uppercase text-[#8a7344]">Service</span><p>{request.type || request.shortType}</p></div>
          <div><span className="text-[11px] font-bold uppercase text-[#8a7344]">Current Status</span><p className={`mt-1 w-fit rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${statusBadgeClasses[statusKey]}`}>{request.status}</p></div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="osas-status" className="mb-1.5 block text-[12px] font-bold">Update Status *</label>
            <select id="osas-status" value={newStatus} onChange={(event) => setNewStatus(event.target.value)} className="w-full rounded-lg border border-[#e7dfd0] px-3.5 py-2.5 text-[13px] font-semibold">
              {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="osas-assigned-staff" className="mb-1.5 block text-[12px] font-bold">Assigned OSAS Staff *</label>
            <input id="osas-assigned-staff" value={assignedStaff} onChange={(event) => { setAssignedStaff(event.target.value); setError('') }} placeholder="Enter staff member name" className="w-full rounded-lg border border-[#e7dfd0] px-3.5 py-2.5 text-[13px] outline-none focus:border-[#073b23]" />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="osas-remarks" className="text-[12px] font-bold">OSAS Remarks *</label>
              <span className="text-[11px] text-[#7a7a6d]">{remarks.length}/500</span>
            </div>
            <textarea id="osas-remarks" rows={4} maxLength={500} value={remarks} onChange={(event) => { setRemarks(event.target.value); setError('') }} placeholder="Add review notes, next steps, or pickup/appointment instructions..." className="w-full rounded-lg border border-[#e7dfd0] p-3 text-[13px] outline-none focus:border-[#073b23]" />
            {error && <p className="mt-1 text-[11px] font-semibold text-[#8a7344]" role="alert">{error}</p>}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {presets.map((preset, index) => (
                <button key={preset} type="button" onClick={() => { setRemarks(preset); setError('') }} className="rounded border border-[#e7dfd0] bg-[#f7f3eb] px-2 py-1 text-[10px] font-medium text-[#073b23] hover:bg-[#e4efe5]">Preset {index + 1}</button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t border-[#e7dfd0] pt-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-[#e7dfd0] px-4 py-2 text-[13px] font-semibold text-[#6e7368]">Cancel</button>
            <button type="submit" className="rounded-lg bg-[#073b23] px-5 py-2 text-[13px] font-bold text-white hover:bg-[#042916]">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateStatusModal
