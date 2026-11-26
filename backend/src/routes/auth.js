const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')
const { auth } = require('../middleware/auth')

const publicUser = (u) => ({
  id: u.id, userId: u.user_id, name: u.full_name, email: u.email,
  contactNumber: u.contact_number, course: u.course, yearLevel: u.year_level,
  role: u.role,
})

router.post('/login', async (req, res) => {
  try {
    const { userId, password } = req.body
    if (!userId || !password) return res.status(400).json({ message: 'Please complete all fields' })
    const [rows] = await db.query('SELECT * FROM users WHERE user_id = ? OR email = ?', [userId, userId])
    const u = rows[0]
    if (!u || !(await bcrypt.compare(password, u.password_hash)))
      return res.status(401).json({ message: 'Incorrect ID or password' })
    const token = jwt.sign({ id: u.id, role: u.role }, process.env.JWT_SECRET, { expiresIn: '8h' })
    res.json({ token, user: publicUser(u) })
  } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

router.post('/register', async (req, res) => {
  try {
    const { userId, fullName, email, password, contactNumber, course, yearLevel } = req.body
    if (!userId || !fullName || !email || !password)
      return res.status(400).json({ message: 'Please complete all fields' })
    const [ex] = await db.query('SELECT id FROM users WHERE user_id = ? OR email = ?', [userId, email])
    if (ex.length) return res.status(409).json({ message: 'Student ID or email is already in use' })
    const hash = await bcrypt.hash(password, 10)
    await db.query(
      `INSERT INTO users (user_id, full_name, email, contact_number, course, year_level, password_hash, role)
       VALUES (?,?,?,?,?,?,?, 'student')`,
      [userId, fullName, email, contactNumber || null, course || null, yearLevel || null, hash])
    res.status(201).json({ message: 'Registered' })
  } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

router.get('/me', auth, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.user.id])
  if (!rows[0]) return res.status(404).json({ message: 'Not found' })
  res.json(publicUser(rows[0]))
})

module.exports = router
