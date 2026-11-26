const db = require('./db')

const TZ = 'Asia/Manila'
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: TZ }) : ''
const fmtTime = (d) => d ? `${fmtDate(d)} ${new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: TZ })}` : ''

const BASE = `
  SELECT r.id, r.ref, r.department, r.status, r.academic_year, r.semester, r.purpose,
         r.additional_remarks, r.assigned_staff, r.remarks, r.remarks_at, r.created_at,
         s.name AS type,
         st.user_id AS studentId, st.full_name AS studentName, st.email,
         st.contact_number AS contactNo, st.course, st.year_level AS yearLevel
  FROM requests r
  JOIN services s ON s.id = r.service_id
  JOIN users st ON st.id = r.student_id`

// Hugis na eksaktong ginagamit ng React components (date, statusHistory[{step,time,note,status}], atbp.)
function shape(r, history = []) {
  return {
    id: r.id, ref: r.ref, department: r.department, status: r.status,
    type: r.type,
    studentId: r.studentId, studentName: r.studentName, course: r.course,
    yearLevel: r.yearLevel, email: r.email, contactNo: r.contactNo,
    academicYear: r.academic_year, semester: r.semester, purpose: r.purpose,
    additionalRemarks: r.additional_remarks,
    assignedStaff: r.assigned_staff || '',
    remarks: r.remarks || '', remarksTimestamp: fmtTime(r.remarks_at),
    date: fmtDate(r.created_at), createdAt: r.created_at,
    statusHistory: history,
  }
}

async function historyFor(ids) {
  if (!ids.length) return {}
  const [rows] = await db.query(
    `SELECT request_id, step, status, note, created_at FROM request_status_history
     WHERE request_id IN (?) ORDER BY created_at ASC, id ASC`, [ids])
  const map = {}
  rows.forEach((h) => {
    ;(map[h.request_id] ||= []).push({ step: h.step, time: fmtTime(h.created_at), note: h.note || '', status: h.status })
  })
  return map
}

async function list({ where = '', params = [] } = {}) {
  const [rows] = await db.query(`${BASE} ${where} ORDER BY r.created_at DESC, r.id DESC`, params)
  const hist = await historyFor(rows.map((r) => r.id))
  return rows.map((r) => shape(r, hist[r.id] || []))
}
async function one(where, params) {
  const rows = await list({ where: `WHERE ${where}`, params })
  return rows[0] || null
}
module.exports = { list, one }
