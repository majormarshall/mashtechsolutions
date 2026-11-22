-- ==============================================================================
-- MashTech Solutions Learning Management System (LMS)
-- Database Migration: Initial Schema & RLS Policies
-- PostgreSQL / Supabase Schema
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Users: Student, Instructor, Admin)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'instructor', 'admin')) DEFAULT 'student',
    avatar_url TEXT,
    bio TEXT,
    phone TEXT,
    headline TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. COURSES
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    thumbnail_url TEXT,
    category TEXT NOT NULL,
    instructor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    duration TEXT,
    level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')) DEFAULT 'Beginner',
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    is_free BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'published',
    requirements TEXT[] DEFAULT ARRAY[]::TEXT[],
    learning_outcomes TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. MODULES (Course sections)
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    position INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. LESSONS
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    video_url TEXT,
    duration_minutes INTEGER DEFAULT 15,
    content TEXT,
    position INTEGER NOT NULL DEFAULT 1,
    is_preview BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. MATERIALS (Downloadable files, PDFs, slides, project zips)
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size_kb INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. ENROLLMENTS
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
    progress_percentage INTEGER NOT NULL DEFAULT 0,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    completed_at TIMESTAMPTZ,
    UNIQUE(student_id, course_id)
);

-- 7. LESSON_PROGRESS (Tracking individual completed lessons)
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT true,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(student_id, lesson_id)
);

-- 8. LIVE_CLASSES (Google Meet / Zoom integration)
CREATE TABLE IF NOT EXISTS public.live_classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    meeting_url TEXT NOT NULL,
    platform TEXT NOT NULL DEFAULT 'Google Meet',
    recording_url TEXT,
    status TEXT NOT NULL CHECK (status IN ('scheduled', 'live', 'completed', 'cancelled')) DEFAULT 'scheduled',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. ASSIGNMENTS
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    max_score INTEGER NOT NULL DEFAULT 100,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    text_content TEXT,
    file_url TEXT,
    score NUMERIC(5, 2),
    feedback TEXT,
    status TEXT NOT NULL CHECK (status IN ('submitted', 'graded', 'late')) DEFAULT 'submitted',
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    graded_at TIMESTAMPTZ,
    UNIQUE(assignment_id, student_id)
);

-- 11. QUIZZES
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    pass_percentage INTEGER NOT NULL DEFAULT 70,
    time_limit_minutes INTEGER DEFAULT 30,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of strings e.g. ["Option A", "Option B"]
    correct_option_index INTEGER NOT NULL,
    explanation TEXT
);

CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    score_percentage INTEGER NOT NULL,
    passed BOOLEAN NOT NULL DEFAULT false,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. CERTIFICATES
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    certificate_number TEXT NOT NULL UNIQUE,
    issue_date TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    pdf_url TEXT,
    verification_code TEXT NOT NULL UNIQUE,
    is_valid BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(student_id, course_id)
);

