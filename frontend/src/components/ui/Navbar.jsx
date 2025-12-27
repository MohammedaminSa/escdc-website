import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Check if user is authenticated as admin
  useEffect(() => {
    const checkAdminAuth = () => {
      const token = localStorage.getItem('adminToken');
      const adminUser = localStorage.getItem('adminUser');
      setIsAdmin(token && adminUser);
    };

    checkAdminAuth();
    
    // Listen for storage changes (login/logout)
    window.addEventListener('storage', checkAdminAuth);
    
    // Also check on location change (for immediate updates)
    checkAdminAuth();

    return () => {
      window.removeEventListener('storage', checkAdminAuth);
    };
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/programs', label: 'Programs' },
    { path: '/membership', label: 'Membership' },
    { path: '/leadership', label: 'Leadership' },
    { path: '/events', label: 'Events' },
    { path: '/resources', label: 'Resources' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg">
              <img 
                src="/escdc-logo.jpg" 
                alt="ESCDC Logo" 
                className="w-full h-full object-contain bg-white p-1 rounded-xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{display: 'none'}}>
                E
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                ESCDC
              </h1>
              <p className="text-xs text-gray-600 font-medium">
                Haramaya University
                {isAdmin && <span className="ml-2 text-orange-600 font-semibold">• Admin</span>}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Admin Link - Only visible to authenticated admins */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive('/admin')
                    ? 'text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg'
                    : 'text-orange-600 hover:text-orange-700 hover:bg-orange-50'
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/membership">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Join Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 mt-4 pt-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Admin Link - Mobile */}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive('/admin')
                      ? 'text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg'
                      : 'text-orange-600 hover:text-orange-700 hover:bg-orange-50'
                  }`}
                >
                  Admin
                </Link>
              )}
              
              <Link to="/membership" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold mt-4 py-3 rounded-xl shadow-lg">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
