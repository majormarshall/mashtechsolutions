# MashTech Solutions – Educational Learning Management System (LMS)

> **...Learn • Build • Innovate**  
> **Tech Skills. Real Opportunities.**  
> *Empowering the Next Generation of Tech Innovators*

---

## 🌟 Overview

**MashTech Solutions LMS** is a modern, high-performance online learning platform combining an **online tech school**, **virtual classroom**, and **student learning community**.

Students can register, enroll in industry-accredited courses, attend live classes via **Google Meet / Zoom**, watch recorded lectures, download course resources, submit assignments, collaborate in real-time discussion rooms, and receive verifiable certificates.

The platform is powered by **Next.js (App Router)** on the frontend and **Supabase (PostgreSQL, Auth, Storage, Realtime)** on the backend, with **Paystack** payment integration for Nigerian Naira (NGN) tuition processing.

---

## 🚀 Key Features

### 🎓 1. Student Portal (`/student`)
- **Dashboard Overview**: Track enrolled courses, completion percentages, lessons finished, and certificates earned.
- **Interactive Classroom (`/student/classroom/[id]`)**: High-definition video lectures, module/lesson navigation, "Mark as Complete" progress tracking, and downloadable PDF notes.
- **Virtual Classroom (`/student/live-classes`)**: Live scheduled lectures via Google Meet and Zoom with countdowns and past video archives.
- **Assignments & Lab Assessments (`/student/assignments`)**: Submit GitHub project repositories and written solutions; receive grades and instructor feedback.
- **Learning Materials (`/student/materials`)**: Direct downloads of cheat sheets, lab manuals, slide decks, and code starter archives.
- **Community Chat (`/student/community`)**: Real-time course discussion channels to collaborate with instructors and peers.
- **Certificates (`/student/certificates`)**: Tamper-proof certificates with unique serial numbers, verification codes, and one-click PDF printing.

### 👨‍🏫 2. Instructor Hub (`/instructor`)
- **Faculty Dashboard (`/instructor/dashboard`)**: Monitor teaching courses, enrolled student counts, and pending student submissions.
- **Curriculum Manager (`/instructor/courses`)**: Create modules and lessons, embed lecture videos, and organize course syllabus.
- **Live Class Scheduler (`/instructor/live-classes`)**: Schedule upcoming Zoom/Google Meet lectures and share links directly with enrolled students.
- **Assignment Manager (`/instructor/assignments`)**: Publish practical tasks, quizzes, and project milestones.
- **Grading Hub (`/instructor/grading`)**: Review student code submissions, assign scores (0-100), and provide personalized mentorship feedback.
- **Student Roster (`/instructor/students`)**: Track individual student progress bars and performance.

### ⚙️ 3. Administrator Control Center (`/admin`)
- **Platform Analytics (`/admin/dashboard`)**: Total verified revenue (NGN), active student body, course catalog count, and certificate metrics.
- **User Management (`/admin/users`)**: Control role-based access (Student ↔ Instructor ↔ Admin).
- **Course & Pricing Management (`/admin/courses`)**: Create and publish courses, assign instructors, and set tuition.
- **Enrollment Governance (`/admin/enrollments`)**: Real-time enrollment auditing and manual admissions.
- **Paystack Transaction Ledger (`/admin/payments`)**: Verified transaction records with gateway references.
- **Certificate Governance (`/admin/certificates`)**: Issue official diplomas with tamper-proof IDs and revocation controls.
- **Broadcast Announcements (`/admin/announcements`)**: Send instant platform-wide alerts to students and faculty.

