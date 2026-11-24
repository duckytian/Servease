import { statuses, statusClass } from '../data.js'
import { CalendarIcon, CheckIcon, ClockIcon, ListIcon } from '../icons.jsx'

const cardStyles = {
  total: {
    card: 'border-[#E7DFD0] bg-[#D8C6A5]',
    icon: 'bg-white/70 text-[#073B23]',
    value: 'text-[#073B23]',
    label: 'text-[#073B23]',
    description: 'text-[#0A4B2D]',
  },
  pending: {
    card: 'border-[#E7DFD0] bg-[#EDE8D0]',
    icon: 'bg-white/70 text-[#0A4B2D]',
    value: 'text-[#073B23]',
    label: 'text-[#073B23]',
    description: 'text-[#0A4B2D]',
  },
  processing: {
    card: 'border-[#E7DFD0] bg-[#D8C6A5]',
    icon: 'bg-white/70 text-[#073B23]',
    value: 'text-[#073B23]',
    label: 'text-[#073B23]',
    description: 'text-[#0A4B2D]',
  },
  completed: {
    card: 'border-[#E7DFD0] bg-[#EDE8D0]',
    icon: 'bg-white/70 text-[#0A4B2D]',
    value: 'text-[#073B23]',
    label: 'text-[#073B23]',
    description: 'text-[#0A4B2D]',
  },
}

const segmentClasses = {
  pending: 'bg-[#C76E00]',
  processing: 'bg-[#3B82F6]',
  completed: 'bg-[#8B5CF6]',
  rejected: 'bg-[#EF4444]',
}

const dotClasses = {
  pending: 'bg-[#C76E00]',
  processing: 'bg-[#3B82F6]',
  completed: 'bg-[#8B5CF6]',
  rejected: 'bg-[#EF4444]',
}

const badgeClasses = {
  pending: 'bg-[#FFF7ED] text-[#C76E00]',
  processing: 'bg-[#EFF6FF] text-[#1D4ED8]',
  completed: 'bg-[#F5F3FF] text-[#6D28D9]',
  rejected: 'bg-[#FEF2F2] text-[#B91C1C]',
}

