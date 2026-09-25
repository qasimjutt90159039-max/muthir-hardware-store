import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useAuth } from '../../context/AuthContext';
import { PageLoader } from '../common/LoadingSkeleton';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <PageLoader text="Verifying Security Credentials..." />;
  }

  // Admin access guard
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-zinc-100 flex flex-col">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="lg:pl-64 flex flex-col flex-1">
        <AdminHeader setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
