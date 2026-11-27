# ServEase — Execution Plan (COMPLETED)

Status: Phases 0-6 implemented. See git diff / changes.

This plan covers the recommended fixes from the codebase analysis plus alignment with the
project spec (SERVEASE overview). Work is split into phases; each phase lists the files
to touch and the expected outcome. Phases are ordered by dependency.

---

## Phase 0 — Baseline (done)
- [x] Seed empty `users` table (`npm run seed`) → `OSAS-001/osas123`, `2023-00001/student123`.
- [x] Verify backend login returns JWT; backend on `:5001`, Vite on `:5173`.
- [x] Document hybrid persistence (localStorage vs MySQL) and gaps.

## Phase 1 — Auth & session
Goal: a single, backend-backed auth flow for all four roles, surviving page refresh.

1. **Session rehydration** — `frontend/src/auth/AuthContext.jsx`
   - On mount, if `sessionStorage.token` exists, call `api('/auth/me')`; on success `setUser(account)`; on failure `clearSession()`.
   - Add `loading` state so dashboards don't flash the login screen.
2. **Backend accounts for registrar & IT** — `backend/seed.js`
   - Add `REG-001 / registrar123` (role `registrar`) and `IT-001 / it123` (role `it`).
   - Re-run seed after schema changes.
3. **Unify frontend login** — `frontend/src/pages/auth/SignInPage.jsx`
   - Registrar & IT stop using the client-only `onSignIn({role, userId})` shortcut; call `loginRequest` like Student/OSAS.
   - Keep the role-mismatch check (`account.role` vs selected portal).
4. **Server-side enforcement** — already in place via `requireRole`; ensure new routes use it.

## Phase 2 — Service catalog alignment with spec
Goal: one source of truth for services, matching the SERVEASE spec.

Spec vs current code (conflicts listed in §Conflicts):
- Registrar: COE, COG, TOR, GOOD MORAL (code also has COR).
- Student Affairs: LOST ID REPORT, ID REPLACEMENT (code has ID Replacement, Student Status cert, Org Clearance).
- IT: STUDENT PORTAL ASSISTANCE, ANY REQUEST FOR COMPUTER LAB (code has Portal Account Reset, Campus Wi-Fi, Lab Workstation).

Actions:
1. Update `backend/database/schema.sql` `services` INSERT to the spec list (decide keep/drop extras — see Conflicts).
2. Update `frontend/src/roles/student/pages/data.js` arrays (`registrarServices`, `osasServices`, `itServices`) to match.
3. (Optional, recommended) Make the student form fetch services from `GET /api/requests/services?department=...` instead of hardcoded arrays, so DB is the source of truth.

## Phase 3 — Backend API expansion
Goal: registrar and IT get the same DB-backed request management as OSAS.

1. Create `backend/src/routes/registrar.js` and `backend/src/routes/it.js`, mirroring `osas.js`:
   - `GET /summary`, `GET /requests`, `GET /requests/:ref`, `PATCH /requests/:ref/status`.
   - `requireRole('registrar')` / `requireRole('it')`.
   - Department filter fixed to `'registrar'` / `'it'`.
2. Mount in `server.js`: `/api/registrar`, `/api/it`.
3. (Optional) Add query params (`status`, `type`, `search`) to the list endpoints for server-side filtering; otherwise client-side filtering (already in UI) is fine for current volume.

## Phase 4 — Frontend persistence unification
Goal: no more localStorage request store; all roles use the API.

1. Add generic helpers in `frontend/src/data/osasApi.js` (or a new `requestsApi.js`):
   - `submitRequest(department, details)` → `POST /api/requests`
   - `fetchMyRequests(department?)` → `GET /api/requests/mine`
   - `useMyRequests(pollMs)` hook
   - `useDeptRequests(department, pollMs)` hook (wraps `/osas`, `/registrar`, `/it` requests)
   - `updateRequestStatus(department, ref, payload)` → PATCH
2. **Student dashboard** — `frontend/src/roles/student/pages/dashboard/StudentDashboard.jsx`
   - Replace `useRequests()` (localStorage) with `useMyRequests()`.
   - `handleSubmitRequest` calls `submitRequest(department, details)` instead of `createRequest`.
   - Display fields from the logged-in account (`user`) with fallback to `studentProfile`.
   - `ownRequests` filtering no longer needed (API scopes to student).
3. **Registrar dashboard** — replace `useRequests()` with `useDeptRequests('registrar')` and status updates with `updateRequestStatus('registrar', ...)`.
4. **IT dashboard** — same with `'it'`.
5. Remove/retire `frontend/src/data/requestStore.js` usage (keep file temporarily, then delete) and `initialRequestsData` mock seed.

## Phase 5 — UI alignment
1. Registrar summary counts include **Rejected** (`statusCounts` add `Rejected: 0`).
2. Staff dashboards welcome text uses the logged-in user's name.
3. Ensure status values/steps consistent (Pending, Processing, Completed, Rejected) across all roles — already mostly.
4. Student "My Requests" detail shows staff remarks & history (already in shape).

## Phase 6 — Quality & ops
1. Add a setup script (`backend/package.json`: `"setup": "node scripts/setup.js"`) that runs schema + seed, or document the two-step in README (already documented).
2. Add minimal tests: auth login (success/fail/role mismatch), request create, status update. (No test runner present — add Vitest/Jest for backend? Decide.)
3. Update READMEs (backend + frontend) with the unified flow and demo accounts.
4. Lint pass (`npm run lint`) and fix obvious issues.

---

## Conflicts / missing information

1. **Service catalog mismatch (spec vs code).** Spec lists fewer services than the code seeds. Decide:
   - Keep extras (COR, Student Status cert, Org Clearance, Wi-Fi) or trim to spec? *Recommendation: trim to spec to match grading, but keep DB flexible.*
   - Missing in code vs spec: **Lost ID Report** (OSAS) — must be added.
2. **No backend identity for Registrar/IT** currently; spec requires login with id & password. Phase 1 adds accounts.
3. **Persistence split**: registrar/IT/student requests are localStorage-only; spec implies shared, trackable requests across roles. Phase 4 fixes.
4. **Student OSAS submissions** go to localStorage in the student UI, so OSAS staff (DB) never see them. Phase 4 fixes.
5. **Session not rehydrated on refresh** → appears logged out. Phase 1 fixes.
6. **Hardcoded student profile id** (`2021-1001-MNL`) vs seeded user (`2023-00001`); display data drifts. Phase 4 uses account data.
7. **Registrar summary** omits Rejected count. Phase 5 fixes.
8. **Department naming**: spec "Student Affairs" vs code "OSAS"/"Student Affairs (OSAS)" — cosmetic, keep as is or rename sidebar labels.
9. **No tests / no CI** — Phase 6.
10. **IT/Registrar backend routes** absent entirely — Phase 3.
11. **Status history step names** differ between roles (e.g., "Under Active Processing" vs "Request Under Review") — cosmetic; standardize if desired.
12. **Search/filter** is client-side only; fine for small data, but server-side needed at scale.

## Suggested execution order
Phase 0 → 1 → 2 → 3 → 4 → 5 → 6. Phases 1 & 2 can be done in parallel; Phase 4 depends on Phase 3.

## Definition of done
- All four roles log in via backend and survive refresh.
- Student submits a request for any department; the corresponding staff role sees and updates it; student sees the updated status & remarks.
- Service list matches spec.
- No localStorage dependency for requests.
- `npm run dev` (both) + `npm run seed` reproduce a working demo.
