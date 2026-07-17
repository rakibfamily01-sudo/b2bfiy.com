import React from 'react';
import { AppProvider, useApp } from './components/AppContext';
import { RouterProvider, Route, useRouter } from './components/Router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Views
import HomeView from './views/HomeView';
import ServicesView from './views/ServicesView';
import PortfolioView from './views/PortfolioView';
import ProjectDetailView from './views/ProjectDetailView';
import PackagesView from './views/PackagesView';
import AboutView from './views/AboutView';
import FreeAuditView from './views/FreeAuditView';
import ContactView from './views/ContactView';
import { PrivacyPolicyView, TermsView } from './views/PolicyViews';
import AdminView from './views/AdminView';

function AppLayout() {
  const { path } = useRouter();
  const isAdminPath = path === '/admin' || path.startsWith('/admin/');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white selection:bg-primary/20 selection:text-primary">
      {/* Omit header and footer in admin CMS layout */}
      {!isAdminPath && <Navbar />}

      <main className="flex-grow">
        <Route path="/" element={<HomeView />} />
        <Route path="/services" element={<ServicesView />} />
        <Route path="/portfolio" element={<PortfolioView />} />
        <Route path="/portfolio/:slug" element={<ProjectDetailView />} />
        <Route path="/packages" element={<PackagesView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/free-audit" element={<FreeAuditView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyView />} />
        <Route path="/terms" element={<TermsView />} />
        <Route path="/admin" element={<AdminView />} />
      </main>

      {!isAdminPath && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <RouterProvider>
        <AppLayout />
      </RouterProvider>
    </AppProvider>
  );
}
