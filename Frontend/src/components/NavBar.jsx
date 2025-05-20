import { Link } from "react-router-dom";
import authStore from "../store/authStore";
import {
  LogOut,
  MessageSquare,
  User,
  LogIn,
  UserPlus,
  Moon,
  Sun,Bot
} from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { logout, userAuth } = authStore();
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  };

  const handleLogout = () => logout();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left: Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Connectify</h1>
          </Link>

          {/* Right: Auth Buttons + Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* <button className="btn btn-sm gap-2">
  <Bot className="w-4 h-4" />
  <span className="hidden sm:inline">AI</span>
</button> */}
            {/* <button onClick={toggleTheme} className="theme-toggle-button">
              {darkMode ? (
                <Sun className="text-yellow-400" />
              ) : (
                <Moon className="text-gray-700" />
              )}
            </button> */}

            {userAuth ? (
              <>
                <Link to="/profile" className="btn btn-sm gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm gap-2 text-red-500 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-sm gap-2">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link to="/register" className="btn btn-sm gap-2">
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
