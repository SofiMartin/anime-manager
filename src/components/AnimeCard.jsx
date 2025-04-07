// src/components/AnimeCard.jsx
import { Link } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img 
        src={anime.imageUrl} 
        alt={anime.title} 
        className="w-full h-56 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/300x450?text=Imagen+no+disponible';
        }}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{anime.title}</h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 font-bold">{anime.rating.toFixed(1)}</span>
          <span className="text-gray-500 ml-1">/ 10</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {anime.genres.slice(0, 3).map((genre, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
          {anime.genres.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              +{anime.genres.length - 3}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Link 
            to={`/animes/${anime.id}`} 
            className="text-indigo-600 hover:text-indigo-800"
          >
            Ver detalles
          </Link>
          <span className={`text-xs px-2 py-1 rounded-full ${
            anime.status === 'Finalizado' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {anime.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;