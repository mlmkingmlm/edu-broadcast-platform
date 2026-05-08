Edu Content Broadcasting System

A modern educational content broadcasting platform built with Next.js, where teachers can upload learning content, admins can manage approvals, and students can access live educational broadcasts.

🚀 Features
------------------------------
👨‍🏫 Teacher Panel
Upload educational content
Upload Images, Videos, and PDFs
Schedule content using start and end time
View uploaded content
Track:
Total Content
Pending Content
Approved Content
Rejected Content
-----------------------------------

👨‍💼 Admin Panel
View all uploaded content
Approve or reject content
Add rejection reason
Search and filter content
Pagination support
Dashboard analytics and charts

-------------------------------------

📺 Public Live Broadcast
Public live content page
Teacher-wise live broadcasting
Dynamic live content switching
Active content filtering
Scheduled and expired content handling

---------------------------------------------

🛠️ Tech Stack
Next.js
Tailwind CSS
ApexCharts
React Hook Form
Zod Validation
React Hot Toast
LocalStorage (Prototype Storage)

-----------------------------------------------

📂 Project Structure
src/
│
├── app/
├── components/
├── hooks/
├── services/
├── context/
├── layout/
├── utils/

-------------------------------------------------

🔐 Authentication

Role-based authentication system:

Admin
Teacher

Protected routes implemented using custom authentication hooks and route guards.

-----------------------------------------------------

📊 Dashboard Features
Teacher-wise upload statistics
Content status tracking
Dynamic filtering and pagination

------------------------------------------------------

📺 Live Broadcasting System

The live broadcasting module:

Displays only approved content
Filters expired content automatically
Supports:
Images
Videos
PDFs
Teacher-specific live pages

----------------------------------------------

⚡ Installation

Clone the repository:

git clone https://github.com/mlmkingmlm/edu-broadcast-platform.git

Install dependencies:

npm install

Run development server:

npm run dev