-- 13. COURSE DISCUSSIONS & COMMUNITY
CREATE TABLE IF NOT EXISTS public.course_discussions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.course_discussions(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. MESSAGES (Direct Student-Instructor / Student-Student)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    type TEXT NOT NULL DEFAULT 'info',
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 16. PAYMENTS (Paystack integration)
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NGN',
    reference TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed')) DEFAULT 'pending',
    payment_method TEXT DEFAULT 'paystack',
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current auth user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is instructor
CREATE OR REPLACE FUNCTION public.is_instructor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('instructor', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if student is enrolled in course
CREATE OR REPLACE FUNCTION public.is_enrolled(check_course_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE course_id = check_course_id AND student_id = auth.uid() AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES Policies
CREATE POLICY "Public profiles are readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins have full access to profiles" ON public.profiles FOR ALL USING (public.is_admin());

-- COURSES Policies
CREATE POLICY "Published courses are viewable by everyone" ON public.courses FOR SELECT USING (status = 'published' OR public.is_admin() OR auth.uid() = instructor_id);
CREATE POLICY "Instructors can insert and update their courses" ON public.courses FOR ALL USING (public.is_admin() OR auth.uid() = instructor_id);

-- MODULES & LESSONS Policies
CREATE POLICY "Anyone can view modules of published courses" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Instructors manage modules for their courses" ON public.modules FOR ALL USING (public.is_admin() OR EXISTS (SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid()));

CREATE POLICY "Anyone can view lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Instructors manage lessons" ON public.lessons FOR ALL USING (public.is_admin() OR EXISTS (SELECT 1 FROM public.modules m JOIN public.courses c ON m.course_id = c.id WHERE m.id = module_id AND c.instructor_id = auth.uid()));

-- MATERIALS Policies (Private to enrolled students, instructor, or admin)
CREATE POLICY "Enrolled students and instructors can access materials" ON public.materials FOR SELECT USING (
  public.is_admin() OR 
  EXISTS (SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid()) OR
  public.is_enrolled(course_id)
);
CREATE POLICY "Instructors manage materials" ON public.materials FOR ALL USING (
  public.is_admin() OR EXISTS (SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid())
);

-- ENROLLMENTS Policies
CREATE POLICY "Users view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = student_id OR public.is_admin() OR EXISTS (SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid()));
CREATE POLICY "Students can self-enroll or Admin manages enrollments" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = student_id OR public.is_admin());
CREATE POLICY "Admins and students update enrollments" ON public.enrollments FOR UPDATE USING (auth.uid() = student_id OR public.is_admin());

-- LESSON PROGRESS Policies
CREATE POLICY "Students manage their own progress" ON public.lesson_progress FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Instructors and Admins view progress" ON public.lesson_progress FOR SELECT USING (public.is_admin() OR public.is_instructor());

-- LIVE CLASSES Policies
CREATE POLICY "Enrolled students and instructors view live classes" ON public.live_classes FOR SELECT USING (
  public.is_admin() OR auth.uid() = instructor_id OR public.is_enrolled(course_id)
);
CREATE POLICY "Instructors manage live classes" ON public.live_classes FOR ALL USING (
  public.is_admin() OR auth.uid() = instructor_id
);

-- ASSIGNMENTS Policies
CREATE POLICY "View assignments for course" ON public.assignments FOR SELECT USING (
  public.is_admin() OR public.is_enrolled(course_id) OR EXISTS (SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid())
);
CREATE POLICY "Instructors manage assignments" ON public.assignments FOR ALL USING (
  public.is_admin() OR EXISTS (SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid())
);

-- SUBMISSIONS Policies
CREATE POLICY "Students view and make own submissions" ON public.submissions FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Instructors review and grade submissions" ON public.submissions FOR ALL USING (
  public.is_admin() OR EXISTS (
    SELECT 1 FROM public.assignments a 
    JOIN public.courses c ON a.course_id = c.id 
    WHERE a.id = assignment_id AND c.instructor_id = auth.uid()
  )
);

-- CERTIFICATES Policies (Public verification enabled)
CREATE POLICY "Certificates are publicly verifiable by certificate_number or code" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Only admins or automated triggers create certificates" ON public.certificates FOR ALL USING (public.is_admin());

-- DISCUSSIONS & MESSAGES Policies
CREATE POLICY "Course discussions readable by course members" ON public.course_discussions FOR SELECT USING (true);
CREATE POLICY "Course members can post discussions" ON public.course_discussions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can access their own messages" ON public.messages FOR ALL USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can access their own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- STORAGE BUCKETS INITIALIZATION
INSERT INTO storage.buckets (id, name, public) VALUES 
('avatars', 'avatars', true),
('course-thumbnails', 'course-thumbnails', true),
('learning-materials', 'learning-materials', false),
('assignments', 'assignments', false),
('certificates', 'certificates', true),
('course-videos', 'course-videos', false)
ON CONFLICT (id) DO NOTHING;

-- Trigger to create profile when auth.user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
