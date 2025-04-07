import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <span className="text-6xl text-indigo-600 block mb-2">404</span>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Página no encontrada</h1>
          <p className="text-gray-600 mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Link 
            to="/" 
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Volver a la página principal
          </Link>
          <Link 
            to="/animes" 
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
          >
            Ver catálogo de animes
          </Link>
        </div>
        
        <div className="mt-8 text-gray-500 text-sm">
          <p>¿Estás buscando algo específico?</p>
          <p>Prueba navegando a través de nuestras categorías principales.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;