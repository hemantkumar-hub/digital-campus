# Digital Campus (prototype) — multi-role

npm install
npm run dev

Frontend-only demo. All data lives in src/data.js.

Flow: Landing ("/") — intro, about, and Student / Teacher / Admin buttons —
→ role-aware Login ("/login?role=...") → role-specific dashboard.

- Student portal: /dashboard, /academics, /attendance, /timetable, /fees,
  /certificates, /hostel, /transport, /helpdesk, /insights, /ai-assistant,
  /profile, /parent-portal
- Teacher portal: /teacher/dashboard, /teacher/classes, /teacher/students
  (view + edit attendance/marks, mock save), /teacher/announcements,
  /teacher/profile
- Admin portal: /admin/dashboard, /admin/departments, /admin/students
  (search + remove, mock), /admin/teachers (add, mock), /admin/helpdesk
  (all tickets), /admin/announcements (publish university-wide)

Auth is a demo: any password of 6+ characters signs you in as the chosen
role, stored in sessionStorage. No real backend, ML, or auth.
