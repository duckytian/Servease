import { useMemo, useState } from 'react'
import { cardClass, getStatusKey, statusBadgeClasses } from './classes.js'
import { requestTypes, statusOptions } from './data.js'
import { ChatIcon, EditIcon, ExportIcon, FilterIcon, SearchIcon, ViewEyeIcon } from './icons.jsx'

function RequestTable({
  requests,
  onOpenRequest,
  onOpenUpdateModal,
  initialStatusFilter = 'All Statuses',
  onShowToast,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedStatus, setSelectedStatus] = useState(initialStatusFilter || 'All Statuses')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter requests by search query, request type, and status directly in-page
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        req.ref.toLowerCase().includes(q) ||
        req.studentId.toLowerCase().includes(q) ||
        req.studentName.toLowerCase().includes(q) ||
        req.type.toLowerCase().includes(q)

      const matchesType =
        selectedType === 'All Types' ||
        req.type === selectedType ||
        req.shortType === selectedType

      const matchesStatus =
        selectedStatus === 'All Statuses' ||
        req.status.toLowerCase() === selectedStatus.toLowerCase()

      return matchesSearch && matchesType && matchesStatus
    })
  }, [requests, searchQuery, selectedType, selectedStatus])

  // Pagination calculation
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1
  const displayedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredRequests.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredRequests, currentPage, itemsPerPage])

  const handleExportCSV = () => {
    const headers = [
      'Reference No',
      'Student ID',
      'Student Name',
      'Course',
      'Year Level',
      'Request Type',
      'Date Submitted',
      'Status',
      'Remarks',
    ]

    const rows = filteredRequests.map((r) => [
      `"${r.ref}"`,
      `"${r.studentId}"`,
      `"${r.studentName}"`,
      `"${r.course || ''}"`,
      `"${r.yearLevel || ''}"`,
      `"${r.type}"`,
      `"${r.date}"`,
      `"${r.status}"`,
      `"${(r.remarks || '').replace(/"/g, '""')}"`,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute(
      'download',
      `ServeEase_Requests_${new Date().toISOString().slice(0, 10)}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    if (onShowToast) {
      onShowToast(
        `Exported ${filteredRequests.length} requests as CSV successfully.`
      )
    }
  }

  const isAnyFilterActive =
    searchQuery.trim() !== '' ||
    selectedType !== 'All Types' ||
    selectedStatus !== 'All Statuses'

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedType('All Types')
    setSelectedStatus('All Statuses')
    setCurrentPage(1)
  }

  return (
    <section className={cardClass} aria-labelledby="all-requests-heading">
      {/* Header and Title */}
      <div className="flex flex-col gap-4 border-b border-[#e7dfd0] pb-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="all-requests-heading"
              className="font-display text-[22px] font-extrabold tracking-tight text-[#073b23]"
            >
              Requests
            </h2>
            <p className="text-[12px] text-[#6e7368]">
              Manage student service requests, update statuses, and log official remarks.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isAnyFilterActive && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-[#8a7344] hover:text-[#073b23] hover:underline"
              >
                Reset Filters
              </button>
            )}
            <div className="text-[12px] font-medium text-[#7a7a6d]">
              Showing <strong className="text-[#073b23]">{filteredRequests.length}</strong> of{' '}
              <strong className="text-[#073b23]">{requests.length}</strong>
            </div>
          </div>
        </div>

        {/* Clean, Non-Duplicated Toolbar Filters */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by Student ID, Reference Number, or Name..."
              className="w-full rounded-lg border border-[#e7dfd0] bg-white py-2.5 pl-9 pr-4 text-[13px] text-[#1f2d24] placeholder:text-[#9ca3af] outline-none transition-all focus:border-[#073b23] focus:ring-2 focus:ring-[#073b23]/15"
            />
            <SearchIcon className="absolute left-3 top-3 size-4 text-[#8a7344]" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[12px] font-bold text-[#7a7a6d] hover:text-[#1f2d24]"
              >
                &times;
              </button>
            )}
          </div>

          {/* Filter by Request Type Dropdown */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#8a7344] whitespace-nowrap hidden sm:inline-flex">
              <FilterIcon className="size-3" />
              Type:
            </span>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value)
                setCurrentPage(1)
              }}
              className="rounded-lg border border-[#e7dfd0] bg-white px-3 py-2 text-[12px] font-medium text-[#1f2d24] outline-none transition-all focus:border-[#073b23]"
            >
              {requestTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Status Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#8a7344] whitespace-nowrap hidden sm:inline">
              Status:
            </span>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value)
                setCurrentPage(1)
              }}
              className="rounded-lg border border-[#e7dfd0] bg-white px-3 py-2 text-[12px] font-medium text-[#1f2d24] outline-none transition-all focus:border-[#073b23]"
            >
              <option value="All Statuses">All Statuses</option>
              {statusOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Requests Table with Status & Remarks Management */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left text-[12px]">
          <thead>
            <tr className="border-b border-[#eee7da] bg-[#fbf9f5] text-[11px] font-bold uppercase tracking-wider text-[#8a7344]">
              <th className="py-3.5 px-3.5">Ref. No.</th>
              <th className="py-3.5 px-3.5">Student ID</th>
              <th className="py-3.5 px-3.5">Student Name</th>
              <th className="py-3.5 px-3.5">Request Type</th>
              <th className="py-3.5 px-3.5">Date</th>
              <th className="py-3.5 px-3.5 text-center">Status</th>
              <th className="py-3.5 px-3.5">Remarks</th>
              <th className="py-3.5 px-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1ede4]">
            {displayedRequests.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-[#7a7a6d]">
                  <p className="text-[14px] font-semibold text-[#1f2d24]">
                    No matching requests found
                  </p>
                  <p className="mt-1 text-[12px]">
                    Try adjusting your search terms or filter criteria.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-3 rounded-lg border border-[#e7dfd0] bg-white px-3.5 py-1.5 text-[12px] font-bold text-[#073b23] hover:bg-[#f7f3eb]"
                  >
                    Clear All Filters
                  </button>
                </td>
              </tr>
            ) : (
              displayedRequests.map((req) => {
                const statusKey = getStatusKey(req.status)
                const hasRemarks = Boolean(req.remarks && req.remarks.trim())

                return (
                  <tr
                    key={req.ref}
                    className="transition-colors duration-150 hover:bg-[#fbf9f5]"
                  >
                    {/* Ref Number */}
                    <td className="py-3.5 px-3.5 font-bold text-[#073b23]">
                      <button
                        type="button"
                        onClick={() => onOpenRequest(req)}
                        className="hover:underline text-left font-bold"
                        title="View details"
                      >
                        {req.ref}
                      </button>
                    </td>

                    {/* Student ID */}
                    <td className="py-3.5 px-3.5 font-mono text-[11px] text-[#5f6f62]">
                      {req.studentId}
                    </td>

                    {/* Student Name */}
                    <td className="py-3.5 px-3.5 font-semibold text-[#1f2d24]">
                      {req.studentName}
                    </td>

                    {/* Request Type */}
                    <td className="py-3.5 px-3.5 text-[#1f2d24]">
                      {req.shortType || req.type}
                    </td>

                    {/* Date Submitted */}
                    <td className="py-3.5 px-3.5 text-[#7a7a6d] whitespace-nowrap">
                      {req.date}
                    </td>

                    {/* Status Management Column: Status Badge with Quick Update action */}
                    <td className="py-3.5 px-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => onOpenUpdateModal && onOpenUpdateModal(req)}
                        title="Click to update status"
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide uppercase transition-transform hover:scale-105 active:scale-95 ${
                          statusBadgeClasses[statusKey]
                        }`}
                      >
                        <span>{req.status}</span>
                        <EditIcon className="size-2.5 opacity-60" />
                      </button>
                    </td>

                    {/* Remarks Management Column: Organized preview and direct add/edit */}
                    <td className="py-3.5 px-3.5 max-w-[240px]">
                      {hasRemarks ? (
                        <div
                          onClick={() => onOpenUpdateModal && onOpenUpdateModal(req)}
                          className="group cursor-pointer rounded-md p-1 -m-1 transition-colors hover:bg-[#edf5ee]"
                          title="Click to edit remarks"
                        >
                          <div className="flex items-start gap-1.5">
                            <ChatIcon className="size-3.5 shrink-0 text-[#8a7344] mt-0.5" />
                            <p className="line-clamp-2 text-[11px] leading-snug text-[#1f2d24] group-hover:text-[#073b23]">
                              {req.remarks}
                            </p>
                          </div>
                          {req.remarksTimestamp && (
                            <span className="mt-0.5 block text-[9px] text-[#7a7a6d]">
                              {req.remarksTimestamp}
                            </span>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenUpdateModal && onOpenUpdateModal(req)}
                          className="inline-flex items-center gap-1 rounded border border-dashed border-[#ded8cb] px-2 py-0.5 text-[10px] font-semibold text-[#8a7344] hover:border-[#073b23] hover:text-[#073b23]"
                        >
                          <span>+ Add Remark</span>
                        </button>
                      )}
                    </td>

                    {/* Actions Column: View Details & Direct Update */}
                    <td className="py-3.5 px-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Update Status & Remarks Button */}
                        <button
                          type="button"
                          onClick={() => onOpenUpdateModal && onOpenUpdateModal(req)}
                          className="inline-flex items-center gap-1 rounded border border-[#e7dfd0] bg-white px-2.5 py-1 text-[11px] font-bold text-[#073b23] transition-colors hover:bg-[#edf5ee] hover:border-[#073b23]"
                          title="Update Status & Remarks directly"
                        >
                          <EditIcon className="size-3 text-[#8a7344]" />
                          <span>Update</span>
                        </button>

                        {/* View Full Details Button */}
                        <button
                          type="button"
                          onClick={() => onOpenRequest(req)}
                          className="inline-flex items-center gap-1 rounded bg-[#073b23] px-2.5 py-1 text-[11px] font-bold text-white transition-colors hover:bg-[#042916]"
                          title="View complete request information and audit history"
                        >
                          <ViewEyeIcon className="size-3" />
                          <span>View</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: Pagination & Export Table Button */}
      <div className="mt-6 flex flex-col gap-4 border-t border-[#e7dfd0] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[12px] text-[#7a7a6d]">
          Showing{' '}
          <strong className="text-[#1f2d24]">
            {filteredRequests.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
          </strong>{' '}
          to{' '}
          <strong className="text-[#1f2d24]">
            {Math.min(currentPage * itemsPerPage, filteredRequests.length)}
          </strong>{' '}
          of <strong className="text-[#1f2d24]">{filteredRequests.length}</strong> entries
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          {/* Pagination in strict Green / Beige / White */}
          <div className="flex items-center gap-1.5" aria-label="Pagination">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="grid size-7 place-items-center rounded border border-[#e7dfd0] bg-white text-[12px] font-bold text-[#073b23] transition-all hover:bg-[#f7f3eb] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous Page"
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setCurrentPage(pageNumber)}
                className={`grid size-7 place-items-center rounded text-[12px] font-bold transition-all ${
                  currentPage === pageNumber
                    ? 'bg-[#073b23] text-white shadow-xs'
                    : 'border border-[#e7dfd0] bg-white text-[#1f2d24] hover:bg-[#f7f3eb]'
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="grid size-7 place-items-center rounded border border-[#e7dfd0] bg-white text-[12px] font-bold text-[#073b23] transition-all hover:bg-[#f7f3eb] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next Page"
            >
              &gt;
            </button>
          </div>

          {/* Export Table Button */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#e7dfd0] bg-[#fbf9f5] px-3.5 py-2 text-[12px] font-bold text-[#073b23] shadow-xs transition-all hover:border-[#073b23] hover:bg-white active:scale-95"
          >
            <ExportIcon className="size-3.5" />
            <span>Export Table</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default RequestTable
