require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', require('./src/routes/auth'))
app.use('/api/requests', require('./src/routes/requests'))
app.use('/api/osas', require('./src/routes/osas'))
app.use('/api/registrar', require('./src/routes/registrar'))
app.use('/api/it', require('./src/routes/it'))
app.get('/api/health', (_, res) => res.json({ ok: true }))

app.listen(process.env.PORT || 5000, () =>
  console.log(`API running on http://localhost:${process.env.PORT || 5000}`))
