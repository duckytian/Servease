// STUDENT
const router = require('express').Router()
const db = require('../db')
const { auth, requireRole } = require('../middleware/auth')
const q = require('../requestQuery')

router.use(auth, requireRole('student'))

router.get('/services', async (req, res) => {
  const [rows] = await db.query(
    'SELECT id, name, description FROM services WHERE department = ? AND is_active = 1',
    [req.query.department || 'osas'])
  res.json(rows)
})

router.get('/mine', async (req, res) => {
  const params = [req.user.id]; let where = 'WHERE r.student_id = ?'
  if (req.query.department) { where += ' AND r.department = ?'; params.push(req.query.department) }
  res.json(await q.list({ where, params }))
})

router.get('/:ref', async (req, res) => {
  const r = await q.one('r.ref = ? AND r.student_id = ?', [req.params.ref, req.user.id])
  r ? res.json(r) : res.status(404).json({ message: 'Not found' })
})

// body: { department, type (service name) | serviceId, academicYear, semester, purpose, additionalRemarks }
router.post('/', async (req, res) => {
  const conn = await db.getConnection()
  try {
    const { department = 'osas', serviceId, type, academicYear, semester, purpose, additionalRemarks } = req.body
    if (!purpose || !purpose.trim()) return res.status(400).json({ message: 'Purpose is required' })
    const [svc] = serviceId
      ? await conn.query('SELECT * FROM services WHERE id = ? AND department = ?', [serviceId, department])
      : await conn.query('SELECT * FROM services WHERE name = ? AND department = ?', [type, department])
    if (!svc[0]) return res.status(400).json({ message: 'Invalid service' })

    await conn.beginTransaction()
    const [ins] = await conn.query(
      `INSERT INTO requests (department, student_id, service_id, academic_year, semester, purpose, additional_remarks)
       VALUES (?,?,?,?,?,?,?)`,
      [department, req.user.id, svc[0].id, academicYear || null, semester || null, purpose.trim(), additionalRemarks || null])
    const ref = `SER-${String(ins.insertId).padStart(4, '0')}`
    await conn.query('UPDATE requests SET ref = ? WHERE id = ?', [ref, ins.insertId])
    await conn.query(
      `INSERT INTO request_status_history (request_id, step, status, note, updated_by)
       VALUES (?, 'Request Submitted', 'Pending', ?, ?)`,
      [ins.insertId, `Request received by the ${department.toUpperCase()} Office.`, req.user.id])
    await conn.commit()
    res.status(201).json(await q.one('r.id = ?', [ins.insertId]))
  } catch (e) { await conn.rollback(); console.error(e); res.status(500).json({ message: 'Server error' }) }
  finally { conn.release() }
})

module.exports = router
