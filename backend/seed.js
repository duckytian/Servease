// I-run: npm run seed  (gagawa ng demo accounts na may tamang password hash)
require('dotenv').config()
const bcrypt = require('bcryptjs')
const db = require('./src/db')

;(async () => {
  const users = [
    ['OSAS-001', 'OSAS Staff', 'osas@servease.edu', null, null, null, 'osas123', 'osas'],
    ['2023-00001', 'Juan Dela Cruz', 'juan@email.com', '09171234567', 'BSIT', '3rd Year', 'student123', 'student'],
  ]
  for (const u of users) {
    const hash = await bcrypt.hash(u[6], 10)
    await db.query(
      `INSERT INTO users (user_id, full_name, email, contact_number, course, year_level, password_hash, role)
       VALUES (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
      [u[0], u[1], u[2], u[3], u[4], u[5], hash, u[7]])
  }
  console.log('Done. OSAS-001 / osas123  |  2023-00001 / student123')
  process.exit(0)
})()
