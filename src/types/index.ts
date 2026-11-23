export type UserRole = 'student' | 'instructor' | 'admin' | 'client';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  headline?: string;
  created_at?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  category: string;
  instructor_id: string;
  instructor_name?: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  price: number;
  is_free: boolean;
  status: 'draft' | 'published' | 'archived';
  requirements: string[];
  learning_outcomes: string[];
  enrolled_count?: number;
  modules?: Module[];
  created_at?: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  position: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  video_url?: string;
  duration_minutes: number;
  content?: string;
  position: number;
  is_preview?: boolean;
  completed?: boolean;
}

export interface Material {
  id: string;
  lesson_id?: string;
  course_id: string;
  course_title?: string;
  title: string;
  file_url: string;
  file_type: 'pdf' | 'zip' | 'doc' | 'video' | 'link';
  file_size_kb?: number;
  created_at?: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  course?: Course;
  status: 'active' | 'completed' | 'cancelled';
  progress_percentage: number;
  enrolled_at: string;
  completed_at?: string;
}

export interface LiveClass {
  id: string;
  course_id: string;
  course_title?: string;
  instructor_id: string;
  instructor_name?: string;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  meeting_url: string;
  platform: 'Google Meet' | 'Zoom' | 'LiveKit';
  recording_url?: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
}

export interface Assignment {
  id: string;
  course_id: string;
  course_title?: string;
  title: string;
  description: string;
  due_date: string;
  max_score: number;
  created_at?: string;
}

export interface Submission {
  id: string;
  assignment_id: string;
  assignment_title?: string;
  course_title?: string;
  student_id: string;
  student_name?: string;
  text_content?: string;
  file_url?: string;
  score?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
  submitted_at: string;
  graded_at?: string;
}

export interface Certificate {
  id: string;
  student_id: string;
  student_name: string;
  course_id: string;
  course_title: string;
  certificate_number: string;
  issue_date: string;
  pdf_url?: string;
  verification_code: string;
  is_valid: boolean;
}

export interface DiscussionMessage {
  id: string;
  course_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  user_role: UserRole;
  message: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  link?: string;
  type: 'info' | 'class' | 'assignment' | 'certificate' | 'grade';
  is_read: boolean;
  created_at: string;
}

export interface PaymentRecord {
  id: string;
  student_id: string;
  student_name?: string;
  course_id: string;
  course_title?: string;
  amount: number;
  currency: string;
  reference: string;
  status: 'pending' | 'success' | 'failed';
  payment_method: string;
  paid_at?: string;
  created_at: string;
}

// -------------------------------------------------------------
// EXPANSION: Digital Services, Client Projects, & Hiring
// -------------------------------------------------------------

export interface ServiceOffering {
  id: string;
  title: string;
  slug: string;
  category: 'Software Development' | 'Design & Media' | 'Cloud & Systems' | 'Corporate Training';
  short_desc: string;
  description: string;
  starting_price: number;
  delivery_time: string;
  features: string[];
  deliverables: string[];
  popular?: boolean;
}

export interface ServiceRequest {
  id: string;
  user_id?: string;
  client_id?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  company_name?: string;
  service_id?: string;
  service_title: string;
  budget_range?: string;
  estimated_budget?: string;
  timeline?: string;
  timeline_expectation?: string;
  project_brief?: string;
  project_scope?: string;
  status: 'new' | 'under_review' | 'proposal_sent' | 'in_progress' | 'completed' | 'closed';
  created_at: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  status: 'pending' | 'in_progress' | 'completed';
  deliverable_note?: string;
  deliverable_url?: string;
}

export interface ClientProject {
  id: string;
  project_code?: string;
  client_id: string;
  client_name: string;
  client_email?: string;
  title: string;
  description?: string;
  service_type?: string;
  service_id?: string;
  service_title?: string;
  budget: number;
  paid_amount?: number;
  status: 'discovery' | 'in_progress' | 'review' | 'completed';
  start_date: string;
  deadline?: string;
  delivery_date?: string;
  assigned_lead?: string;
  lead_assigned?: string;
  progress_percentage?: number;
  milestones: ProjectMilestone[];
  files?: { id: string; name: string; url: string; uploaded_at: string; size: string }[];
}

export interface ClientInvoice {
  id: string;
  invoice_number: string;
  title?: string;
  project_id: string;
  project_title: string;
  client_id: string;
  client_name: string;
  amount: number;
  due_date: string;
  status: 'unpaid' | 'paid' | 'overdue';
  reference?: string;
  paid_at?: string;
}

export interface InstructorApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  specialization?: string;
  disciplines?: string[];
  years_experience?: number;
  location?: string;
  portfolio_url?: string;
  github_url?: string;
  experience_summary?: string;
  notes?: string;
  availability?: 'online' | 'in-person' | 'hybrid';
  status: 'received' | 'under_review' | 'interview_scheduled' | 'approved' | 'rejected';
  created_at: string;
}

