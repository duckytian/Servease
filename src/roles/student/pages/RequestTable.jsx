import { statusBadgeClasses } from './classes.js'
import { statusClass } from './data.js'

function RequestTable({ rows, onOpen }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[840px] border-collapse">
        <thead>
          <tr>
            <th className="border-b border-[var(--border)] bg-[#f5f2ea] px-[14px] py-3 text-left text-[10px] font-bold uppercase tracking-[0.6px] text-[#6f7d70]">Ref. No.</th>
            <th className="border-b border-[var(--border)] bg-[#f5f2ea] px-[14px] py-3 text-left text-[10px] font-bold uppercase tracking-[0.6px] text-[#6f7d70]">Department</th>
            <th className="border-b border-[var(--border)] bg-[#f5f2ea] px-[14px] py-3 text-left text-[10px] font-bold uppercase tracking-[0.6px] text-[#6f7d70]">Type of Request</th>
            <th className="border-b border-[var(--border)] bg-[#f5f2ea] px-[14px] py-3 text-left text-[10px] font-bold uppercase tracking-[0.6px] text-[#6f7d70]">Date Submitted</th>
            <th className="border-b border-[var(--border)] bg-[#f5f2ea] px-[14px] py-3 text-left text-[10px] font-bold uppercase tracking-[0.6px] text-[#6f7d70]">Current Status</th>
            <th className="border-b border-[var(--border)] bg-[#f5f2ea] px-[14px] py-3 text-left text-[10px] font-bold uppercase tracking-[0.6px] text-[#6f7d70]">Staff Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((request) => (
            <tr key={request.ref} className="border-b border-[#eee9dc] text-[11px] text-[#5f6f62] even:bg-[#faf7f0] hover:bg-[#f2f6ef]">
              <td className="px-[14px] py-[13px]">
                <button
                  className="border-0 bg-transparent p-0 text-[11px] font-bold text-[var(--forest)] underline underline-offset-[3px]"
                  type="button"
                  onClick={() => onOpen(request)}
                >
                  {request.ref}
                </button>
              </td>
              <td className="px-[14px] py-[13px]">{request.department}</td>
              <td className="px-[14px] py-[13px]">{request.type}</td>
              <td className="px-[14px] py-[13px]">{request.date}</td>
              <td className="px-[14px] py-[13px]">
                <span className={`inline-flex rounded-full px-[9px] py-[5px] text-[9px] font-bold uppercase tracking-[0.4px] whitespace-nowrap ${statusBadgeClasses[statusClass(request.status)]}`}>
                  {request.status}
                </span>
              </td>
              <td className="px-[14px] py-[13px]">{request.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RequestTable
