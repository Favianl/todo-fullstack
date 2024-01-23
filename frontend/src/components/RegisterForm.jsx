import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';
const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, loading, regOk } = useUser();

  const onSubmit = handleSubmit((data) => {
    registerUser(data);
  });

  useEffect(() => {
    if (regOk) {
      const timeoutId = setTimeout(() => {
        navigate('/login');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [regOk, navigate]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <form onSubmit={onSubmit}>
      {regOk && (
        <p style={{ color: 'green' }}>Registration OK! Redirect to Login...</p>
      )}
      <input
        {...register('name', { required: 'name is required' })}
        type='text'
        placeholder='name'
      />
      {errors.name && <p>{errors.name.message}</p>}
      <input
        {...register('email', { required: 'email is required' })}
        type='email'
        placeholder='email'
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        {...register('password', { required: 'password is required' })}
        type='password'
        placeholder='password'
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type='submit' value='register' />
    </form>
  );
};

export default RegisterForm;