function DashboardOverview({ requests }) {
  const statusCounts = statuses.reduce((counts, status) => {
    counts[status] = requests.filter((request) => request.status === status).length
    return counts
  }, {})

  const total = requests.length
  const summaryCards = [
    {
      title: 'Total Requests',
      count: total,
      description: 'All submitted requests',
      tone: 'total',
      Icon: CalendarIcon,
    },
    {
      title: 'Pending Requests',
      count: statusCounts.Pending,
      description: 'Awaiting review',
      tone: 'pending',
      Icon: ClockIcon,
    },
    {
      title: 'Processing Requests',
      count: statusCounts.Processing,
      description: 'Currently in progress',
      tone: 'processing',
      Icon: ListIcon,
    },
    {
      title: 'Completed Requests',
      count: statusCounts.Completed,
      description: 'Successfully completed',
      tone: 'completed',
      Icon: CheckIcon,
    },
  ]

  const trackedRequests = [...requests].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="space-y-5">
      <section aria-labelledby="sd-summary-title">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[1.4px] text-[#0A4B2D] uppercase">
              Student Overview
            </p>
            <h2 id="sd-summary-title" className="mt-1 text-[16px] font-extrabold text-[#073B23]">
              Summary of Requests
            </h2>
            <p className="mt-1 text-[10.5px] text-[#77786F]">
              A quick snapshot of your submitted service requests and their current status.
            </p>
          </div>
          <span className="text-[11px] text-[#77786F]">Updated just now</span>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[641px]:grid-cols-2 min-[1101px]:grid-cols-4">
          {summaryCards.map(({ title, count, description, tone, Icon }) => (
            <article
              className={`flex items-center gap-3 rounded-[10px] border px-4 py-[14px] shadow-[0_2px_8px_rgba(7,59,35,0.12)] ${cardStyles[tone].card}`}
              key={title}
            >
              <span className={`grid size-9 shrink-0 place-items-center rounded-[9px] [&>svg]:size-[18px] ${cardStyles[tone].icon}`}>
                <Icon />
              </span>
              <div className="min-w-0">
                <p className={`text-[22px] leading-none font-extrabold ${cardStyles[tone].value}`}>{count}</p>
                <h3 className={`mt-1 truncate text-[11.5px] font-bold ${cardStyles[tone].label}`}>{title}</h3>
                <p className={`mt-[2px] truncate text-[9.5px] ${cardStyles[tone].description}`}>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[10px] border border-[#E3E8E5] bg-white px-4 py-[14px] shadow-[0_2px_8px_rgba(18,44,30,0.04)]" aria-labelledby="sd-status-title">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <h2 id="sd-status-title" className="text-[14px] font-bold text-[#073B23]">Request Status Overview</h2>
            <p className="mt-1 text-[10.5px] text-[#77786F]">Distribution of your requests by current status</p>
          </div>
          <span className="rounded-full bg-[#F7F5F0] px-2.5 py-1 text-[10px] font-bold text-[#0A4B2D]">
            {total} total
          </span>
        </div>

        <div
          className="flex h-[12px] w-full overflow-hidden rounded-full bg-[#E3E8E5]"
          role="img"
          aria-label={statuses.map((status) => `${status} ${statusCounts[status]}`).join(', ')}
        >
          {statuses.map((status) => (
            <span
              className={`block h-full ${segmentClasses[statusClass(status)]}`}
              key={status}
              style={{ width: `${total ? (statusCounts[status] / total) * 100 : 0}%` }}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {statuses.map((status) => (
            <div className="flex items-center gap-[7px] text-[10.5px] text-[#77786F]" key={status}>
              <span className={`size-[7px] rounded-full ${dotClasses[statusClass(status)]}`} />
              <span>{status}</span>
              <strong className="text-[11px] font-bold text-[#073B23]">{statusCounts[status]}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[10px] border border-[#E3E8E5] bg-white shadow-[0_2px_10px_rgba(18,44,30,0.05)]" aria-labelledby="sd-tracker-title">
        <div className="flex flex-col gap-3 border-b border-[#E3E8E5] bg-[#F7F5F0] px-4 py-[14px] min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[1.4px] text-[#0A4B2D] uppercase">Status Tracker</p>
            <h2 id="sd-tracker-title" className="mt-1 text-[16px] font-bold text-[#073B23]">
              Request Status Tracker
            </h2>
            <p className="mt-1 text-[10.5px] text-[#77786F]">
              Live status and staff remarks for your submitted requests.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="text-[9.5px] font-bold tracking-[1px] text-[#0A4B2D] uppercase">Indicator:</span>
            {statuses.map((status) => (
              <span className="inline-flex items-center gap-1.5 text-[10.5px] text-[#77786F]" key={status}>
                <span className={`size-[7px] rounded-full ${dotClasses[statusClass(status)]}`} />
                {status}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E3E8E5]">
                {['Ref No.', 'Department', 'Type of Request', 'Date Submitted', 'Current Status', 'Staff Remarks'].map((column) => (
                  <th
                    className="px-4 py-[11px] text-[9.5px] font-bold tracking-[0.8px] text-[#77786F] uppercase"
                    key={column}
                    scope="col"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trackedRequests.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-[11.5px] text-[#77786F]" colSpan={6}>
                    You have not submitted any requests yet.
                  </td>
                </tr>
              ) : (
                trackedRequests.map((request) => (
                  <tr
                    className="border-b border-[#E3E8E5] transition-colors duration-150 last:border-b-0 hover:bg-[#F7F5F0]"
                    key={request.ref}
                  >
                    <td className="px-4 py-[12px] text-[11.5px] font-bold text-[#073B23]">{request.ref}</td>
                    <td className="px-4 py-[12px] text-[11.5px] text-[#073B23]">{request.department}</td>
                    <td className="px-4 py-[12px] text-[11.5px] text-[#073B23]">
                      {request.shortType || request.type}
                    </td>
                    <td className="px-4 py-[12px] text-[11.5px] text-[#77786F]">{request.date}</td>
                    <td className="px-4 py-[12px]">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[9.5px] font-bold tracking-[0.3px] uppercase ${badgeClasses[statusClass(request.status)]}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-[12px] text-[11.5px] text-[#77786F]">
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
