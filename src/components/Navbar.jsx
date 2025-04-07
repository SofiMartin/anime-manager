import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Controlar scroll para cambiar apariencia de la navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // Clase CSS para el estado actual de la navbar
  const navClass = scrolled 
    ? 'fixed top-0 w-full z-50 bg-black bg-opacity-90 backdrop-blur-md shadow-lg transition-all duration-300'
    : 'absolute top-0 w-full z-50 bg-gradient-to-b from-black to-transparent transition-all duration-300';
  
  return (
    <nav className={navClass}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-white font-extrabold text-lg tracking-widest hidden md:block">
                ANIMEVERSE
              </span>
            </div>
          </Link>
          
          {/* Links para desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `relative px-4 py-2 font-medium text-sm transition-colors ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`
              }
              onClick={closeMenu}
            >
              {({ isActive }) => (
                <>
                  <span>INICIO</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
                  )}
                </>
              )}
            </NavLink>
            
            <NavLink 
              to="/animes" 
              className={({ isActive }) => 
                `relative px-4 py-2 font-medium text-sm transition-colors ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`
              }
              onClick={closeMenu}
            >
              {({ isActive }) => (
                <>
                  <span>EXPLORAR</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
                  )}
                </>
              )}
            </NavLink>
            
            <NavLink 
              to="/animes/create" 
              className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              onClick={closeMenu}
            >
              AGREGAR
            </NavLink>
          </div>
          
          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-200 focus:outline-none"
            >
              {!isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil desplegable con animación */}
      <div 
        className={`md:hidden absolute w-full bg-black bg-opacity-95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-2 space-y-2">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `block px-4 py-3 border-l-4 rounded-r-md transition-all ${
                isActive 
                  ? 'border-purple-500 bg-purple-900 bg-opacity-40 text-white' 
                  : 'border-transparent text-gray-300 hover:bg-gray-900 hover:text-white'
              }`
            }
            onClick={closeMenu}
          >
            INICIO
          </NavLink>
          <NavLink 
            to="/animes" 
            className={({ isActive }) => 
              `block px-4 py-3 border-l-4 rounded-r-md transition-all ${
                isActive 
                  ? 'border-purple-500 bg-purple-900 bg-opacity-40 text-white' 
                  : 'border-transparent text-gray-300 hover:bg-gray-900 hover:text-white'
              }`
            }
            onClick={closeMenu}
          >
            EXPLORAR
          </NavLink>
          <NavLink 
            to="/animes/create" 
            className={({ isActive }) => 
              `block px-4 py-3 border-l-4 rounded-r-md transition-all ${
                isActive 
                  ? 'border-purple-500 bg-purple-900 bg-opacity-40 text-white' 
                  : 'border-transparent text-gray-300 hover:bg-gray-900 hover:text-white'
              }`
            }
            onClick={closeMenu}
          >
            AGREGAR ANIME
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;