import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { loginRequest, registerRequest, tokenValidation } from '../api/auth';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('Context Error');

  return context;
};

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regOk, setRegOk] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        console.log('No token exist');
      } else {
        const res = await tokenValidation();
        setUser(res.data);
        setIsAuth(true);
      }
      setIsLoading(false);
    };
    checkToken();
  }, []);

  const registerUser = async (data) => {
    setLoading(true);
    setError(null);
    setRegOk(false);
    try {
      const res = await registerRequest(data);

      if (res.status === 201) {
        setRegOk(true);
      }
    } catch (error) {
      console.log('error register', error);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (data) => {
    setLoading(true);
    setError(null);
    setIsAuth(false);
    try {
      const res = await loginRequest(data);
      if (res.status === 200) {
        console.log(res.data);
        setUser(res.data);
        setIsAuth(true);
      }
    } catch (error) {
      console.log('error login');
      setError({
        status: error.response.status,
        message: error.response.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    setIsAuth(false);
  };

  const values = {
    isLoading,
    loading,
    error,
    registerUser,
    regOk,
    loginUser,
    isAuth,
    user,
    logout,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
