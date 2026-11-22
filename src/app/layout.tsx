import type { Metadata } from 'next';
import './globals.css';
import { DataProvider } from '@/lib/context/data-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'MashTech Solutions LMS | Tech Skills. Real Opportunities.',
  description: 'MashTech Solutions - Online Tech School, Virtual Classroom, and Student Learning Community. Learn Software Engineering, Cyber Security, UI/UX Design, Cloud, and Data.',
  icons: {
    icon: '/logos/mashtech-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#030919] text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-white">
        <DataProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </DataProvider>
      </body>
    </html>
  );
}
