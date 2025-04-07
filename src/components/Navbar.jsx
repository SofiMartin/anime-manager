// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-indigo-700 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-white font-bold text-xl">Anime Manager</span>
            </Link>
          </div>
          
          {/* Links para pantallas medianas y grandes */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              Inicio
            </NavLink>
            <NavLink 
              to="/animes" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/animes') 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              Catálogo
            </NavLink>
            <NavLink 
              to="/animes/create" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/animes/create') 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              Agregar Anime
            </NavLink>
          </div>
          
          {/* Botón de menú móvil */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Icono de menú (tres líneas) */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icono X para cerrar */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil desplegable */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              Inicio
            </NavLink>
            <NavLink 
              to="/animes" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/animes') 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              Catálogo
            </NavLink>
            <NavLink 
              to="/animes/create" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/animes/create') 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              Agregar Anime
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;