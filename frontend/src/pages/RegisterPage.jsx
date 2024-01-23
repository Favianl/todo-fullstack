import { Navigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useUser } from "../context/UserContext";

const RegisterPage = () => {
  const { isAuth } = useUser();
  if (isAuth) return <Navigate to="/tasks" />;

  return (
    <div>
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
