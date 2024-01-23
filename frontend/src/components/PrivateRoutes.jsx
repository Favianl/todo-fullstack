import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoutes = () => {
  const { isAuth, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
};

export default PrivateRoutes;
