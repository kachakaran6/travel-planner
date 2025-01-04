// import React from 'react';
import React, { useState} from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
// import { Map, PackageSearch, Wallet, LogOut, Home, Pin, Bus } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from './ui/button';
import { FaHome, FaWallet, FaBus, FaMap } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { FaSuitcaseRolling } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

export function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add this line
  // const [isDarkMode, setIsDarkMode] = useState(false); // Add this line

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = () => {
    setIsMenuOpen(false); // Add this line
  };

  // const handleToggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  //   if (isDarkMode) {
  //     document.body.classList.remove('dark-mode');
  //     localStorage.setItem('theme', 'light');
  //   } else {
  //     document.body.classList.add('dark-mode');
  //     localStorage.setItem('theme', 'dark');
  //   }
  // };

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('theme');
  //   if (savedTheme === 'dark') {
  //     setIsDarkMode(true);
  //     document.body.classList.add('dark-mode');
  //   } else {
  //     setIsDarkMode(false);
  //     document.body.classList.remove('dark-mode');
  //   }
  // }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-blue-600">
              TravelPlanner
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  className="flex justify-center w-8 h-8 bg-gray-200 rounded-full"
                  onClick={handleMenuToggle} // Update this line
                >
                  <IoReorderThreeOutline className='w-8 h-8'   />
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg> */}
                </button>
                <div
                  id="menu"
                  className={`absolute right-0 bg-white shadow-md p-4 w-48 ${isMenuOpen ? '' : 'hidden'}`} // Update this line
                >
                  <ul className="space-y-2">
                    <li>
                      <Link to="/trips" className="flex px- py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleOptionClick} // Add this line
                      >
                        <FaMap className="w-5 h-5 mr-2" />
                        Trips
                      </Link>
                    </li>
                    <li>
                      <Link to="/packing" className="flex px- py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleOptionClick} // Add this line
                      >
                        <FaSuitcaseRolling className="w-5 h-5 mr-2" />
                        Packing
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/calendar" className="flex items-center text-gray-600 hover:text-gray-900">
                        <Calendar className="w-5 h-5 mr-2" />
                        Calendar
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/expenses" className="flex px- py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleOptionClick} // Add this line
                      >
                        <FaWallet className="w-5 h-5 mr-2" />
                        Expenses
                      </Link>
                    </li>
                    <li>
                      <Link to="/accommodation" className="flex px- py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleOptionClick} // Add this line
                      >
                        <FaHome className="w-5 h-5 mr-2" />
                        Accommodation
                      </Link>
                    </li>
                    <li>
                      <Link to="/places"className="flex px- py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleOptionClick} // Add this line
                      >
                        <IoLocation className="w-5 h-5 mr-2" />
                        Places
                      </Link>
                    </li>
                    <li>
                      <Link to="/transport"className="flex px- py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleOptionClick} // Add this line
                      >
                        <FaBus className="w-5 h-5 mr-2" />
                        Transport
                      </Link>
                    </li>
                    {user ? (
                      <li>
                        <Button variant="outline" size="sm" onClick={handleSignOut}>
                          <LuLogOut className="w-4 h-4 mr-2" />
                          Log Out
                        </Button>
                      </li>
                    ) : (
                      <li>
                        <Link to="/login" className="flex items-center text-gray-600 hover:text-gray-900">
                          Sign In
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              {/* <Button onClick={handleToggleDarkMode} className="bg-gray-200">
                {isDarkMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
              </Button> */}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

