
Swapnil's Ecom - Full-stack Fashion Demo
----------------------------------------
Frontend: React + Vite + Plain CSS
Backend: Node.js + Express + SQLite (preloaded)
Images: 10 local product images (placeholders)

How to run:

1) Backend
   cd backend
   npm install
   npm start
   (Server runs at http://localhost:4000)

2) Frontend
   cd frontend
   npm install
   npm run dev
   (Open the Vite URL, usually http://localhost:5173)

Notes:
- Cart is persisted in SQLite (backend/db/database.sqlite) so it remains across refreshes.
- Images are stored in backend/public/images and served via /images/*.
- If native sqlite3 install fails on Windows, try: npm rebuild sqlite3 --build-from-source
