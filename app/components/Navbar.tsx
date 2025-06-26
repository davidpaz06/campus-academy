import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white dark:bg-gray-800">
      <div className="font-bold text-xl">
        <Link to="/">Campus Academy</Link>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="px-2 py-1 rounded bg-amber-300 text-blue-900 dark:bg-blue-400 dark:text-white">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {!isAuthenticated && <Link to="/login">Login</Link>}
        {!isAuthenticated && <Link to="/register">Register</Link>}
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
