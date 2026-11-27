// REGISTRAR STAFF
const router = require('express').Router()
const db = require('../db')
const { auth, requireRole } = require('../middleware/auth')
const q = require('../requestQuery')

router.use(auth, requireRole('registrar'))
const STATUSES = ['Pending', 'Processing', 'Completed', 'Rejected']
const STEP = { Completed: 'Completed', Rejected: 'Rejected', Processing: 'Under Review', Pending: 'Status Updated' }

router.get('/summary', async (req, res) => {
  const [rows] = await db.query("SELECT status, COUNT(*) AS n FROM requests WHERE department = 'registrar' GROUP BY status")
  const counts = { Pending: 0, Processing: 0, Completed: 0, Rejected: 0 }
  rows.forEach((r) => (counts[r.status] = r.n))
  res.json({ total: Object.values(counts).reduce((a, b) => a + b, 0), ...counts })
})

router.get('/requests', async (req, res) => {
  res.json(await q.list({ where: "WHERE r.department = 'registrar'" }))
})

router.get('/requests/:ref', async (req, res) => {
  const r = await q.one("r.ref = ? AND r.department = 'registrar'", [req.params.ref])
  r ? res.json(r) : res.status(404).json({ message: 'Not found' })
})

router.patch('/requests/:ref/status', async (req, res) => {
  const conn = await db.getConnection()
  try {
    const { status, remarks, assignedStaff } = req.body
    if (!STATUSES.includes(status)) return res.status(400).json({ message: 'Invalid status' })
    if (!(remarks || '').trim()) return res.status(400).json({ message: 'Registrar remarks are required' })
    const [rows] = await conn.query("SELECT id FROM requests WHERE ref = ? AND department = 'registrar'", [req.params.ref])
    if (!rows[0]) return res.status(404).json({ message: 'Not found' })

    await conn.beginTransaction()
    await conn.query(
      'UPDATE requests SET status = ?, remarks = ?, remarks_at = NOW(), assigned_staff = ? WHERE id = ?',
      [status, remarks.trim(), (assignedStaff || '').trim() || null, rows[0].id])
    await conn.query(
      'INSERT INTO request_status_history (request_id, step, status, note, updated_by) VALUES (?,?,?,?,?)',
      [rows[0].id, STEP[status], status, remarks.trim(), req.user.id])
    await conn.commit()
    res.json(await q.one('r.id = ?', [rows[0].id]))
  } catch (e) { await conn.rollback(); console.error(e); res.status(500).json({ message: 'Server error' }) }
  finally { conn.release() }
})

module.exports = router