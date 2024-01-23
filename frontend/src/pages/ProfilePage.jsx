import { useUser } from '../context/UserContext';

const ProfilePage = () => {
  const { user } = useUser();

  return (
    <div>
      <h2>User Profile</h2>
      <div>ID: {user.id}</div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
    </div>
  );
};

export default ProfilePage;
