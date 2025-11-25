import { Routes, Route } from 'react-router';
import Landing from '@/pages/Landing';
import About from '@/pages/About';
import CallbackHandler from '@/pages/CallbackHandler';
import { ROUTES } from '@/constants/routes';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.HOME} element={<Landing />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.CALLBACK} element={<CallbackHandler />} />

      {/* Protected routes */}
    </Routes>
  );
}
