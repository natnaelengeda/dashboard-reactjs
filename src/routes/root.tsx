import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Outlet,
  // useNavigate,
} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Root() {
  const navigate = useNavigate();
  const admin = useSelector((state: any) => state.admin);
  const isLoggedIn = admin.isloggedIn;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login');
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  )
}
