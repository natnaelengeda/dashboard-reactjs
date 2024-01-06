import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Outlet,
  // useNavigate,
} from 'react-router-dom';


export default function Root() {
  const admin = useSelector((state: any) => state.admin);
  useEffect(() => {

  }, []);

  return (
    <>
      <Outlet />
    </>
  )
}
