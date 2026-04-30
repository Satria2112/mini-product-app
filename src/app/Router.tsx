import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import LoginPage from '../features/auth/LoginPage';
import HomePage from '../pages/HomePage';
import ProductList from '../features/product/ProductList';
import ProductDetail from '../features/product/ProductDetail';

import AppLayout from '../components/layout/AppLayout';
import { useAuthStore } from '../features/auth/authStore';

// 🔐 Protected Route
function PrivateRoute() {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/products" element={<ProductList />} />

          <Route path="/products/:id" element={<ProductDetail />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
