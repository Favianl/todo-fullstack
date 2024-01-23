import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProfilePage from './pages/ProfilePage';
import TasksPage from './pages/TasksPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import PrivateRoutes from './components/PrivateRoutes';
import { UserProvider } from './context/UserContext';
import { TodoProvider } from './context/TodoContext';
import TaskPage from './pages/TaskPage';

function App() {
  return (
    <>
      <UserProvider>
        <TodoProvider>
          <h1>Todo App</h1>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route element={<PrivateRoutes />}>
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='/tasks/:id' element={<TaskPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
              <Route path='/*' element={<h2>Not Found</h2>} />
            </Routes>
          </BrowserRouter>
        </TodoProvider>
      </UserProvider>
    </>
  );
}

export default App;
