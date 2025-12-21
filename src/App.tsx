import { Routes, Route } from 'react-router';
import { ToastProvider } from '@/contexts/ToastContext';
import Landing from '@/pages/Landing';
import About from '@/pages/About';
import Rooms from '@/pages/Rooms';
import Room from '@/pages/Room';
import CallbackHandler from '@/pages/CallbackHandler';
import { ROUTES } from '@/constants/routes';

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.HOME} element={<Landing />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.ROOMS} element={<Rooms />} />
        <Route path={ROUTES.CALLBACK} element={<CallbackHandler />} />

        {/* Protected routes */}
        <Route path={ROUTES.ROOMS + '/:id'} element={<Room />} />
      </Routes>
    </ToastProvider>
  );
}
