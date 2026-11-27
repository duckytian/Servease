import { useMemo, useState } from 'react'
import { cardClass, getStatusKey, statusBadgeClasses } from './classes.js'
import { requestTypes, statusOptions } from './data.js'
import { ExportIcon, SearchIcon } from './icons.jsx'

function RequestTable({ requests, activeFilterStatus = null, onOpenRequest, onShowToast }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedStatus, setSelectedStatus] = useState(activeFilterStatus || 'All Statuses')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const effectiveStatus = activeFilterStatus || selectedStatus

  const filteredRequests = useMemo(() => requests.filter((request) => {
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch = !query ||
      request.ref?.toLowerCase().includes(query) ||
      request.studentId?.toLowerCase().includes(query) ||
      request.studentName?.toLowerCase().includes(query) ||
      request.type?.toLowerCase().includes(query)
    const matchesType = selectedType === 'All Types' || request.type === selectedType || request.shortType === selectedType
    const matchesStatus = effectiveStatus === 'All Statuses' || request.status?.toLowerCase() === effectiveStatus.toLowerCase()
    return matchesSearch && matchesType && matchesStatus
  }), [requests, searchQuery, selectedType, effectiveStatus])

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1
  const displayedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const exportCSV = () => {
    const headers = ['Reference No', 'Requester ID', 'Requester Name', 'Issue Type', 'Date Submitted', 'Status', 'Assigned Technician', 'Remarks']
    const rows = filteredRequests.map((request) => [
      request.ref, request.studentId, request.studentName, request.type, request.date, request.status,
      request.technician || '', (request.remarks || '').replace(/"/g, '""'),
    ].map((value) => `"${value}"`).join(','))
    const link = document.createElement('a')
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent([headers.join(','), ...rows].join('\n'))}`
    link.download = `ServeEase_IT_Requests_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    onShowToast(`Exported ${filteredRequests.length} IT requests successfully.`)
  }

  return (
    <section className={cardClass}>
      <div className="flex flex-col gap-4 border-b border-[#e7dfd0] pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-extrabold text-[#073b23]">{activeFilterStatus ? `${activeFilterStatus} Requests` : 'All Requests'}</h2>
            <p className="text-[12px] text-[#6e7368]">Search, filter, and process technical service requests.</p>
          </div>
          <div className="text-[12px] text-[#7a7a6d]">Total Found: <strong className="text-[#073b23]">{filteredRequests.length}</strong></div>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 size-4 text-[#8a7344]" />
            <input value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1) }} placeholder="Search by requester ID or reference number..." className="w-full rounded-lg border border-[#e7dfd0] py-2.5 pl-9 pr-4 text-[13px] outline-none focus:border-[#073b23]" />
          </div>
          <select value={selectedType} onChange={(event) => { setSelectedType(event.target.value); setCurrentPage(1) }} className="rounded-lg border border-[#e7dfd0] px-3 py-2 text-[12px]">
            {requestTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
          {!activeFilterStatus && (
            <select value={selectedStatus} onChange={(event) => { setSelectedStatus(event.target.value); setCurrentPage(1) }} className="rounded-lg border border-[#e7dfd0] px-3 py-2 text-[12px]">
              <option>All Statuses</option>
              {statusOptions.map((status) => <option key={status}>{status}</option>)}
            </select>
          )}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-[12px]">
          <thead className="border-b border-[#eee7da] bg-[#fbf9f5] text-[11px] font-bold uppercase text-[#8a7344]">
            <tr>
              <th className="px-3.5 py-3.5">Ref. No.</th><th className="px-3.5 py-3.5">Requester ID</th><th className="px-3.5 py-3.5">Requester Name</th>
              <th className="px-3.5 py-3.5">Issue Type</th><th className="px-3.5 py-3.5">Date Submitted</th><th className="px-3.5 py-3.5 text-center">Status</th><th className="px-3.5 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1ede4]">
            {displayedRequests.length ? displayedRequests.map((request) => {
              const statusKey = getStatusKey(request.status)
              return (
                <tr key={request.ref} onClick={() => onOpenRequest(request)} className="cursor-pointer hover:bg-[#fbf9f5]">
                  <td className="px-3.5 py-3.5 font-bold text-[#073b23]">{request.ref}</td>
                  <td className="px-3.5 py-3.5 font-mono text-[#5f6f62]">{request.studentId}</td>
                  <td className="px-3.5 py-3.5 font-semibold">{request.studentName}</td>
                  <td className="px-3.5 py-3.5">{request.shortType || request.type}</td>
                  <td className="px-3.5 py-3.5 text-[#7a7a6d]">{request.date}</td>
                  <td className="px-3.5 py-3.5 text-center"><span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${statusBadgeClasses[statusKey]}`}>{request.status}</span></td>
                  <td className="px-3.5 py-3.5 text-right"><button type="button" onClick={(event) => { event.stopPropagation(); onOpenRequest(request) }} className="font-bold text-[#073b23] hover:underline">[View]</button></td>
                </tr>
              )
            }) : (
              <tr><td colSpan={7} className="py-12 text-center text-[#7a7a6d]"><strong className="block text-[#1f2d24]">No matching requests found</strong>Try adjusting your search or filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#e7dfd0] pt-4">
        <div className="text-[12px] text-[#7a7a6d]">Showing {filteredRequests.length ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} entries</div>
        <div className="flex gap-3">
          <button type="button" disabled={currentPage <= 1} onClick={() => setCurrentPage((page) => page - 1)} className="grid size-7 place-items-center rounded border border-[#e7dfd0] disabled:opacity-40">&lt;</button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button key={page} type="button" onClick={() => setCurrentPage(page)} className={`grid size-7 place-items-center rounded text-[12px] font-bold ${currentPage === page ? 'bg-[#073b23] text-white' : 'border border-[#e7dfd0]'}`}>{page}</button>
          ))}
          <button type="button" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((page) => page + 1)} className="grid size-7 place-items-center rounded border border-[#e7dfd0] disabled:opacity-40">&gt;</button>
          <button type="button" onClick={exportCSV} className="inline-flex items-center gap-1.5 rounded-lg border border-[#e7dfd0] px-3 py-2 text-[12px] font-bold text-[#073b23]"><ExportIcon className="size-3.5" />Export Table</button>
        </div>
      </div>
    </section>
  )
}

export default RequestTable