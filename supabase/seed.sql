-- ==============================================================================
-- MashTech Solutions Learning Management System (LMS)
-- Database Seed Data
-- ==============================================================================

-- 1. SEED PROFILES
INSERT INTO public.profiles (id, email, full_name, role, avatar_url, bio, phone, headline)
VALUES 
  ('a0000000-0000-0000-0000-000000000001', 'admin@mashtech.ng', 'Engr. Marshall (Director)', 'admin', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', 'Director and Lead Architect at MashTech Solutions.', '+2347058124966', 'Lead Systems Architect & Director'),
  ('a0000000-0000-0000-0000-000000000002', 'instructor@mashtech.ng', 'Dr. David Okon', 'instructor', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Senior Software Engineer & Cybersecurity Specialist with 10+ years experience.', '+2348106071514', 'Senior Software Engineer & Security Expert'),
  ('a0000000-0000-0000-0000-000000000003', 'instructor2@mashtech.ng', 'Sarah Adeleke', 'instructor', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', 'Principal UI/UX Designer and Frontend Specialist.', '+2348000000001', 'Lead UI/UX & Design Systems Engineer'),
  ('a0000000-0000-0000-0000-000000000004', 'student@mashtech.ng', 'Emmanuel Bassey', 'student', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400', 'Aspiring Full Stack Developer & Cybersecurity Enthusiast.', '+2348000000002', 'Student - Web Development & Security')
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name;

-- 2. SEED COURSES
INSERT INTO public.courses (id, title, slug, description, thumbnail_url, category, instructor_id, duration, level, price, is_free, status, requirements, learning_outcomes)
VALUES
  (
    'c0000000-0000-0000-0000-000000000001',
    'Full Stack Web Development (Next.js & Supabase)',
    'full-stack-web-development',
    'Master modern web engineering from frontend React & Next.js to scalable Supabase backends, PostgreSQL, authentication, and cloud deployment.',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    'Web Development',
    'a0000000-0000-0000-0000-000000000002',
    '12 Weeks',
    'Beginner',
    45000.00,
    false,
    'published',
    ARRAY['Basic computer literacy', 'A laptop with minimum 4GB RAM', 'Passion to learn and build real-world products'],
    ARRAY['Build full-stack responsive web applications', 'Master TypeScript, Tailwind CSS and React Server Components', 'Design resilient PostgreSQL schemas and real-time APIs with Supabase', 'Deploy production applications to Vercel and custom domains']
  ),
  (
    'c0000000-0000-0000-0000-000000000002',
    'Cyber Security: Ethical Hacking & Digital Safety',
    'cyber-security-ethical-hacking',
    'Comprehensive hands-on training in network defense, penetration testing, vulnerability assessment, Linux security, and digital countermeasures.',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    'Cyber Security',
    'a0000000-0000-0000-0000-000000000002',
    '10 Weeks',
    'Intermediate',
    60000.00,
    false,
    'published',
    ARRAY['Understanding of basic networking protocols', 'Laptop capable of running virtualization (VirtualBox/VMware)'],
    ARRAY['Conduct professional ethical hacking and penetration tests', 'Perform packet sniffing, port scanning with Wireshark and Nmap', 'Harden servers against SQLi, XSS, and CSRF attacks', 'Prepare for CompTIA Security+ and CEH examinations']
  ),
  (
    'c0000000-0000-0000-0000-000000000003',
    'Python Programming from Zero to Hero',
    'python-programming-zero-to-hero',
    'Kickstart your tech journey with Python. Learn programming fundamentals, algorithms, data analysis, automation scripts, and practical problem solving.',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    'Programming',
    'a0000000-0000-0000-0000-000000000002',
    '8 Weeks',
    'Beginner',
    35000.00,
    false,
    'published',
    ARRAY['No prior coding experience required', 'Computer with internet access'],
    ARRAY['Write clean, idiomatic Python code', 'Automate repetitive files and data workflows', 'Work with APIs, JSON, and SQLite databases', 'Build real-world automation scripts and web scrapers']
  ),
  (
    'c0000000-0000-0000-0000-000000000004',
    'UI/UX Design: Create Amazing User Experiences',
    'ui-ux-design-user-experiences',
    'Master user research, wireframing, high-fidelity prototyping in Figma, design systems, usability testing, and handoff to engineering teams.',
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800',
    'Product Design',
    'a0000000-0000-0000-0000-000000000003',
    '8 Weeks',
    'Beginner',
    35000.00,
    false,
    'published',
    ARRAY['Interest in aesthetics, products, and problem-solving', 'Free Figma account'],
    ARRAY['Design end-to-end mobile and web interfaces', 'Create scalable Figma design tokens and component libraries', 'Conduct user interviews and card sorting exercises', 'Build a job-ready portfolio of 3 polished case studies']
  ),
  (
    'c0000000-0000-0000-0000-000000000005',
    'Cloud Computing: AWS, Firebase & Supabase',
    'cloud-computing-aws-firebase-supabase',
    'Build and deploy serverless architectures, storage buckets, distributed databases, authentication workflows, and cloud edge networks.',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    'Cloud Computing',
    'a0000000-0000-0000-0000-000000000002',
    '8 Weeks',
    'Intermediate',
    50000.00,
    false,
    'published',
    ARRAY['Basic programming knowledge in JavaScript or Python'],
    ARRAY['Deploy AWS S3, Lambda, and CloudFront distributions', 'Configure production Supabase PostgreSQL and Row Level Security', 'Implement zero-downtime CI/CD deployment pipelines']
  ),
  (
    'c0000000-0000-0000-0000-000000000006',
    'Graphics Design: Photoshop, CorelDraw & Canva',
    'graphics-design-photoshop-coreldraw',
    'Master professional branding, advertising flyers, vector illustration, color theory, typography, and print design.',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
    'Creative Design',
    'a0000000-0000-0000-0000-000000000003',
    '6 Weeks',
    'Beginner',
    30000.00,
    false,
    'published',
    ARRAY['A PC or Mac with Photoshop or Canva installed'],
    ARRAY['Design viral social media graphics and marketing flyers', 'Master photo manipulation, masking and color grading', 'Produce print-ready corporate branding assets and logos']
  )
ON CONFLICT (id) DO NOTHING;

-- 3. SEED MODULES & LESSONS FOR FULL STACK WEB DEV
INSERT INTO public.modules (id, course_id, title, description, position)
VALUES
  ('m0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Module 1: Foundations of Modern Web Architecture', 'HTML5 semantics, modern CSS with Tailwind, and JavaScript fundamentals.', 1),
  ('m0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'Module 2: React 19 & Next.js App Router', 'Server components, client components, routing, data fetching, and state.', 2),
  ('m0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'Module 3: Supabase Backend, PostgreSQL & Security', 'Auth, relational database tables, RLS policies, storage, and real-time sync.', 3),
  ('m0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'Module 4: Capstone Project & Vercel Deployment', 'Building and launching MashTech LMS capstone with Paystack payments.', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, video_url, duration_minutes, content, position, is_preview)
VALUES
  ('l0000000-0000-0000-0000-000000000001', 'm0000000-0000-0000-0000-000000000001', 'Welcome to MashTech Solutions & Orientation', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 20, 'Welcome to MashTech Solutions! In this orientation lecture, we introduce our learning methodology, community rules, and developer tooling setup.', 1, true),
  ('l0000000-0000-0000-0000-000000000002', 'm0000000-0000-0000-0000-000000000001', 'Modern TypeScript & Tailwind CSS Essentials', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 35, 'Learn how to write type-safe interfaces and design responsive, high-fidelity user interfaces using utility classes.', 2, false),
  ('l0000000-0000-0000-0000-000000000003', 'm0000000-0000-0000-0000-000000000002', 'Mastering Next.js 15+ App Router & Layouts', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 45, 'Deep dive into nested routing, parallel routes, error boundaries, and loading skeletons.', 1, false),
  ('l0000000-0000-0000-0000-000000000004', 'm0000000-0000-0000-0000-000000000003', 'Architecting Supabase PostgreSQL & RLS Policies', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 50, 'Learn how to protect data at the database level with Row Level Security and handle user authentication smoothly.', 1, false)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED ENROLLMENT & SAMPLE PROGRESS
INSERT INTO public.enrollments (student_id, course_id, status, progress_percentage)
VALUES 
  ('a0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'active', 75),
  ('a0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000002', 'active', 40)
ON CONFLICT (student_id, course_id) DO NOTHING;

-- 5. SEED LIVE CLASS
INSERT INTO public.live_classes (course_id, instructor_id, title, description, start_time, meeting_url, platform, status)
VALUES
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Live Interactive Code Review: Building Fullstack SaaS', 'Join Dr. Okon for an intensive coding session reviewing database schema design and client integration.', timezone('utc'::text, now() + INTERVAL '1 day'), 'https://meet.google.com/xyz-mashtech-live', 'Google Meet', 'scheduled')
ON CONFLICT DO NOTHING;

-- 6. SEED CERTIFICATE
INSERT INTO public.certificates (student_id, course_id, certificate_number, issue_date, verification_code, is_valid)
VALUES
  ('a0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000003', 'MTS-2026-PY-8841', timezone('utc'::text, now() - INTERVAL '5 days'), 'VFY-8841-MTS', true)
ON CONFLICT (student_id, course_id) DO NOTHING;
