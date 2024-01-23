import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useUser } from '../context/UserContext';

const LoginPage = () => {
  const { isAuth } = useUser();
  if (isAuth) return <Navigate to='/tasks' />;
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
