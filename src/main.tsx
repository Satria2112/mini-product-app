import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './app/Router';
import 'antd/dist/reset.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
