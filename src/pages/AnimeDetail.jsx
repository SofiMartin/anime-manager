import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AnimeContext } from '../context/AnimeContext';
import Swal from 'sweetalert2';

const AnimeDetail = () => {
  const { id } = useParams();
  const { getAnimeById, deleteAnime } = useContext(AnimeContext);
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnime = async () => {
      const data = await getAnimeById(id);
      setAnime(data);
      setLoading(false);
    };

    fetchAnime();
  }, [id, getAnimeById]);

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar "${anime?.title}"?`,
      icon: 'warning',
      iconColor: '#9333ea',
      showCancelButton: true,
      confirmButtonColor: '#9333ea',
      cancelButtonColor: '#1f2937',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#111827',
      color: '#f9fafb'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteAnime(id);
        if (success) {
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El anime ha sido eliminado correctamente.',
            icon: 'success',
            iconColor: '#9333ea',
            confirmButtonColor: '#9333ea',
            background: '#111827',
            color: '#f9fafb'
          });
          navigate('/animes');
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-10 text-center max-w-2xl mx-auto">
            <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">Anime no encontrado</h3>
            <p className="text-gray-400 mb-6">
              El anime que estás buscando no existe o ha sido eliminado.
            </p>
            <Link 
              to="/animes" 
              className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition-colors inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16">
      {/* Hero section con imagen de fondo */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        {/* Imagen de fondo con efecto blur */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-md" 
          style={{ 
            backgroundImage: `url(${anime.imageUrl})`,
            filter: 'brightness(0.3) saturate(1.2)',
            transform: 'scale(1.1)'
          }}
        ></div>
        
        <div className="container mx-auto px-4 h-full flex items-end">
          <div className="flex flex-col md:flex-row items-start md:items-end pb-6 relative z-10">
            {/* Imagen de portada */}
            <div className="w-32 h-48 md:w-48 md:h-72 rounded-lg overflow-hidden shadow-lg border-2 border-gray-700 -mt-16 md:mt-0 bg-gray-800 flex-shrink-0">
              <img 
                src={anime.imageUrl} 
                alt={anime.title} 
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+disponible';
                  setImageLoaded(true);
                }}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            {/* Información básica */}
            <div className="md:ml-6 mt-4 md:mt-0 flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  anime.status === 'Finalizado' 
                    ? 'bg-blue-900/60 text-blue-200' 
                    : 'bg-green-900/60 text-green-200'
                }`}>
                  {anime.status}
                </span>
                <span className="px-3 py-1 bg-gray-700/60 text-gray-200 rounded-full text-xs">
                  {anime.releaseYear}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{anime.title}</h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center">
                  <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="text-white font-bold">{anime.rating.toFixed(1)}</span>
                  <span className="text-gray-400 text-sm ml-1">/ 10</span>
                </div>
                <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  <span className="text-white">{anime.seasonCount}</span>
                  <span className="text-gray-400 text-sm ml-1">
                    {anime.seasonCount === 1 ? 'Temporada' : 'Temporadas'}
                  </span>
                </div>
                <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                  </svg>
                  <span className="text-white">{anime.episodeCount}</span>
                  <span className="text-gray-400 text-sm ml-1">
                    {anime.episodeCount === 1 ? 'Episodio' : 'Episodios'}
                  </span>
                </div>
              </div>
              
              <div className="hidden md:flex flex-wrap gap-2 mt-4">
                {anime.genres.map((genre, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-purple-900/40 text-purple-200 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Acciones (visible solo en desktop) */}
            <div className="hidden md:flex md:flex-col gap-2 ml-auto">
              <Link 
                to={`/animes/${id}/edit`} 
                className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-md flex items-center transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Editar
              </Link>
              <button 
                onClick={handleDelete} 
                className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md flex items-center transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Géneros (visible solo en móvil) */}
      <div className="md:hidden container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2">
          {anime.genres.map((genre, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-purple-900/40 text-purple-200 rounded-full text-sm"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
      
      {/* Acciones (visible solo en móvil) */}
      <div className="md:hidden container mx-auto px-4 py-4">
        <div className="flex gap-2">
          <Link 
            to={`/animes/${id}/edit`} 
            className="flex-1 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-md flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Editar
          </Link>
          <button 
            onClick={handleDelete} 
            className="flex-1 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Eliminar
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2">
            {/* Sinopsis */}
            <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed">
                {anime.synopsis}
              </p>
            </div>
            
            {/* Información de producción */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Información</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex border-b border-gray-700 pb-3">
                  <span className="text-gray-400 w-32">Estudio</span>
                  <span className="text-white font-medium">{anime.studio}</span>
                </div>
                <div className="flex border-b border-gray-700 pb-3">
                  <span className="text-gray-400 w-32">Año</span>
                  <span className="text-white font-medium">{anime.releaseYear}</span>
                </div>
                <div className="flex border-b border-gray-700 pb-3">
                  <span className="text-gray-400 w-32">Temporadas</span>
                  <span className="text-white font-medium">{anime.seasonCount}</span>
                </div>
                <div className="flex border-b border-gray-700 pb-3">
                  <span className="text-gray-400 w-32">Episodios</span>
                  <span className="text-white font-medium">{anime.episodeCount}</span>
                </div>
                <div className="flex border-b border-gray-700 pb-3">
                  <span className="text-gray-400 w-32">Estado</span>
                  <span className={`font-medium ${
                    anime.status === 'Finalizado' ? 'text-blue-400' : 'text-green-400'
                  }`}>
                    {anime.status}
                  </span>
                </div>
                <div className="flex border-b border-gray-700 pb-3">
                  <span className="text-gray-400 w-32">Calificación</span>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-white font-medium">{anime.rating.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm ml-1">/ 10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Columna lateral */}
          <div>
            {/* Tarjeta de información */}
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 mb-6">
              <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Géneros</h3>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {anime.genres.map((genre, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-purple-900/30 text-purple-200 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Navegación */}
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
              <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Acciones</h3>
              </div>
              <div className="p-4">
                <Link 
                  to="/animes" 
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors w-full mb-2"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Volver al catálogo
                </Link>
                <Link 
                  to="/animes/create" 
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors w-full"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Agregar nuevo anime
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;