import { Routes, Route } from 'react-router';
import Landing from '@/pages/Landing';
import About from '@/pages/About';
import { ROUTES } from '@/constants/routes';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.HOME} element={<Landing />} />
      <Route path={ROUTES.ABOUT} element={<About />} />

      {/* Protected routes */}
    </Routes>
  );
}