### 🌐 4. Public Website & Verification Portal
- **Homepage (`/`)**: Hero section, "Why Choose MashTech?", featured course tracks, admission helpline (`07058124966 / 08106071514`), and company flyer.
- **Course Directory (`/courses`)**: Searchable and filterable by category (Web Development, Cyber Security, Python, UI/UX, Cloud, Graphics Design) and skill level.
- **Course Details & Paystack Checkout (`/courses/[slug]`)**: In-depth syllabus breakdown, instructor profiles, and instant tuition enrollment.
- **Public Certificate Verification (`/verify-certificate`)**: Public lookup engine for employers to verify certificate authenticity by ID (e.g. `MTS-2026-PY-8841`).
- **About Us (`/about`)** & **Faculty Directory (`/instructors`)**.
- **Contact Us (`/contact`)** with direct inquiry submission.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | [Next.js 15+](https://nextjs.org) + [React 19](https://react.dev) (App Router) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + [Lucide Icons](https://lucide.dev) |
| **Backend & Database** | [Supabase](https://supabase.com) (PostgreSQL 15+) |
| **Authentication** | Supabase Auth (Email/Password, OAuth) |
| **Storage** | Supabase Storage (`avatars`, `course-thumbnails`, `learning-materials`, `assignments`, `certificates`) |
| **Realtime** | Supabase Realtime (Discussion boards and instant alerts) |
| **Payments** | [Paystack](https://paystack.com) (NGN Cards, Bank Transfer, USSD) |
| **Live Classes** | Google Meet / Zoom Integration |
| **Hosting & CI/CD** | [Vercel](https://vercel.com) |

---

## 🗄️ Database Architecture (PostgreSQL Schema)

The complete SQL schema with **Row Level Security (RLS)** policies, foreign keys, and indexes is available in:
📁 `supabase/migrations/20261122000000_init_schema.sql`

Sample seed data with real courses, instructors, and certificates is located in:
📁 `supabase/seed.sql`

### Core Relational Tables:
1. `profiles`: User accounts, avatars, bio, phone, and role (`student`, `instructor`, `admin`).
2. `courses`: Program titles, slugs, tuition price, duration, category, and requirements.
3. `modules` & `lessons`: Course sections and individual video lessons with duration.
4. `materials`: Downloadable PDFs, project starter ZIPs, and slides.
5. `enrollments`: Student course registrations and completion percentages.
6. `lesson_progress`: Checkpoints for each completed lesson.
7. `live_classes`: Scheduled virtual lectures with Google Meet / Zoom links.
8. `assignments`: Instructor-created coursework with submission deadlines.
9. `submissions`: Student submissions, scores (0-100), and feedback.
10. `certificates`: Conferred diplomas with unique certificate numbers and QR verification codes.
11. `course_discussions`: Real-time Q&A channels for each course.
12. `notifications`: In-app alerts for live classes, grades, and announcements.
13. `payments`: Paystack transaction reference history.

---

## ⚙️ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/majormarshall/mashtechsolutions.git
cd mashtechsolutions
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Supabase and Paystack credentials:
```env
NEXT_PUBLIC_APP_NAME="MashTech Solutions LMS"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_demo_your_paystack_public_key"
PAYSTACK_SECRET_KEY="sec_demo_your_paystack_secret_key"

# Contact Numbers
NEXT_PUBLIC_PHONE_1="07058124966"
NEXT_PUBLIC_PHONE_2="08106071514"
NEXT_PUBLIC_EMAIL="mashtechsolutions4@gmail.com"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication & Access Control

Authentication is strictly enforced across all dashboard environments:

### 👑 1. Administrator Dashboard (`/admin/*`)
- **Admin Email**: `mashtechsolutions4@gmail.com`
- **Admin Password**: `Alpha112`
- Full access to Executive Director control center, financial Paystack ledger, user access management, and certificate issuance.
- A quick **Auto-fill Admin** helper button is available on the `/auth/login` page for fast sign-in.

### 🎓 2. Student & Faculty Registration (`/auth/register`)
- All students and instructors register at `/auth/register` with their Full Name, Email, Phone Number, Role, and Password.
- Upon registration, credentials are authenticated and the user is immediately routed to their portal (`/student/dashboard` or `/instructor/dashboard`).

### 🧪 Automated Route & Dashboard Testing
Run the automated test suite anytime to verify all 28 LMS and dashboard endpoints:
```bash
npm run test:routes
```

---

## 📞 Institutional Contact & Admissions

- **Helplines**: `07058124966` / `08106071514`
- **Email**: `mashtechsolutions4@gmail.com`
- **Official Motto**: *...Learn • Build • Innovate*

---

© 2026 **MashTech Solutions**. All rights reserved.
