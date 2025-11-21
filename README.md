📊 SigmaValue Real Estate Analysis – Full Stack Assignment

React + Django + Excel + Chart.js

📌 Overview

This full-stack web application was developed for the SigmaValue Full Stack Developer Assignment.
It enables users to analyze real-estate locality data through a clean, intuitive interface.

The system allows users to:

Upload an Excel dataset or use the default one

Ask locality-based real-estate questions

View a concise natural-language summary

Explore price & demand trends visualized with Chart.js

View a filtered dataset table

Download the results as a CSV file

🚀 Features
🔹 Backend (Django REST Framework)

Accepts Excel upload OR uses default sample Excel

Parses Excel using pandas

Cleans and normalizes dataset

Filters data based on locality (area) extracted from query

Returns:

Summary text

Chart data (price & demand per year)

Filtered table rows

Clean JSON API response

CORS-enabled for frontend integration

🔹 Frontend (React + Bootstrap + Chart.js)

Modern, clean dark-theme UI

User-friendly Query Builder

File upload support

Insight Summary panel

Price & Demand line chart

Scrollable filtered table

CSV download button

Fully responsive layout

🗂 Folder Structure
sigmavalue-assignment/
│
│── backend/
│ ├── backend/
│ ├── api/
│ ├── data/sample_real_estate.xlsx
│ └── manage.py
│
│── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
│── README.md
│── .gitignore

🔧 Installation & Running Locally
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

📈 API Endpoint Documentation
POST /api/query/

Request Body (multipart/form-data):

query (string)

file (optional Excel: .xlsx, .xls)

Response Example:

{
"summary": "Area 'Wakad': average price ₹55,000...",
"chart_data": {
"labels": ["2021", "2022", "2023"],
"price": [54000, 56000, 58000],
"demand": [120, 150, 175]
},
"table": [
{ "year": 2021, "area": "Wakad", "price": 54000, "demand": 120 },
...
]
}

🌐 Live Deployment
Frontend (Vercel):

https://sigmavalue-assignment.vercel.app

Backend API (Render):

https://sigmavalue-assignment-l5fd.onrender.com/api/query/

Source Code (GitHub):

https://github.com/sadhanakhobragade/sigmavalue-assignment

✔ Evaluation Criteria Coverage
Requirement Status
Code structure ✔ Clean & organized
UI/UX ✔ Modern dark UI
Backend integration ✔ Fully functional
Excel data processing ✔ Accurate filtering
Chart correctness ✔ Implemented (Chart.js)
Deployment ✔ Frontend + Backend live
Bonus (LLM) Optional

🧑‍💻 Author

Sadhana Khobragade
