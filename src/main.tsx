import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

// Styles
import './index.css';
import './styles/tailwind.css';

// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Rooit Page
import Root from './routes/root';

// POages
import Index from './pages/Index';
import Login from './pages/auth/login';
import { Provider } from 'react-redux';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Index />
      }
    ]
  },
  {
    path: '/auth/login',
    element: <Login />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// const env = import.meta.env;

function App() {
  return (
    <RouterProvider router={router} />
  )
};

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
