# ServEase Backend

1. XAMPP -> start MySQL -> phpMyAdmin -> SQL tab -> i-paste ang `database/schema.sql` -> Go (re-import = reset tables + services catalog)
2. `copy .env.example .env`  (palitan ang JWT_SECRET)
3. `npm install`
4. `npm run seed`   (gagawa ng demo accounts)
5. `npm run dev`    -> http://localhost:5000/api/health

Demo login:  OSAS: OSAS-001 / osas123   |   Registrar: REG-001 / registrar123   |   IT: IT-001 / it1234   |   Student: 2023-00001 / student123

## Endpoints
POST /api/auth/login {userId,password} | POST /api/auth/register | GET /api/auth/me
Student: GET /api/requests/services?department=osas|registrar|it | GET /api/requests/mine | POST /api/requests | GET /api/requests/:ref
OSAS:    GET /api/osas/summary | GET /api/osas/requests?status=&type=&search= | GET /api/osas/requests/:ref | PATCH /api/osas/requests/:ref/status
