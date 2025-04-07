import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-indigo-700 mb-6">Anime Manager</h1>
          <p className="text-xl text-gray-700 mb-8">
            Bienvenido a tu plataforma para gestionar tu colección de animes favoritos. 
            Explora nuestro catálogo, agrega nuevos títulos o personaliza la información de tus series preferidas.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link 
              to="/animes" 
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Ver Catálogo
            </Link>
            <Link 
              to="/animes/create" 
              className="bg-pink-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Agregar Anime
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-indigo-600 text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Explora</h3>
              <p className="text-gray-600">Descubre nuestra colección de series y películas de anime con información detallada.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-indigo-600 text-4xl mb-4">✏️</div>
              <h3 className="text-xl font-bold mb-2">Personaliza</h3>
              <p className="text-gray-600">Edita la información de tus animes y mantén actualizada tu colección.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-indigo-600 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Organiza</h3>
              <p className="text-gray-600">Gestiona fácilmente tu catálogo con nuestras herramientas intuitivas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;