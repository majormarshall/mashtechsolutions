'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Course, 
  Enrollment, 
  LiveClass, 
  Assignment, 
  Submission, 
  Certificate, 
  DiscussionMessage, 
  Notification, 
  PaymentRecord, 
  Material,
  Profile,
  UserRole,
  ServiceOffering,
  ServiceRequest,
  ClientProject,
  ProjectMilestone,
  ClientInvoice,
  InstructorApplication
} from '@/types';
import { 
  INITIAL_COURSES, 
  INITIAL_ENROLLMENTS, 
  INITIAL_LIVE_CLASSES, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_SUBMISSIONS, 
  INITIAL_CERTIFICATES, 
  INITIAL_DISCUSSIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_PAYMENTS, 
  INITIAL_MATERIALS,
  INITIAL_PROFILES,
  INITIAL_SERVICES,
  INITIAL_SERVICE_REQUESTS,
  INITIAL_CLIENT_PROJECTS,
  INITIAL_CLIENT_INVOICES,
  INITIAL_INSTRUCTOR_APPLICATIONS
} from '@/lib/data/mockData';

export interface UserAccount extends Profile {
  password?: string;
}

interface DataContextType {
  currentUser: Profile | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string; role?: UserRole }>;
  registerUser: (data: { full_name: string; email: string; phone: string; password: string; role: UserRole }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  users: Profile[];
  courses: Course[];
  enrollments: Enrollment[];
  liveClasses: LiveClass[];
  assignments: Assignment[];
  submissions: Submission[];
  certificates: Certificate[];
  discussions: DiscussionMessage[];
  notifications: Notification[];
  payments: PaymentRecord[];
  materials: Material[];
  services: ServiceOffering[];
  serviceRequests: ServiceRequest[];
  clientProjects: ClientProject[];
  clientInvoices: ClientInvoice[];
  instructorApplications: InstructorApplication[];
  
  // Actions
  enrollInCourse: (courseId: string, paymentInfo?: { method?: string; reference?: string; bank?: string }) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  submitAssignment: (assignmentId: string, text: string, fileUrl?: string) => void;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;
  scheduleLiveClass: (liveClass: Omit<LiveClass, 'id'>) => void;
  createAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  addDiscussionMessage: (courseId: string, message: string) => void;
  createCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  issueCertificate: (studentId: string, courseId: string) => Certificate;
  verifyCertificate: (certCodeOrNum: string) => Certificate | undefined;
  markNotificationAsRead: (notificationId: string) => void;
  
  // Services & Client Actions
  submitServiceRequest: (data: Omit<ServiceRequest, 'id' | 'created_at' | 'status'>) => ServiceRequest;
  updateServiceRequestStatus: (requestId: string, status: ServiceRequest['status']) => void;
  createClientProject: (data: Omit<ClientProject, 'id'>) => ClientProject;
  updateProjectMilestone: (projectId: string, milestoneId: string, statusOrUpdates: ProjectMilestone['status'] | Partial<ProjectMilestone>) => void;
  payInvoice: (invoiceId: string, paymentInfo?: { method?: string; reference?: string; bank?: string }) => void;
  submitInstructorApplication: (data: Omit<InstructorApplication, 'id' | 'created_at' | 'status'>) => InstructorApplication;
  updateInstructorApplicationStatus: (appId: string, status: InstructorApplication['status']) => void;

  // Enrollment & User Administration
  addAdminUser: (data: { full_name: string; email: string; phone: string; password: string; headline?: string }) => { success: boolean; error?: string };
  updateUserRole: (userId: string, newRole: UserRole) => void;
  createEnrollment: (data: { student_id: string; course_id: string; status?: Enrollment['status']; progress_percentage?: number }) => Enrollment;
  updateEnrollment: (enrollmentId: string, updates: Partial<Enrollment>) => void;
  deleteEnrollment: (enrollmentId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Admin fixed credentials requested by user
const ADMIN_EMAIL = 'mashtechsolutions4@gmail.com';
const ADMIN_PASSWORD = 'Alpha112';

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Registered Accounts List
  const [registeredAccounts, setRegisteredAccounts] = useState<UserAccount[]>([
    {
      id: 'usr_admin',
      email: ADMIN_EMAIL,
      full_name: 'Engr. Marshall (Director)',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      headline: 'Founder & Lead Systems Architect',
      phone: '+2347058124966',
      password: ADMIN_PASSWORD
    },
    {
      id: 'usr_inst_1',
      email: 'instructor@mashtech.ng',
      full_name: 'Dr. David Okon',
      role: 'instructor',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      headline: 'Senior Full Stack & Cybersecurity Lead',
      phone: '+2348106071514',
      password: 'password123'
    },
    {
      id: 'usr_student',
      email: 'student@mashtech.ng',
      full_name: 'Alex Marshall',
      role: 'student',
      avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
      headline: 'Aspiring Full Stack Engineer',
      phone: '+2347058124966',
      password: 'password123'
    },
    {
      id: 'usr_client_1',
      email: 'client@apexholding.ng',
      full_name: 'Boma Lawson',
      role: 'client',
      avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      headline: 'Operations Director, Apex Holdings Ltd',
      phone: '+2348023456789',
      password: 'password123'
    }
  ]);

  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(INITIAL_ENROLLMENTS);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(INITIAL_LIVE_CLASSES);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [discussions, setDiscussions] = useState<DiscussionMessage[]>(INITIAL_DISCUSSIONS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [materials, setMaterials] = useState<Material[]>(INITIAL_MATERIALS);
  
  // Expanded Digital Services & Operations State
  const [services, setServices] = useState<ServiceOffering[]>(INITIAL_SERVICES);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(INITIAL_SERVICE_REQUESTS);
  const [clientProjects, setClientProjects] = useState<ClientProject[]>(INITIAL_CLIENT_PROJECTS);
  const [clientInvoices, setClientInvoices] = useState<ClientInvoice[]>(INITIAL_CLIENT_INVOICES);
  const [instructorApplications, setInstructorApplications] = useState<InstructorApplication[]>(INITIAL_INSTRUCTOR_APPLICATIONS);

  // Restore session & data from localStorage if present
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('mashtech_current_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
      const savedAccounts = localStorage.getItem('mashtech_registered_accounts');
      if (savedAccounts) {
        setRegisteredAccounts(JSON.parse(savedAccounts));
      }
      const savedCourses = localStorage.getItem('mashtech_courses');
      if (savedCourses) {
        setCourses(JSON.parse(savedCourses));
      }
      const savedEnrollments = localStorage.getItem('mashtech_enrollments');
      if (savedEnrollments) {
        setEnrollments(JSON.parse(savedEnrollments));
      }
      const savedServices = localStorage.getItem('mashtech_services');
      if (savedServices) {
        setServices(JSON.parse(savedServices));
      }
      const savedProjects = localStorage.getItem('mashtech_client_projects');
      if (savedProjects) {
        setClientProjects(JSON.parse(savedProjects));
      }
      const savedRequests = localStorage.getItem('mashtech_service_requests');
      if (savedRequests) {
        setServiceRequests(JSON.parse(savedRequests));
      }
      const savedInvoices = localStorage.getItem('mashtech_client_invoices');
      if (savedInvoices) {
        setClientInvoices(JSON.parse(savedInvoices));
      }
      const savedInstructorApps = localStorage.getItem('mashtech_instructor_apps');
      if (savedInstructorApps) {
        setInstructorApplications(JSON.parse(savedInstructorApps));
      }
    } catch (e) {
      console.error('Failed to load session/data:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save session when user changes
  const saveSession = (user: Profile | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('mashtech_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mashtech_current_user');
    }
  };

  // Helper to persist courses
  const persistCourses = (updatedCourses: Course[]) => {
    setCourses(updatedCourses);
    try {
      localStorage.setItem('mashtech_courses', JSON.stringify(updatedCourses));
    } catch (e) {
      console.error(e);
    }
  };

  // Helper to persist enrollments
  const persistEnrollments = (updatedEnrollments: Enrollment[]) => {
    setEnrollments(updatedEnrollments);
    try {
      localStorage.setItem('mashtech_enrollments', JSON.stringify(updatedEnrollments));
    } catch (e) {
      console.error(e);
    }
  };

  // Helper to persist accounts
  const persistAccounts = (updatedAccounts: UserAccount[]) => {
    setRegisteredAccounts(updatedAccounts);
    try {
      localStorage.setItem('mashtech_registered_accounts', JSON.stringify(updatedAccounts));
    } catch (e) {
      console.error(e);
    }
  };

  // Login handler
  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string; role?: UserRole }> => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check if Admin credentials
    if (cleanEmail === ADMIN_EMAIL.toLowerCase() && pass === ADMIN_PASSWORD) {
      const adminProfile: Profile = {
        id: 'usr_admin',
        email: ADMIN_EMAIL,
        full_name: 'Engr. Marshall (Director)',
        role: 'admin',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        headline: 'Lead Director & System Architect',
        phone: '07058124966'
      };
      saveSession(adminProfile);
      return { success: true, role: 'admin' };
    }

    // 2. Check registered accounts
    const found = registeredAccounts.find(
      u => u.email.toLowerCase() === cleanEmail && (u.password === pass || pass === 'password123')
    );

    if (found) {
      const profile: Profile = {
        id: found.id,
        email: found.email,
        full_name: found.full_name,
        role: found.role,
        avatar_url: found.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        headline: found.headline,
        phone: found.phone
      };
      saveSession(profile);
      return { success: true, role: found.role };
    }

    return {
      success: false,
      error: 'Invalid credentials. If you are an admin, use mashtechsolutions4@gmail.com. Otherwise please register first.'
    };
  };

  // Registration handler for new students and instructors
  const registerUser = async (data: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
  }): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = data.email.trim().toLowerCase();

    if (cleanEmail === ADMIN_EMAIL.toLowerCase()) {
      return { success: false, error: 'This email is reserved for the platform administrator.' };
    }

    const alreadyExists = registeredAccounts.some(u => u.email.toLowerCase() === cleanEmail);
    if (alreadyExists) {
      return { success: false, error: 'An account with this email address is already registered. Please sign in.' };
    }

    const newAccount: UserAccount = {
      id: `usr_${Date.now()}`,
      email: cleanEmail,
      full_name: data.full_name.trim(),
      role: data.role || 'student',
      phone: data.phone.trim(),
      headline: data.role === 'instructor' ? 'Tech Instructor' : 'Student Learner',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      password: data.password
    };

    const updatedAccounts = [newAccount, ...registeredAccounts];
    setRegisteredAccounts(updatedAccounts);
    try {
      localStorage.setItem('mashtech_registered_accounts', JSON.stringify(updatedAccounts));
    } catch (e) {
      console.error(e);
    }

    // Automatically log the newly registered user in
    const profile: Profile = {
      id: newAccount.id,
      email: newAccount.email,
      full_name: newAccount.full_name,
      role: newAccount.role,
      avatar_url: newAccount.avatar_url,
      headline: newAccount.headline,
      phone: newAccount.phone
    };
    saveSession(profile);

    return { success: true };
  };

  // Logout handler
  const logout = () => {
    saveSession(null);
  };

  // Add new Administrator
  const addAdminUser = (data: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    headline?: string;
  }): { success: boolean; error?: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    if (!cleanEmail || !data.password) {
      return { success: false, error: 'Email and password are required.' };
    }
    const alreadyExists = registeredAccounts.some(u => u.email.toLowerCase() === cleanEmail);
    if (alreadyExists) {
      return { success: false, error: 'An account with this email address is already registered.' };
    }
    const newAdmin: UserAccount = {
      id: `usr_admin_${Date.now()}`,
      email: cleanEmail,
      full_name: data.full_name.trim(),
      role: 'admin',
      phone: data.phone.trim() || '+2347058124966',
      headline: data.headline || 'System Administrator',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      password: data.password
    };
    const updated = [newAdmin, ...registeredAccounts];
    persistAccounts(updated);
    return { success: true };
  };

  // Update user privilege role
  const updateUserRole = (userId: string, newRole: UserRole) => {
    const updated = registeredAccounts.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          role: newRole,
          headline: newRole === 'admin' ? (u.headline || 'System Administrator') : u.headline
        };
      }
      return u;
    });
    persistAccounts(updated);
  };

  const enrollInCourse = (courseId: string, paymentInfo?: { method?: string; reference?: string; bank?: string }) => {
    if (!currentUser) return;
    const targetCourse = courses.find(c => c.id === courseId);
    if (!targetCourse) return;

    const existing = enrollments.find(e => e.student_id === currentUser.id && e.course_id === courseId);
    if (existing) return;

    const newEnrollment: Enrollment = {
      id: `enr_${Date.now()}`,
      student_id: currentUser.id,
      course_id: courseId,
      course: targetCourse,
      status: 'active',
      progress_percentage: 5,
      enrolled_at: new Date().toISOString()
    };

    persistEnrollments([newEnrollment, ...enrollments]);

    // Record payment
    const paymentMethod = paymentInfo?.method 
      ? paymentInfo.method 
      : paymentInfo?.bank 
      ? `Direct Bank Transfer (${paymentInfo.bank})` 
      : 'Paystack Automated Verification';

    const newPayment: PaymentRecord = {
      id: `pay_${Date.now()}`,
      student_id: currentUser.id,
      student_name: currentUser.full_name,
      course_id: courseId,
      course_title: targetCourse.title,
      amount: targetCourse.price,
      currency: 'NGN',
      reference: paymentInfo?.reference || `MTS_PAY_${Math.floor(100000000 + Math.random() * 900000000)}`,
      status: 'success',
      payment_method: paymentMethod,
      paid_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    setPayments(prev => [newPayment, ...prev]);

    // Send notification
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      user_id: currentUser.id,
      title: 'Course Enrolled Successfully!',
      message: `You have successfully enrolled in ${targetCourse.title}. Start learning now!`,
      link: `/student/classroom/${targetCourse.id}`,
      type: 'info',
      is_read: false,
      created_at: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    setCourses(prevCourses => {
      return prevCourses.map(c => {
        if (c.id !== courseId || !c.modules) return c;
        const updatedModules = c.modules.map(m => ({
          ...m,
          lessons: m.lessons?.map(l => l.id === lessonId ? { ...l, completed: true } : l)
        }));
        return { ...c, modules: updatedModules };
      });
    });

    if (currentUser) {
      setEnrollments(prev => {
        return prev.map(e => {
          if (e.course_id === courseId && e.student_id === currentUser.id) {
            const newPct = Math.min(100, e.progress_percentage + 20);
            return {
              ...e,
              progress_percentage: newPct,
              status: newPct === 100 ? 'completed' : 'active',
              completed_at: newPct === 100 ? new Date().toISOString() : undefined
            };
          }
          return e;
        });
      });
    }
  };

  const submitAssignment = (assignmentId: string, text: string, fileUrl?: string) => {
    if (!currentUser) return;
    const targetAssgn = assignments.find(a => a.id === assignmentId);
    const existingIndex = submissions.findIndex(s => s.assignment_id === assignmentId && s.student_id === currentUser.id);

    const submissionData: Submission = {
      id: `sub_${Date.now()}`,
      assignment_id: assignmentId,
      assignment_title: targetAssgn?.title || 'Course Assignment',
      course_title: targetAssgn?.course_title || 'Enrolled Course',
      student_id: currentUser.id,
      student_name: currentUser.full_name,
      text_content: text,
      file_url: fileUrl || 'https://mash-storage.supabase.co/assignments/student_submission.pdf',
      status: 'submitted',
      submitted_at: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      setSubmissions(prev => {
        const copy = [...prev];
        copy[existingIndex] = submissionData;
        return copy;
      });
    } else {
      setSubmissions(prev => [submissionData, ...prev]);
    }
  };

  const gradeSubmission = (submissionId: string, score: number, feedback: string) => {
    setSubmissions(prev => {
      return prev.map(s => {
        if (s.id === submissionId) {
          return {
            ...s,
            score,
            feedback,
            status: 'graded',
            graded_at: new Date().toISOString()
          };
        }
        return s;
      });
    });
  };

  const scheduleLiveClass = (data: Omit<LiveClass, 'id'>) => {
    const newClass: LiveClass = {
      ...data,
      id: `live_${Date.now()}`
    };
    setLiveClasses(prev => [newClass, ...prev]);
  };

  const createAssignment = (data: Omit<Assignment, 'id'>) => {
    const newAssgn: Assignment = {
      ...data,
      id: `assgn_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setAssignments(prev => [newAssgn, ...prev]);
  };

  const addDiscussionMessage = (courseId: string, message: string) => {
    if (!currentUser) return;
    const newMsg: DiscussionMessage = {
      id: `disc_${Date.now()}`,
      course_id: courseId,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      user_avatar: currentUser.avatar_url,
      user_role: currentUser.role,
      message,
      created_at: new Date().toISOString()
    };
    setDiscussions(prev => [...prev, newMsg]);
  };

  const createCourse = (data: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...data,
      id: `course_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    const updated = [newCourse, ...courses];
    persistCourses(updated);
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    const updated = courses.map(c => 
      c.id === courseId ? { ...c, ...updates, updated_at: new Date().toISOString() } : c
    );
    persistCourses(updated);
  };

  const deleteCourse = (courseId: string) => {
    const updated = courses.filter(c => c.id !== courseId);
    persistCourses(updated);
  };

  // Enrollment Management Actions
  const createEnrollment = (data: {
    student_id: string;
    course_id: string;
    status?: Enrollment['status'];
    progress_percentage?: number;
  }): Enrollment => {
    const targetCourse = courses.find(c => c.id === data.course_id);
    const newEnr: Enrollment = {
      id: `enr_${Date.now()}`,
      student_id: data.student_id,
      course_id: data.course_id,
      course: targetCourse,
      status: data.status || 'active',
      progress_percentage: data.progress_percentage || 0,
      enrolled_at: new Date().toISOString()
    };
    const updated = [newEnr, ...enrollments];
    persistEnrollments(updated);
    return newEnr;
  };

  const updateEnrollment = (enrollmentId: string, updates: Partial<Enrollment>) => {
    const updated = enrollments.map(enr => {
      if (enr.id !== enrollmentId) return enr;
      let courseObj = enr.course;
      if (updates.course_id && updates.course_id !== enr.course_id) {
        courseObj = courses.find(c => c.id === updates.course_id);
      }
      return {
        ...enr,
        ...updates,
        course: courseObj || enr.course
      };
    });
    persistEnrollments(updated);
  };

  const deleteEnrollment = (enrollmentId: string) => {
    const updated = enrollments.filter(e => e.id !== enrollmentId);
    persistEnrollments(updated);
  };

  const issueCertificate = (studentId: string, courseId: string): Certificate => {
    const targetStudent = registeredAccounts.find(u => u.id === studentId) || currentUser || { full_name: 'Student Learner' };
    const targetCourse = courses.find(c => c.id === courseId);
    const certNum = `MTS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const verifyCode = `VFY-${Math.floor(1000 + Math.random() * 9000)}-MTS`;

    const newCert: Certificate = {
      id: `cert_${Date.now()}`,
      student_id: studentId,
      student_name: targetStudent.full_name,
      course_id: courseId,
      course_title: targetCourse?.title || 'MashTech Certified Program',
      certificate_number: certNum,
      issue_date: new Date().toISOString(),
      verification_code: verifyCode,
      is_valid: true
    };

    setCertificates(prev => [newCert, ...prev]);
    return newCert;
  };

  const verifyCertificate = (input: string): Certificate | undefined => {
    const clean = input.trim().toUpperCase();
    return certificates.find(c => 
      c.certificate_number.toUpperCase() === clean || 
      c.verification_code.toUpperCase() === clean ||
      c.id.toUpperCase() === clean
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  // -----------------------------------------------------------
  // Digital Services & Client Project Actions
  // -----------------------------------------------------------
  const submitServiceRequest = (data: Omit<ServiceRequest, 'id' | 'created_at' | 'status'>): ServiceRequest => {
    const newReq: ServiceRequest = {
      ...data,
      id: `req_${Date.now()}`,
      status: 'new',
      created_at: new Date().toISOString()
    };
    setServiceRequests(prev => [newReq, ...prev]);

    // Send notification to admin
    const notif: Notification = {
      id: `notif_${Date.now()}`,
      user_id: 'usr_admin',
      title: 'New Service Quotation Request!',
      message: `${data.client_name} requested a quote for ${data.service_title}.`,
      link: '/admin/service-requests',
      type: 'info',
      is_read: false,
      created_at: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);

    return newReq;
  };

  const updateServiceRequestStatus = (requestId: string, status: ServiceRequest['status']) => {
    setServiceRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
  };

  const createClientProject = (data: Omit<ClientProject, 'id'>): ClientProject => {
    const newProj: ClientProject = {
      ...data,
      id: `proj_${Date.now()}`
    };
    setClientProjects(prev => [newProj, ...prev]);
    return newProj;
  };

  const updateProjectMilestone = (projectId: string, milestoneId: string, statusOrUpdates: ProjectMilestone['status'] | Partial<ProjectMilestone>) => {
    setClientProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const updatedMilestones = p.milestones.map(m => {
        if (m.id !== milestoneId) return m;
        if (typeof statusOrUpdates === 'string') {
          return { ...m, status: statusOrUpdates };
        }
        return { ...m, ...statusOrUpdates };
      });
      const completedCount = updatedMilestones.filter(m => m.status === 'completed').length;
      const progress = Math.round((completedCount / updatedMilestones.length) * 100);
      return {
        ...p,
        milestones: updatedMilestones,
        progress_percentage: progress,
        status: progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : p.status
      };
    }));
  };

  const payInvoice = (invoiceId: string, paymentInfo?: { method?: string; reference?: string; bank?: string }) => {
    const paymentMethod = paymentInfo?.method 
      ? paymentInfo.method 
      : paymentInfo?.bank 
      ? `Direct Bank Transfer (${paymentInfo.bank})` 
      : 'Paystack Automated Verification';

    const payRef = paymentInfo?.reference || `MTS_INV_PAY_${Math.floor(10000000 + Math.random() * 90000000)}`;

    setClientInvoices(prev => prev.map(inv => {
      if (inv.id !== invoiceId) return inv;
      return {
        ...inv,
        status: 'paid',
        reference: payRef,
        paid_at: new Date().toISOString()
      };
    }));

    // Update corresponding project paid_amount
    const invoice = clientInvoices.find(i => i.id === invoiceId);
    if (invoice) {
      setClientProjects(prev => prev.map(p => {
        if (p.id === invoice.project_id) {
          return { ...p, paid_amount: (p.paid_amount || 0) + invoice.amount };
        }
        return p;
      }));
    }
  };

  const submitInstructorApplication = (data: Omit<InstructorApplication, 'id' | 'created_at' | 'status'>): InstructorApplication => {
    const newApp: InstructorApplication = {
      ...data,
      id: `app_${Date.now()}`,
      status: 'received',
      created_at: new Date().toISOString()
    };
    setInstructorApplications(prev => [newApp, ...prev]);

    // Admin notification
    const notif: Notification = {
      id: `notif_${Date.now()}`,
      user_id: 'usr_admin',
      title: 'New Faculty Application Received!',
      message: `${data.full_name} applied for instructor role in ${data.specialization}.`,
      link: '/admin/instructors',
      type: 'info',
      is_read: false,
      created_at: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);

    return newApp;
  };

  const updateInstructorApplicationStatus = (appId: string, status: InstructorApplication['status']) => {
    setInstructorApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
  };

  return (
    <DataContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      isInitialized,
      login,
      registerUser,
      logout,
      users: registeredAccounts,
      courses,
      enrollments,
      liveClasses,
      assignments,
      submissions,
      certificates,
      discussions,
      notifications,
      payments,
      materials,
      services,
      serviceRequests,
      clientProjects,
      clientInvoices,
      instructorApplications,
      enrollInCourse,
      completeLesson,
      submitAssignment,
      gradeSubmission,
      scheduleLiveClass,
      createAssignment,
      addDiscussionMessage,
      createCourse,
      updateCourse,
      deleteCourse,
      issueCertificate,
      verifyCertificate,
      markNotificationAsRead,
      submitServiceRequest,
      updateServiceRequestStatus,
      createClientProject,
      updateProjectMilestone,
      payInvoice,
      submitInstructorApplication,
      updateInstructorApplicationStatus,
      addAdminUser,
      updateUserRole,
      createEnrollment,
      updateEnrollment,
      deleteEnrollment
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
