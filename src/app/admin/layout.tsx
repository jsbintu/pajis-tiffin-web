import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/layout/admin-header';
import { AdminSidebar } from '@/components/layout/admin-sidebar';

// TODO: Replace with actual admin auth check
async function getAdminUser() {
  // This would typically check the session/token for admin role
  // For now, we'll use a mock check
  const isAdmin = true; // Replace with actual admin check
  
  if (!isAdmin) {
    redirect('/login');
  }
  
  return {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@pajiskitchen.com',
    role: 'ADMIN' as const,
  };
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminUser = await getAdminUser();

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={adminUser} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
