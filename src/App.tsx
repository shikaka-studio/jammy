import { Routes, Route } from 'react-router';
import Landing from '@/pages/Landing';
import { ROUTES } from '@/constants/routes';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.HOME} element={<Landing />} />

      {/* Protected routes */}
    </Routes>
  );
}
