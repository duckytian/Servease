import { cardClass, eyebrowClass, headingClass, statusBadgeClasses, subTextClass } from './classes.js'
import { statusClass } from './data.js'

function MyRequests({ requests, onOpen }) {
  return (
    <section className={cardClass} aria-labelledby="my-requests-title">
      <div className="flex flex-col gap-3 border-b border-[#E7DFD0] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={eyebrowClass}>Status Tracker</p>
          <h2 id="my-requests-title" className={headingClass}>
            My Requests
          </h2>
          <p className={subTextClass}>Only requests submitted by your account are shown here.</p>
        </div>
        <span className="rounded-full border border-[#E7DFD0] bg-[#FBF9F5] px-3 py-1 text-[11px] font-bold text-[#073B23]">
          {requests.length} {requests.length === 1 ? 'request' : 'requests'}
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left text-[12px]">
          <thead>
            <tr className="border-b border-[#E7DFD0] bg-[#FBF9F5] text-[11px] font-bold uppercase tracking-wider text-[#8A7344]">
              <th className="py-3 px-3.5">Reference No.</th>
              <th className="py-3 px-3.5">Request Type</th>
              <th className="py-3 px-3.5">Date Submitted</th>
              <th className="py-3 px-3.5 text-center">Status</th>
              <th className="py-3 px-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7DFD0]">
            {requests.length === 0 ? (
              <tr>
                <td className="py-12 text-center text-[12px] text-[#8A7344]" colSpan={5}>
                  You have not submitted any requests yet.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr className="transition-colors duration-150 hover:bg-[#FBF9F5]" key={request.ref}>
                  <td className="py-3 px-3.5 font-bold text-[#073B23]">{request.ref}</td>
                  <td className="py-3 px-3.5 font-semibold text-[#073B23]">
                    {request.shortType ? `${request.shortType} · ${request.type}` : request.type}
                  </td>
                  <td className="py-3 px-3.5 text-[#8A7344]">{request.date}</td>
                  <td className="py-3 px-3.5 text-center">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${statusBadgeClasses[statusClass(request.status)]}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-right">
                    <button
                      className="rounded px-2.5 py-1 text-[12px] font-bold text-[#073B23] transition-colors hover:bg-[#FBF9F5] hover:underline"
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
