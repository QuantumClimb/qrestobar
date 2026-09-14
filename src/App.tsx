import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { DataProvider } from './context/DataContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { WhatsAppButton } from './components/common/WhatsAppButton';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { OffersPage } from './pages/OffersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Public Layout with Header, Footer, and Floating WhatsApp Concierge
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-qc-base text-qc-primary">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DataProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Customer Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/experiences" element={<ExperiencesPage />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Hidden Admin CMS Route */}
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
