import { Course, Profile, Enrollment, LiveClass, Assignment, Submission, Certificate, DiscussionMessage, Notification, PaymentRecord, Material } from '@/types';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'usr_admin',
    email: 'mashtechsolutions4@gmail.com',
    full_name: 'Engr. Marshall (Director)',
    role: 'admin',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    headline: 'Founder & Lead Systems Architect',
    bio: 'Director of MashTech Solutions with over 12 years of hands-on technology education, infrastructure engineering, and cloud platforms experience.',
    phone: '+2347058124966',
  },
  {
    id: 'usr_inst_1',
    email: 'instructor@mashtech.ng',
    full_name: 'Dr. David Okon',
    role: 'instructor',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    headline: 'Senior Full Stack & Cybersecurity Lead',
    bio: 'Experienced software engineer and certified ethical hacker. Passionate about mentoring aspiring developers and security professionals.',
    phone: '+2348106071514',
  },
  {
    id: 'usr_inst_2',
    email: 'sarah.adeleke@mashtech.ng',
    full_name: 'Sarah Adeleke',
    role: 'instructor',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    headline: 'Lead Product & UI/UX Designer',
    bio: 'Former FinTech UX lead specializing in Figma design systems, interaction patterns, and human-centered digital experiences.',
    phone: '+2348030001234',
  },
  {
    id: 'usr_student',
    email: 'student@mashtech.ng',
    full_name: 'Alex Marshall',
    role: 'student',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
    headline: 'Aspiring Full Stack Engineer',
    bio: 'Active student at MashTech Solutions pursuing Web Development and Cyber Security.',
    phone: '+2347058124966',
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course_web_dev',
    title: 'Full Stack Web Development (Next.js, React & Supabase)',
    slug: 'full-stack-web-development',
    description: 'Master modern web engineering from clean frontend UI with Tailwind CSS and Next.js App Router to scalable Supabase PostgreSQL backends, Auth, and Vercel cloud deployment.',
    thumbnail_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    category: 'Web Development',
    instructor_id: 'usr_inst_1',
    instructor_name: 'Dr. David Okon',
    duration: '12 Weeks',
    level: 'Beginner',
    price: 45000,
    is_free: false,
    status: 'published',
    enrolled_count: 142,
    requirements: [
      'A working laptop or desktop (Windows, Mac, or Linux)',
      'Basic computer literacy and internet access',
      'Desire to build practical software products'
    ],
    learning_outcomes: [
      'Build production-ready web apps with Next.js & React 19',
      'Architect robust Supabase databases, RLS policies & Auth',
      'Integrate payment gateways like Paystack seamlessly',
      'Deploy full-stack projects to Vercel and production domains'
    ],
    modules: [
      {
        id: 'mod_1',
        course_id: 'course_web_dev',
        title: 'Module 1: Modern Web Foundations & TypeScript',
        description: 'Semantic HTML, utility-first CSS with Tailwind, and type-safe modern JavaScript/TypeScript.',
        position: 1,
        lessons: [
          {
            id: 'les_1',
            module_id: 'mod_1',
            title: 'Welcome to MashTech Solutions LMS & Dev Environment Setup',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration_minutes: 25,
            content: 'Welcome to MashTech Solutions! In this initial session, we set up VS Code, Git, Node.js, and explore our project structure.',
            position: 1,
            is_preview: true,
            completed: true
          },
          {
            id: 'les_2',
            module_id: 'mod_1',
            title: 'Mastering Tailwind CSS & Modern UI Principles',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration_minutes: 35,
            content: 'Learn how to build responsive layouts, dark mode switches, and fluid typography with Tailwind CSS v4.',
            position: 2,
            is_preview: false,
            completed: true
          }
        ]
      },
      {
        id: 'mod_2',
        course_id: 'course_web_dev',
        title: 'Module 2: React 19 and Next.js App Router',
        description: 'Server Components, Client Components, Server Actions, nested routing, and layouts.',
        position: 2,
        lessons: [
          {
            id: 'les_3',
            module_id: 'mod_2',
            title: 'Next.js 15+ App Architecture & Route Handlers',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration_minutes: 45,
            content: 'In-depth review of page.tsx, layout.tsx, loading states, and error handling.',
            position: 1,
            is_preview: false,
            completed: true
          },
          {
            id: 'les_4',
            module_id: 'mod_2',
            title: 'Supabase PostgreSQL, Auth & Row Level Security',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration_minutes: 50,
            content: 'Connecting Supabase, defining tables, handling auth tokens, and enforcing database security rules.',
            position: 2,
            is_preview: false,
            completed: false
          }
        ]
      },
      {
        id: 'mod_3',
        course_id: 'course_web_dev',
        title: 'Module 3: Capstone LMS Project & Deployment',
        description: 'Complete hands-on LMS build, Paystack checkout, certificate generator, and Vercel hosting.',
        position: 3,
        lessons: [
          {
            id: 'les_5',
            module_id: 'mod_3',
            title: 'Paystack Payment Integration & Webhook Verification',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration_minutes: 40,
            content: 'Processing course tuition payments and activating student enrollment automatically.',
            position: 1,
            is_preview: false,
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'course_cyber_sec',
    title: 'Cyber Security: Ethical Hacking & Digital Safety',
    slug: 'cyber-security-ethical-hacking',
    description: 'Practical offensive and defensive security training. Learn penetration testing, network sniffing, web application vulnerability assessment, and Linux hardening.',
    thumbnail_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    category: 'Cyber Security',
    instructor_id: 'usr_inst_1',
    instructor_name: 'Dr. David Okon',
    duration: '10 Weeks',
    level: 'Intermediate',
    price: 60000,
    is_free: false,
    status: 'published',
    enrolled_count: 98,
    requirements: [
      'Basic networking concepts (IP, ports, DNS)',
      'A 64-bit laptop with at least 8GB RAM for virtual labs'
    ],
    learning_outcomes: [
      'Perform authorized penetration testing on test labs',
      'Inspect packets and network anomalies with Wireshark & Nmap',
      'Defend web apps against OWASP Top 10 exploits',
      'Prepare for professional certifications like CompTIA Security+'
    ],
    modules: [
      {
        id: 'mod_sec_1',
        course_id: 'course_cyber_sec',
        title: 'Module 1: Linux Fundamentals & Security Tooling',
        position: 1,
        lessons: [
          {
            id: 'les_sec_1',
            module_id: 'mod_sec_1',
            title: 'Kali Linux Lab Setup & Terminal Mastery',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration_minutes: 30,
            content: 'Installing Kali Linux virtual machine and setting up network adapters safely.',
            position: 1,
            is_preview: true,
            completed: true
          }
        ]
      }
    ]
  },
  {
    id: 'course_python',
    title: 'Programming: Python from Zero to Hero',
    slug: 'python-programming-zero-to-hero',
    description: 'Learn programming fundamentals from scratch with Python. Master algorithms, automated scripts, file handling, APIs, and data analysis.',
    thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    category: 'Programming',
    instructor_id: 'usr_inst_1',
    instructor_name: 'Dr. David Okon',
    duration: '8 Weeks',
    level: 'Beginner',
    price: 35000,
    is_free: false,
    status: 'published',
    enrolled_count: 210,
    requirements: ['No prior programming background required', 'Curiosity and passion to solve problems'],
    learning_outcomes: [
      'Write clean, modular, object-oriented Python code',
      'Automate real-world tasks like file sorting & web scraping',
      'Work with SQLite, PostgreSQL, and JSON data formats'
    ],
    modules: []
  },
  {
    id: 'course_ui_ux',
    title: 'UI/UX Design: Create Amazing User Experiences',
    slug: 'ui-ux-design-user-experiences',
    description: 'From wireframes to interactive Figma prototypes. Learn UX research methodologies, design tokens, responsive UI layout, and product usability testing.',
    thumbnail_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800',
    category: 'Product Design',
    instructor_id: 'usr_inst_2',
    instructor_name: 'Sarah Adeleke',
    duration: '8 Weeks',
    level: 'Beginner',
    price: 35000,
    is_free: false,
    status: 'published',
    enrolled_count: 115,
    requirements: ['A computer with modern web browser for Figma', 'Creative mindset and eye for detail'],
    learning_outcomes: [
      'Master Figma auto-layout, components, and design variants',
      'Conduct user interviews and synthesize user personas',
      'Build a portfolio with 3 interactive client case studies'
    ],
    modules: []
  },
  {
    id: 'course_cloud',
    title: 'Cloud Computing: AWS, Firebase & Supabase',
    slug: 'cloud-computing-aws-firebase-supabase',
    description: 'Learn to design, deploy, and scale modern cloud architectures. Hands-on labs with serverless computing, cloud storage, relational SQL databases, and CI/CD pipelines.',
    thumbnail_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    category: 'Cloud Computing',
    instructor_id: 'usr_inst_1',
    instructor_name: 'Dr. David Okon',
    duration: '8 Weeks',
    level: 'Intermediate',
    price: 50000,
    is_free: false,
    status: 'published',
    enrolled_count: 76,
    requirements: ['Basic understanding of web technologies and command line'],
    learning_outcomes: [
      'Deploy serverless workloads on AWS and cloud providers',
      'Configure scalable Supabase and Firebase cloud backends',
      'Automate builds and testing with GitHub Actions'
    ],
    modules: []
  },
  {
    id: 'course_graphics',
    title: 'Graphics Design: Photoshop, CorelDraw & Canva',
    slug: 'graphics-design-photoshop-coreldraw',
    description: 'Learn professional graphic design for commercial branding, advertising banners, event flyers, typography, and vector printing.',
    thumbnail_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
    category: 'Creative Design',
    instructor_id: 'usr_inst_2',
    instructor_name: 'Sarah Adeleke',
    duration: '6 Weeks',
    level: 'Beginner',
    price: 30000,
    is_free: false,
    status: 'published',
    enrolled_count: 180,
    requirements: ['PC or Mac capable of running Photoshop or CorelDraw'],
    learning_outcomes: [
      'Design high-impact social media flyers and billboards',
      'Master photo retouching, color grading, and masking',
      'Prepare files for professional CMYK commercial printing'
    ],
    modules: []
  },
  {
    id: 'course_mobile',
    title: 'Mobile App Development (Flutter & React Native)',
    slug: 'mobile-app-development-flutter',
    description: 'Build native iOS and Android mobile apps from a single codebase. Learn state management, camera/GPS access, push notifications, and App Store submission.',
    thumbnail_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    category: 'Mobile App Development',
    instructor_id: 'usr_inst_1',
    instructor_name: 'Dr. David Okon',
    duration: '10 Weeks',
    level: 'Intermediate',
    price: 50000,
    is_free: false,
    status: 'published',
    enrolled_count: 64,
    requirements: ['Familiarity with JavaScript or OOP principles'],
    learning_outcomes: [
      'Publish cross-platform mobile apps to Google Play Store',
      'Handle offline caching, local SQLite storage, and sync',
      'Integrate native camera, biometric authentication, and geolocation'
    ],
    modules: []
  },
  {
    id: 'course_data_science',
    title: 'Data Science & Analytics: Python, SQL & PowerBI',
    slug: 'data-science-analytics',
    description: 'Extract business intelligence from complex data. Learn Pandas, NumPy, data visualization, predictive statistics, and dynamic PowerBI dashboards.',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    category: 'Data Science & Analytics',
    instructor_id: 'usr_inst_1',
    instructor_name: 'Dr. David Okon',
    duration: '10 Weeks',
    level: 'Beginner',
    price: 45000,
    is_free: false,
    status: 'published',
    enrolled_count: 85,
    requirements: ['Basic spreadsheet familiarity', 'No prior coding needed'],
    learning_outcomes: [
      'Analyze enterprise datasets with Python and Pandas',
      'Query business databases with SQL and aggregation functions',
      'Build executive dashboards in Power BI and Tableau'
    ],
    modules: []
  }
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr_1',
    student_id: 'usr_student',
    course_id: 'course_web_dev',
    course: INITIAL_COURSES[0],
    status: 'active',
    progress_percentage: 75,
    enrolled_at: '2026-09-15T09:00:00Z'
  },
  {
    id: 'enr_2',
    student_id: 'usr_student',
    course_id: 'course_cyber_sec',
    course: INITIAL_COURSES[1],
    status: 'active',
    progress_percentage: 40,
    enrolled_at: '2026-10-01T10:30:00Z'
  }
];

export const INITIAL_LIVE_CLASSES: LiveClass[] = [
  {
    id: 'live_1',
    course_id: 'course_web_dev',
    course_title: 'Full Stack Web Development',
    instructor_id: 'usr_inst_1',
    instructor_name: 'Dr. David Okon',
    title: 'Live Workshop: Building Supabase RLS Policies & Auth Integration',
    description: 'Join us live as we live-code custom PostgreSQL Row Level Security policies, handle OAuth session persistence, and answer your real-time coding questions.',
    start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    meeting_url: 'https://meet.google.com/xyz-mashtech-live',
    platform: 'Google Meet',
    status: 'scheduled'
  },
  {
    id: 'live_2',
    course_id: 'course_cyber_sec',
    course_title: 'Cyber Security: Ethical Hacking',
    instructor_id: 'usr_inst_1',
    instructor_name: 'Dr. David Okon',
    title: 'Hands-on Penetration Testing Lab Walkthrough',
    description: 'Live interactive hacking lab: reconnaissance, port scanning, and identifying common web vulnerabilities.',
    start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    meeting_url: 'https://meet.google.com/sec-mashtech-pentest',
    platform: 'Google Meet',
    status: 'scheduled'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assgn_1',
    course_id: 'course_web_dev',
    course_title: 'Full Stack Web Development',
    title: 'Assignment 1: Responsive Product Landing Page with Tailwind CSS',
    description: 'Design and code a fully responsive tech product landing page using Next.js and Tailwind CSS. Ensure it looks sharp on mobile, tablet, and desktop.',
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    max_score: 100
  },
  {
    id: 'assgn_2',
    course_id: 'course_cyber_sec',
    course_title: 'Cyber Security: Ethical Hacking',
    title: 'Assignment 1: Network Reconnaissance & Security Audit Report',
    description: 'Use Nmap and Wireshark inside your test lab to scan open ports, identify running services, and draft an executive vulnerability mitigation memo.',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    max_score: 100
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub_1',
    assignment_id: 'assgn_1',
    assignment_title: 'Assignment 1: Responsive Product Landing Page with Tailwind CSS',
    course_title: 'Full Stack Web Development',
    student_id: 'usr_student',
    student_name: 'Alex Marshall',
    text_content: 'Completed the responsive landing page with dark mode support and interactive hero cards. Deployed demo: https://mashtech-demo-landing.vercel.app',
    file_url: 'https://github.com/majormarshall/landing-page-demo.zip',
    score: 95,
    feedback: 'Excellent attention to design consistency, clean Tailwind styling, and smooth accessibility!',
    status: 'graded',
    submitted_at: '2026-11-18T14:20:00Z',
    graded_at: '2026-11-19T10:00:00Z'
  }
];

export const INITIAL_MATERIALS: Material[] = [
  {
    id: 'mat_1',
    course_id: 'course_web_dev',
    course_title: 'Full Stack Web Development',
    title: 'Next.js 15+ & React 19 Cheat Sheet & Architectural Guide.pdf',
    file_url: '#',
    file_type: 'pdf',
    file_size_kb: 2450
  },
  {
    id: 'mat_2',
    course_id: 'course_web_dev',
    course_title: 'Full Stack Web Development',
    title: 'Complete Starter Repository (Tailwind + Supabase).zip',
    file_url: '#',
    file_type: 'zip',
    file_size_kb: 5120
  },
  {
    id: 'mat_3',
    course_id: 'course_cyber_sec',
    course_title: 'Cyber Security: Ethical Hacking',
    title: 'Wireshark Packet Analysis Lab Notes & Cheat Sheet.pdf',
    file_url: '#',
    file_type: 'pdf',
    file_size_kb: 3820
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert_1',
    student_id: 'usr_student',
    student_name: 'Alex Marshall',
    course_id: 'course_python',
    course_title: 'Programming: Python from Zero to Hero',
    certificate_number: 'MTS-2026-PY-8841',
    issue_date: '2026-11-15T00:00:00Z',
    verification_code: 'VFY-8841-MTS',
    is_valid: true
  }
];

export const INITIAL_DISCUSSIONS: DiscussionMessage[] = [
  {
    id: 'disc_1',
    course_id: 'course_web_dev',
    user_id: 'usr_inst_1',
    user_name: 'Dr. David Okon',
    user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    user_role: 'instructor',
    message: 'Welcome everyone to the Full Stack Web Development cohort! Please check Module 1 resources and post any questions regarding your development environment setup here.',
    created_at: '2026-11-10T08:00:00Z'
  },
  {
    id: 'disc_2',
    course_id: 'course_web_dev',
    user_id: 'usr_student',
    user_name: 'Alex Marshall',
    user_avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
    user_role: 'student',
    message: 'Thanks Dr. Okon! The Supabase RLS explanations made PostgreSQL security so intuitive. Looking forward to tomorrow’s live session!',
    created_at: '2026-11-11T12:30:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    user_id: 'usr_student',
    title: 'Upcoming Live Class Tomorrow',
    message: 'Building Supabase RLS Policies & Auth Integration starts tomorrow at 6:00 PM WAT.',
    link: '/student/live-classes',
    type: 'class',
    is_read: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'notif_2',
    user_id: 'usr_student',
    title: 'Assignment Graded: 95/100',
    message: 'Dr. David Okon graded your Responsive Product Landing Page assignment with feedback.',
    link: '/student/assignments',
    type: 'grade',
    is_read: false,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'notif_3',
    user_id: 'usr_student',
    title: 'Certificate Issued!',
    message: 'Your certificate for Python from Zero to Hero is ready for verification & download.',
    link: '/student/certificates',
    type: 'certificate',
    is_read: true,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay_1',
    student_id: 'usr_student',
    student_name: 'Alex Marshall',
    course_id: 'course_web_dev',
    course_title: 'Full Stack Web Development',
    amount: 45000,
    currency: 'NGN',
    reference: 'MTS_PAY_874182931',
    status: 'success',
    payment_method: 'Paystack Card / Transfer',
    paid_at: '2026-09-15T08:58:00Z',
    created_at: '2026-09-15T08:55:00Z'
  },
  {
    id: 'pay_2',
    student_id: 'usr_student',
    student_name: 'Alex Marshall',
    course_id: 'course_cyber_sec',
    course_title: 'Cyber Security: Ethical Hacking',
    amount: 60000,
    currency: 'NGN',
    reference: 'MTS_PAY_993182103',
    status: 'success',
    payment_method: 'Paystack Bank Transfer',
    paid_at: '2026-10-01T10:28:00Z',
    created_at: '2026-10-01T10:25:00Z'
  }
];
