import { useMemo, useState } from 'react'
import { cardClass, getStatusKey, statusBadgeClasses } from './classes.js'
import {
  ArrowBackIcon,
  ChatIcon,
  CheckIcon,
  ClockIcon,
  SearchIcon,
} from './icons.jsx'

function StudentPortalView({ requests, onBackToRegistrar }) {
  const [selectedStudentId, setSelectedStudentId] = useState('2021-1001-MNL')
  const [searchRef, setSearchRef] = useState('')

  const studentList = useMemo(() => {
    const map = new Map()
    requests.forEach((r) => {
      if (!map.has(r.studentId)) {
        map.set(r.studentId, {
          id: r.studentId,
          name: r.studentName,
          course: r.course,
        })
      }
    })
    return Array.from(map.values())
  }, [requests])

  const currentStudent = useMemo(() => {
    return (
      studentList.find((s) => s.id === selectedStudentId) ||
      studentList[0] || {
        id: '2021-1001-MNL',
        name: 'Juan Dela Cruz',
        course: 'BSIT',
      }
    )
  }, [studentList, selectedStudentId])

  const studentRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchesStudent = r.studentId === currentStudent.id
      const matchesSearch =
        !searchRef.trim() ||
        r.ref.toLowerCase().includes(searchRef.trim().toLowerCase()) ||
        r.type.toLowerCase().includes(searchRef.trim().toLowerCase())
      return matchesStudent && matchesSearch
    })
  }, [requests, currentStudent.id, searchRef])

  const [selectedRequestRef, setSelectedRequestRef] = useState(null)

  const activeRequest = useMemo(() => {
    if (selectedRequestRef) {
      const found = studentRequests.find((r) => r.ref === selectedRequestRef)
      if (found) return found
    }
    return studentRequests[0] || null
  }, [studentRequests, selectedRequestRef])

  return (
    <div className="space-y-6">
      {/* Top Banner in pure Green, Beige, White */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#cde5d2] bg-[#edf5ee] p-4 text-[#073b23] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-[#073b23] text-[#d8c39a]">
            <span className="font-display font-extrabold text-[12px]">SV</span>
          </div>
          <div>
            <h3 className="font-display text-[15px] font-extrabold text-[#073b23]">
              Student View Mode (Live Sync)
            </h3>
            <p className="text-[12px] text-[#0a4b2d]">
              This is how students monitor the real-time status of their requests and read your remarks.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Student Selector */}
          <div className="flex items-center gap-1.5 text-[12px]">
            <span className="font-semibold text-[#073b23]">Viewing as:</span>
            <select
              value={selectedStudentId}
              onChange={(e) => {
                setSelectedStudentId(e.target.value)
                setSelectedRequestRef(null)
              }}
              className="rounded-lg border border-[#e7dfd0] bg-white px-2.5 py-1 font-semibold text-[#073b23] shadow-xs outline-none focus:border-[#073b23]"
            >
              {studentList.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.id})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onBackToRegistrar}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#073b23] px-3.5 py-1.5 text-[12px] font-bold text-white transition-all hover:bg-[#042916]"
          >
            <ArrowBackIcon className="size-3.5" />
            <span>Return to Registrar</span>
          </button>
        </div>
      </div>

      {/* Main Student Section: "My Requests" */}
      <div className={cardClass}>
        <div className="flex flex-col gap-3 border-b border-[#e7dfd0] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-[20px] font-extrabold tracking-tight text-[#073b23]">
              My Requests
            </h2>
            <p className="text-[12px] text-[#6e7368]">
              Track the progress of your submitted documents and view registrar remarks.
            </p>
          </div>

          {/* Search by Reference Number */}
          <div className="relative w-full sm:w-[280px]">
            <input
              type="text"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              placeholder="Search by reference number..."
              className="w-full rounded-lg border border-[#e7dfd0] bg-white py-2 pl-8 pr-3 text-[12px] text-[#1f2d24] placeholder:text-[#9ca3af] outline-none transition-all focus:border-[#073b23]"
            />
            <SearchIcon className="absolute left-2.5 top-2.5 size-3.5 text-[#8a7344]" />
          </div>
        </div>

        {/* My Requests Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[550px] border-collapse text-left text-[12px]">
            <thead>
              <tr className="border-b border-[#eee7da] bg-[#fbf9f5] text-[11px] font-bold uppercase tracking-wider text-[#8a7344]">
                <th className="py-3 px-3.5">Reference No.</th>
                <th className="py-3 px-3.5">Document</th>
                <th className="py-3 px-3.5">Date Submitted</th>
                <th className="py-3 px-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1ede4]">
              {studentRequests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[#7a7a6d]">
                    No requests found for this student.
                  </td>
                </tr>
              ) : (
                studentRequests.map((req) => {
                  const statusKey = getStatusKey(req.status)
                  const isSelected = activeRequest?.ref === req.ref

                  return (
                    <tr
                      key={req.ref}
                      onClick={() => setSelectedRequestRef(req.ref)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#edf5ee] font-semibold'
                          : 'hover:bg-[#fbf9f5]'
                      }`}
                    >
                      <td className="py-3 px-3.5 font-bold text-[#073b23]">
                        {req.ref}
                      </td>
                      <td className="py-3 px-3.5 text-[#1f2d24]">
                        {req.shortType || req.type}
                      </td>
                      <td className="py-3 px-3.5 text-[#7a7a6d]">{req.date}</td>
                      <td className="py-3 px-3.5 text-center">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                            statusBadgeClasses[statusKey]
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Request Tracking Card */}
      {activeRequest && (
        <div className="rounded-xl border border-[#e7dfd0] bg-white p-5 shadow-xs sm:p-6">
          {/* Card Header: Reference No - Document [Status] */}
          <div className="flex flex-col gap-2 border-b border-[#e7dfd0] pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="grid size-6 place-items-center rounded-full bg-[#073b23] text-white">
                <CheckIcon className="size-3.5 stroke-[3]" />
              </span>
              <h3 className="font-display text-[16px] font-extrabold text-[#073b23] sm:text-[18px]">
                {activeRequest.ref} &mdash; {activeRequest.type}
              </h3>
            </div>
            <div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ${
                  statusBadgeClasses[getStatusKey(activeRequest.status)]
                }`}
              >
                {activeRequest.status}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="mt-6 space-y-6">
            {(activeRequest.statusHistory || []).map((stepItem, index) => {
              const isCompleted = stepItem.status === 'Completed'
              const isProcessing = stepItem.status === 'Processing'
              const isLast = index === activeRequest.statusHistory.length - 1

              return (
                <div key={index} className="relative flex items-start gap-4">
                  {!isLast && (
                    <div
                      className={`absolute left-[13px] top-6 -bottom-6 w-0.5 ${
                        isCompleted ? 'bg-[#073b23]' : 'bg-[#e7dfd0]'
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 grid size-7 shrink-0 place-items-center rounded-full text-white ${
                      isCompleted
                        ? 'bg-[#073b23]'
                        : isProcessing
                          ? 'bg-[#0a4b2d]'
                          : 'bg-[#ded5c3] text-[#7a7a6d]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckIcon className="size-3.5 stroke-[3]" />
                    ) : (
                      <ClockIcon className="size-3.5" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                      <span className="font-display text-[13px] font-extrabold text-[#1f2d24]">
                        {stepItem.step}
                      </span>
                      <span className="text-[11px] font-semibold text-[#8a7344]">
                        {stepItem.time}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] text-[#5f6f62]">
                      {stepItem.note}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Registrar Remarks Banner in Student View */}
          <div className="mt-6 rounded-xl border border-[#cde5d2] bg-[#edf5ee] p-4">
            <div className="flex items-start gap-3">
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#073b23] text-[#d8c39a]">
                <ChatIcon className="size-4" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-display text-[13px] font-extrabold text-[#073b23]">
                    Registrar Remarks
                  </h4>
                  {activeRequest.remarksTimestamp && (
                    <span className="text-[11px] text-[#6e7368]">
                      &bull; {activeRequest.remarksTimestamp}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-[#1f2d24]">
                  {activeRequest.remarks || 'No remarks provided yet.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentPortalView