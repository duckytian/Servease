import { cardClass, statusBadgeClasses, statusDotClasses, statusSegmentClasses } from '../classes.js'
import { statuses, statusClass } from '../data.js'
import { CalendarIcon, CheckIcon, ClockIcon, ListIcon } from '../icons.jsx'

function DashboardOverview({ requests, onNavigate = () => {} }) {
  const statusCounts = statuses.reduce((counts, status) => {
    counts[status] = requests.filter((request) => request.status === status).length
    return counts
  }, {})

  const total = requests.length
  const statCards = [
    {
      key: 'total',
      title: 'Total Requests',
      count: total,
      description: 'All submitted requests',
      bg: 'bg-[#073B23]',
      hoverRing: 'hover:ring-2 hover:ring-[#073B23]/30',
      Icon: CalendarIcon,
    },
    {
      key: 'pending',
      title: 'Pending Requests',
      count: statusCounts.Pending,
      description: 'Awaiting review',
      bg: 'bg-[#8A7344]',
      hoverRing: 'hover:ring-2 hover:ring-[#8A7344]/30',
      Icon: ClockIcon,
    },
    {
      key: 'processing',
      title: 'Processing Requests',
      count: statusCounts.Processing,
      description: 'Currently in progress',
      bg: 'bg-[#0A4B2D]',
      hoverRing: 'hover:ring-2 hover:ring-[#0A4B2D]/30',
      Icon: ListIcon,
    },
    {
      key: 'completed',
      title: 'Completed Requests',
      count: statusCounts.Completed,
      description: 'Successfully completed',
      bg: 'bg-[#042916]',
      hoverRing: 'hover:ring-2 hover:ring-[#042916]/30',
      Icon: CheckIcon,
    },
  ]

  const trackedRequests = [...requests].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ key, title, count, description, bg, hoverRing, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onNavigate('my-requests')}
            className={`group flex flex-col justify-between rounded-xl ${bg} ${hoverRing} p-4 text-left text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-bold text-white/90 sm:text-[13px]">{title}</span>
              <Icon className="size-4 shrink-0 text-white/70 transition-transform group-hover:scale-110" />
            </div>
            <div className="mt-3">
              <span className="font-display text-[24px] font-extrabold tracking-tight leading-none sm:text-[28px]">
                {count}
              </span>
              <span className="mt-1.5 block text-[11px] font-medium text-white/75">{description}</span>
            </div>
          </button>
        ))}
      </div>

      <section className={cardClass} aria-labelledby="sd-status-title">
        <div className="flex flex-col gap-2 border-b border-[#E7DFD0] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="sd-status-title" className="font-display text-[17px] font-extrabold tracking-tight text-[#073B23]">
              Request Status Overview
            </h2>
            <p className="text-[12px] text-[#8A7344]">Distribution of your requests by current status</p>
          </div>
          <span className="rounded-full border border-[#E7DFD0] bg-[#FBF9F5] px-3 py-1 text-[11px] font-bold text-[#073B23]">
            {total} total
          </span>
        </div>

        <div
          className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-[#E7DFD0]"
          role="img"
          aria-label={statuses.map((status) => `${status} ${statusCounts[status]}`).join(', ')}
        >
          {statuses.map((status) => (
            <span
              className={`block h-full ${statusSegmentClasses[statusClass(status)]}`}
              key={status}
              style={{ width: `${total ? (statusCounts[status] / total) * 100 : 0}%` }}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {statuses.map((status) => (
            <div className="flex items-center gap-1.5 text-[11px] text-[#8A7344]" key={status}>
              <span className={`size-2 rounded-full ${statusDotClasses[statusClass(status)]}`} />
              <span>{status}</span>
              <strong className="text-[12px] font-extrabold text-[#073B23]">{statusCounts[status]}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={cardClass} aria-labelledby="sd-tracker-title">
        <div className="flex flex-col gap-2 border-b border-[#E7DFD0] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="sd-tracker-title" className="font-display text-[17px] font-extrabold tracking-tight text-[#073B23]">
              Request Status Tracker
            </h2>
            <p className="text-[12px] text-[#8A7344]">
              Live status and staff remarks for your submitted requests.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('my-requests')}
            className="text-[12px] font-bold text-[#073B23] hover:text-[#0A4B2D] hover:underline"
          >
            View My Requests &rarr;
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left text-[12px]">
            <thead>
              <tr className="border-b border-[#E7DFD0] bg-[#FBF9F5] text-[11px] font-bold uppercase tracking-wider text-[#8A7344]">
                {['Ref No.', 'Department', 'Type of Request', 'Date Submitted', 'Current Status', 'Staff Remarks'].map((column) => (
                  <th className="py-3 px-3.5" key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD0]">
              {trackedRequests.length === 0 ? (
                <tr>
                  <td className="py-12 text-center text-[12px] text-[#8A7344]" colSpan={6}>
                    You have not submitted any requests yet.
                  </td>
                </tr>
              ) : (
                trackedRequests.map((request) => (
                  <tr className="transition-colors duration-150 hover:bg-[#FBF9F5]" key={request.ref}>
                    <td className="py-3 px-3.5 font-bold text-[#073B23]">{request.ref}</td>
                    <td className="py-3 px-3.5 font-semibold text-[#073B23]">{request.department}</td>
                    <td className="py-3 px-3.5 text-[#073B23]">{request.shortType || request.type}</td>
                    <td className="py-3 px-3.5 text-[#8A7344]">{request.date}</td>
                    <td className="py-3 px-3.5">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${statusBadgeClasses[statusClass(request.status)]}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-[#8A7344]">
                      {request.remarks || <span aria-label="No remarks">—</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default DashboardOverview
