# ServEase Backend (OSAS)

1. XAMPP -> start MySQL -> phpMyAdmin -> SQL tab -> i-paste ang `database/schema.sql` -> Go
2. `copy .env.example .env`  (palitan ang JWT_SECRET)
3. `npm install`
4. `npm run seed`   (gagawa ng demo accounts)
5. `npm run dev`    -> http://localhost:5000/api/health

Demo login:  OSAS: OSAS-001 / osas123   |   Student: 2023-00001 / student123

## Endpoints
POST /api/auth/login {userId,password} | POST /api/auth/register | GET /api/auth/me
Student: GET /api/requests/services | GET /api/requests/mine | POST /api/requests | GET /api/requests/:ref
OSAS:    GET /api/osas/summary | GET /api/osas/requests?status=&type=&search= | GET /api/osas/requests/:ref | PATCH /api/osas/requests/:ref/status
