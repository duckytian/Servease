import {cardClass, getStatusKey, statusBadgeClasses} from './classes.js';
import {
  AllRequestsIcon,
  CompletedIcon,
  PendingIcon,
  ProcessingIcon
} from './icons.jsx';

function DashboardOverview({
  requests,
  statusCounts,
  onOpenRequest,
  onNavigate
}) {
  const latestRequest = requests.reduce(
    (latest, req) => (!latest || new Date(req.date) > new Date(latest.date) ? req : latest),
    null,
  );
  const recentRequests = latestRequest ? [latestRequest] : [];

  const statCards = [
    {
      key: 'all-requests',
      title: 'Total Requests',
      count: requests.length,
      bg: 'bg-[#073B23]',
      hoverRing: 'hover:ring-2 hover:ring-[#073B23]/30',
      Icon: AllRequestsIcon,
      nav: 'all-requests'
    },
    {
      key: 'pending',
      title: 'Pending',
      count: statusCounts.Pending || 0,
      bg: 'bg-[#8A7344]',
      hoverRing: 'hover:ring-2 hover:ring-[#8A7344]/30',
      Icon: PendingIcon,
      nav: 'pending'
    },
    {
      key: 'processing',
      title: 'Processing',
      count: statusCounts.Processing || 0,
      bg: 'bg-[#0A4B2D]',
      hoverRing: 'hover:ring-2 hover:ring-[#0A4B2D]/30',
      Icon: ProcessingIcon,
      nav: 'processing'
    },
    {
      key: 'completed',
      title: 'Completed',
      count: statusCounts.Completed || 0,
      bg: 'bg-[#16843F]',
      hoverRing: 'hover:ring-2 hover:ring-[#16843F]/30',
      Icon: CompletedIcon,
      nav: 'completed'
    }
  ];

  return (
    <div className="space-y-4">
      {/* 4 Statistics Cards row in strict Green, Beige, White */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(card => {
          const {key, title, count, bg, hoverRing, Icon, nav} = card;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate(nav)}
              className={`group flex flex-col justify-between rounded-xl ${bg} ${hoverRing} p-4 text-left text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-white/90 sm:text-[13px]">
                  {title}
                </span>
                <Icon className="size-4 text-white/70 transition-transform group-hover:scale-110" />
              </div>
              <div className="mt-3">
                <span className="font-display text-[24px] font-extrabold tracking-tight leading-none sm:text-[28px]">
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Recent Requests Section */}
      <section className={cardClass} aria-labelledby="recent-requests-title">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#E7DFD0] pb-4">
          <div>
            <h3
              id="recent-requests-title"
              className="font-display text-[17px] font-extrabold tracking-tight text-[#073B23]"
            >
              Recent Requests
            </h3>
            <p className="text-[12px] text-[#77786F]">
              Latest student service submissions requiring attention or status
              updates.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('all-requests')}
            className="text-[12px] font-bold text-[#073B23] hover:text-[#0A4B2D] hover:underline"
          >
            View All Requests &rarr;
          </button>
        </div>

        {/* Responsive Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left text-[12px]">
            <thead>
              <tr className="border-b border-[#E7DFD0] bg-[#FBF9F5] text-[11px] font-bold uppercase tracking-wider text-[#8A7344]">
                <th className="py-3 px-3.5">Ref. No.</th>
                <th className="py-3 px-3.5">Student ID</th>
                <th className="py-3 px-3.5">Student Name</th>
                <th className="py-3 px-3.5">Request Type</th>
                <th className="py-3 px-3.5">Date Submitted</th>
                <th className="py-3 px-3.5 text-center">Status</th>
                <th className="py-3 px-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD0]">
              {recentRequests.map(req => {
                const statusKey = getStatusKey(req.status);
                return (
                  <tr
                    key={req.ref}
                    onClick={() => onOpenRequest(req)}
                    className="cursor-pointer transition-colors duration-150 hover:bg-[#FBF9F5]"
                  >
                    <td className="py-3 px-3.5 font-bold text-[#073B23]">
                      {req.ref}
                    </td>
                    <td className="py-3 px-3.5 text-[#77786F]">
                      {req.studentId}
                    </td>
                    <td className="py-3 px-3.5 font-semibold text-[#073B23]">
                      {req.studentName}
                    </td>
                    <td className="py-3 px-3.5 text-[#073B23]">
                      {req.shortType || req.type}
                    </td>
                    <td className="py-3 px-3.5 text-[#77786F]">{req.date}</td>
                    <td className="py-3 px-3.5 text-center">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide uppercase ${
                          statusBadgeClasses[statusKey]
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-right">
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          onOpenRequest(req);
                        }}
                        className="rounded px-2.5 py-1 text-[11px] font-bold text-[#073B23] transition-colors hover:bg-[#F4F2ED] hover:underline"
                      >
                        [View]
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default DashboardOverview;
