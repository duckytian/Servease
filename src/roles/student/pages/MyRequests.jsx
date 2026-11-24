import { cardClass, eyebrowClass, headingClass, statusBadgeClasses } from './classes.js'
import { statusClass } from './data.js'

function MyRequests({ requests, onOpen }) {
  return (
    <section className={cardClass} aria-labelledby="my-requests-title">
      <div className="mb-[16px] flex flex-col gap-2 border-b border-[#E3E8E5] pb-[14px] min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between">
        <div>
          <p className={eyebrowClass}>Status Tracker</p>
          <h2 id="my-requests-title" className={headingClass}>
            My Requests
          </h2>
          <p className="mt-1 text-[11px] text-[#77786F]">
            Only requests submitted by your account are shown here.
          </p>
        </div>
        <span className="rounded-full bg-[#F7F5F0] px-3 py-1 text-[11px] font-bold text-[#073B23]">
          {requests.length} {requests.length === 1 ? 'request' : 'requests'}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-[12px]">
          <thead>
            <tr className="border-b border-[#E3E8E5] bg-[#F7F5F0] text-[11px] font-bold uppercase tracking-wider text-[#0A4B2D]">
              <th className="px-3.5 py-3">Reference No.</th>
              <th className="px-3.5 py-3">Request Type</th>
              <th className="px-3.5 py-3">Date Submitted</th>
              <th className="px-3.5 py-3 text-center">Status</th>
              <th className="px-3.5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F7F5F0]">
            {requests.length === 0 ? (
              <tr>
                <td className="py-10 text-center text-[12px] text-[#77786F]" colSpan={5}>
                  You have not submitted any requests yet.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr className="transition-colors duration-150 hover:bg-[#F7F5F0]" key={request.ref}>
                  <td className="px-3.5 py-3 font-bold text-[#073B23]">{request.ref}</td>
                  <td className="px-3.5 py-3 font-semibold text-[#073B23]">
                    {request.shortType ? `${request.shortType} · ${request.type}` : request.type}
                  </td>
                  <td className="px-3.5 py-3 text-[#77786F]">{request.date}</td>
                  <td className="px-3.5 py-3 text-center">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusBadgeClasses[statusClass(request.status)]}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-3.5 py-3 text-right">
                    <button
                      className="rounded px-2.5 py-1 text-[11px] font-bold text-[#073B23] transition-colors duration-150 hover:bg-[#F7F5F0] hover:underline"
                      type="button"
                      onClick={() => onOpen(request)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default MyRequests
