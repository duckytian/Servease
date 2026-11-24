import { cardClass, getStatusKey, statusBadgeClasses } from './classes.js'
import {
  AllRequestsIcon,
  CompletedIcon,
  PendingIcon,
  ProcessingIcon,
  RejectedIcon,
} from './icons.jsx'

function DashboardOverview({ requests, statusCounts, onOpenRequest, onNavigate }) {
  const latestRequest = requests.reduce(
    (latest, request) =>
      !latest || new Date(request.date) > new Date(latest.date) ? request : latest,
    null,
  )

  const cards = [
    { key: 'all-requests', title: 'Total Requests', count: requests.length, bg: 'bg-[#073b23]', Icon: AllRequestsIcon },
    { key: 'pending', title: 'Pending', count: statusCounts.Pending || 0, bg: 'bg-[#8a7344]', Icon: PendingIcon },
    { key: 'processing', title: 'Processing', count: statusCounts.Processing || 0, bg: 'bg-[#0a4b2d]', Icon: ProcessingIcon },
    { key: 'completed', title: 'Completed', count: statusCounts.Completed || 0, bg: 'bg-[#15803d]', Icon: CompletedIcon },
    { key: 'rejected', title: 'Rejected', count: statusCounts.Rejected || 0, bg: 'bg-[#6e7368]', Icon: RejectedIcon },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map(({ key, title, count, bg, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onNavigate(key)}
            className={`flex min-h-[105px] flex-col justify-between rounded-xl ${bg} p-4 text-left text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-white/90">{title}</span>
              <Icon className="size-4 text-white/70" />
            </div>
            <span className="text-[28px] font-extrabold leading-none">{count}</span>
          </button>
        ))}
      </div>

      <section className={cardClass} aria-labelledby="osas-recent-requests">
        <div className="flex flex-col gap-2 border-b border-[#e7dfd0] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="osas-recent-requests" className="text-[17px] font-extrabold text-[#073b23]">Recent OSAS Requests</h2>
            <p className="text-[12px] text-[#6e7368]">Latest student affairs requests requiring review or follow-up.</p>
          </div>
          <button type="button" onClick={() => onNavigate('all-requests')} className="text-left text-[12px] font-bold text-[#073b23] hover:underline sm:text-right">View All Requests &rarr;</button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-[12px]">
            <thead className="border-b border-[#eee7da] bg-[#fbf9f5] text-[11px] font-bold uppercase text-[#8a7344]">
              <tr>
                <th className="px-3.5 py-3">Ref. No.</th>
                <th className="px-3.5 py-3">Student ID</th>
                <th className="px-3.5 py-3">Student Name</th>
                <th className="px-3.5 py-3">Service</th>
                <th className="px-3.5 py-3">Date Submitted</th>
                <th className="px-3.5 py-3 text-center">Status</th>
                <th className="px-3.5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1ede4]">
              {latestRequest ? (
                <tr
                  key={latestRequest.ref}
                  onClick={() => onOpenRequest(latestRequest)}
                  className="cursor-pointer hover:bg-[#fbf9f5]"
                >
                  <td className="px-3.5 py-3 font-bold text-[#073b23]">{latestRequest.ref}</td>
                  <td className="px-3.5 py-3 text-[#5f6f62]">{latestRequest.studentId}</td>
                  <td className="px-3.5 py-3 font-semibold">{latestRequest.studentName}</td>
                  <td className="px-3.5 py-3">{latestRequest.type || latestRequest.shortType}</td>
                  <td className="px-3.5 py-3 text-[#7a7a6d]">{latestRequest.date}</td>
                  <td className="px-3.5 py-3 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${statusBadgeClasses[getStatusKey(latestRequest.status)]}`}>
                      {latestRequest.status}
                    </span>
                  </td>
                  <td className="px-3.5 py-3 text-right">
                    <button type="button" onClick={(event) => { event.stopPropagation(); onOpenRequest(latestRequest) }} className="font-bold text-[#073b23] hover:underline">[View]</button>
                  </td>
                </tr>
              ) : (
                <tr><td colSpan={7} className="py-10 text-center text-[#7a7a6d]">No OSAS requests yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default DashboardOverview