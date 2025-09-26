import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { DashboardPage } from '../pages/DashboardPage';
import { SecurityCenterPage } from '../pages/SecurityCenterPage';
import { SidebarLayout } from '../components/SidebarLayout';

const AppRoutes = () => (
  <SidebarLayout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/security" element={<SecurityCenterPage />} />
    </Routes>
  </SidebarLayout>
);

export default AppRoutes;
