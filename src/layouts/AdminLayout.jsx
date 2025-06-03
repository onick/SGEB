import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminDashboard from '../pages/admin/AdminDashboard';
import DevelopmentPlan from '../pages/admin/DevelopmentPlan';
import Events from '../pages/admin/Events';
import Visitors from '../pages/admin/Visitors';
import Reports from '../pages/admin/Reports';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <main className="p-6">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/development-plan" element={<DevelopmentPlan />} />
            <Route path="/events" element={<Events />} />
            <Route path="/visitors" element={<Visitors />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 