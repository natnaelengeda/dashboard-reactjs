import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

// Styles
import './index.css';
import './styles/tailwind.css';

// Rooit Page
import Root from './routes/root';

// POages
import Index from './pages/Index';

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
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
