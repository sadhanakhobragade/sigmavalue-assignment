📊 SigmaValue Real Estate Analysis – Full Stack Assignment

React + Django + Excel + Chart.js

📌 Overview

This is a full-stack web application built for the
SigmaValue Full Stack Developer Assignment.

The app allows users to:

Upload or use a default Excel dataset

Ask locality-based real-estate queries

Get a short natural-language summary (mock LLM)

View price and demand trends (Chart.js)

View filtered dataset in a table

Download the filtered output as CSV

🚀 Features
🔹 Backend (Django REST Framework)

Accepts file upload OR uses default Excel file

Parses Excel using pandas

Filters data based on area extracted from query

Generates:
✔ Summary text
✔ Chart JSON (price per year, demand per year)
✔ Filtered table rows

Clean API response (JSON)

🔹 Frontend (React + Bootstrap + Chart.js)

Modern UI with dark theme

Query input panel

File upload

Summary display

Price & demand line chart

Scrollable filtered dataset table

Download CSV button

🗂 Folder Structure (Important)
sigmavalue-assignment/
│── backend/
│   ├── backend/
│   ├── api/
│   ├── data/sample_real_estate.xlsx
│   └── manage.py
│
│── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
│── README.md   ← THIS FILE
│── .gitignore

🔧 Installation & Running
Backend (Django)
cd backend
pip install -r requirements.txt
python manage.py runserver


Backend runs at:
http://127.0.0.1:8000

Frontend (React)
cd frontend
npm install
npm start


Frontend runs at:
http://localhost:3000

📈 API Endpoint

POST /api/query/

Accepts:

query: text

file: optional Excel

Returns:

{
  "summary": "...",
  "chart_data": {
    "labels": [...],
    "price": [...],
    "demand": [...]
  },
  "table": [...]
}

🎥 Demo Video (Required)

You must record:

Running backend

Running frontend

Entering a query

Summary + Chart + Table appearing

Duration: 1–2 minutes

🌐 Deployment (Optional Bonus)

Frontend: Vercel

Backend: Render / Railway

Add links here if deployed

✔ Evaluation Criteria Coverage
Requirement	Status
Code structure & clarity	✔ Yes
UI/UX	✔ Modern dark UI
Backend integration	✔ Working end-to-end
Excel data filtering	✔ Accurate
Chart correctness	✔ Chart.js implemented
Bonus LLM	Optional
Deployment	Optional


🧑‍💻 Author
Sadhana Khobragade