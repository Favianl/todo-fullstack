import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { isAuth, logout } = useUser();

  return (
    <nav>
      {isAuth ? (
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/tasks'}>Tasks</Link>
          </li>
          <li>
            <Link to={'/profile'}>Profile</Link>
          </li>
          <li>
            <Link
              to={'/'}
              onClick={() => {
                return logout();
                // const confirm = window.confirm("Are you sure?");
                // if (confirm) {
                //   navigate("/");
                //   return logout();
                // }
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/login'}>Login</Link>
          </li>
          <li>
            <Link to={'/register'}>Register</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
