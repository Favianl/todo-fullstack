import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, loading } = useUser();

  const onSubmit = handleSubmit((data) => {
    loginUser(data);
  });

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <form onSubmit={onSubmit}>
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
      <input type='submit' value='login' />
    </form>
  );
};

export default LoginForm;
