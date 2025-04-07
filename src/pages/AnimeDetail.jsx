import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AnimeContext } from '../context/AnimeContext';
import Swal from 'sweetalert2';

const AnimeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAnimeById, deleteAnime } = useContext(AnimeContext);
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

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
      text: `¿Realmente deseas eliminar ${anime.title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteAnime(id);
        if (success) {
          navigate('/animes');
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl">Cargando...</p>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl text-red-500">Anime no encontrado</p>
        <Link to="/animes" className="text-indigo-600 hover:underline mt-4 inline-block">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img 
              src={anime.imageUrl} 
              alt={anime.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{anime.title}</h1>
              <div className="flex items-center bg-indigo-100 px-3 py-1 rounded-full">
                <span className="text-indigo-800 font-bold">{anime.rating.toFixed(1)}</span>
                <span className="text-indigo-600 ml-1">/ 10</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {anime.genres.map((genre, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-gray-500 font-medium">Estudio</h3>
                <p className="text-gray-800">{anime.studio}</p>
              </div>
              <div>
                <h3 className="text-gray-500 font-medium">Año</h3>
                <p className="text-gray-800">{anime.releaseYear}</p>
              </div>
              <div>
                <h3 className="text-gray-500 font-medium">Estado</h3>
                <p className="text-gray-800">{anime.status}</p>
              </div>
              <div>
                <h3 className="text-gray-500 font-medium">Episodios</h3>
                <p className="text-gray-800">{anime.episodeCount}</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sinopsis</h3>
            <p className="text-gray-700 mb-6">{anime.synopsis}</p>
            
            <div className="flex flex-wrap gap-3 mt-auto">
              <Link 
                to="/animes" 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Volver
              </Link>
              <Link 
                to={`/animes/${id}/edit`} 
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Editar
              </Link>
              <button 
                onClick={handleDelete} 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;