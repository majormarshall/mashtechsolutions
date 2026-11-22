const http = require('http');

const routes = [
  '/admin/dashboard',
  '/admin/users',
  '/admin/courses',
  '/admin/enrollments',
  '/admin/payments',
  '/admin/certificates',
  '/admin/announcements',
  '/admin/settings',
  '/instructor/dashboard',
  '/instructor/courses',
  '/instructor/live-classes',
  '/instructor/assignments',
  '/instructor/grading',
  '/instructor/students',
  '/student/dashboard',
  '/student/my-courses',
  '/student/live-classes',
  '/student/assignments',
  '/student/materials',
  '/student/community',
  '/student/certificates',
  '/student/settings',
  '/student/classroom/course_web_dev',
  '/courses',
  '/courses/web-development-mastery',
  '/verify-certificate',
  '/about',
  '/contact'
];

async function checkRoute(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ path, status: res.statusCode, error: null });
      });
    }).on('error', (err) => {
      resolve({ path, status: 0, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing all MashTech LMS dashboard and public routes...\n');
  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    const res = await checkRoute(r);
    if (res.status === 200) {
      console.log(`[PASS] ${r} -> HTTP 200`);
      passed++;
    } else {
      console.error(`[FAIL] ${r} -> HTTP ${res.status} ${res.error || ''}`);
      failed++;
    }
  }

  console.log(`\nFinished: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

run();
