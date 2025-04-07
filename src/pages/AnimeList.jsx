// src/pages/AnimeList.jsx
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AnimeContext } from '../context/AnimeContext';
import AnimeCard from '../components/AnimeCard';

const AnimeList = () => {
  const { animes, loading, error } = useContext(AnimeContext);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  
  // Lista única de géneros a partir de todos los animes
  const allGenres = animes.reduce((genres, anime) => {
    anime.genres.forEach(genre => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
    return genres;
  }, []).sort();
  
  useEffect(() => {
    // Aplicar filtros
    let result = [...animes];
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(anime => 
        anime.title.toLowerCase().includes(term) || 
        anime.synopsis.toLowerCase().includes(term)
      );
    }
    
    // Filtrar por género
    if (selectedGenre) {
      result = result.filter(anime => 
        anime.genres.includes(selectedGenre)
      );
    }
    
    setFilteredAnimes(result);
  }, [animes, searchTerm, selectedGenre]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-700">Cargando animes...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Catálogo de Anime</h1>
        <Link 
          to="/animes/create" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Agregar Anime
        </Link>
      </div>
      
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Búsqueda por texto */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              id="search"
              placeholder="Título o descripción..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          {/* Filtro por género */}
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
              Género
            </label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={handleGenreChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Todos los géneros</option>
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          
          {/* Botón para limpiar filtros */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
      
      {/* Mostrar resultados */}
      {filteredAnimes.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-700 text-lg">No se encontraron animes que coincidan con tu búsqueda.</p>
          <button 
            onClick={clearFilters}
            className="mt-4 text-indigo-600 hover:text-indigo-800"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-4">
            Mostrando {filteredAnimes.length} {filteredAnimes.length === 1 ? 'anime' : 'animes'}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAnimes.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AnimeList;