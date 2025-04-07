import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimeContext } from '../context/AnimeContext';
import { toast } from 'react-toastify';

const AnimeCreate = () => {
  const navigate = useNavigate();
  const { createAnime } = useContext(AnimeContext);
  
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    synopsis: '',
    genres: [],
    rating: 0,
    seasonCount: 1,
    episodeCount: 1,
    status: 'En emisión',
    releaseYear: new Date().getFullYear(),
    studio: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const genreOptions = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 
    'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 
    'Sports', 'Supernatural', 'Thriller'
  ];
  
  const statusOptions = ['En emisión', 'Finalizado', 'Anunciado', 'Pausado'];
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'La URL de la imagen es obligatoria';
    if (!formData.synopsis.trim()) newErrors.synopsis = 'La sinopsis es obligatoria';
    if (formData.genres.length === 0) newErrors.genres = 'Selecciona al menos un género';
    if (formData.rating < 0 || formData.rating > 10) newErrors.rating = 'La puntuación debe estar entre 0 y 10';
    if (formData.episodeCount < 1) newErrors.episodeCount = 'Debe tener al menos 1 episodio';
    if (!formData.studio.trim()) newErrors.studio = 'El estudio es obligatorio';
    if (formData.releaseYear < 1950 || formData.releaseYear > new Date().getFullYear() + 1) 
      newErrors.releaseYear = `El año debe estar entre 1950 y ${new Date().getFullYear() + 1}`;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'seasonCount' || name === 'episodeCount' || name === 'releaseYear' 
        ? Number(value) 
        : value
    }));
  };
  
  const handleGenreChange = (genre) => {
    setFormData(prev => {
      const updatedGenres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      
      return { ...prev, genres: updatedGenres };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      const result = await createAnime(formData);
      if (result) {
        navigate(`/animes/${result.id}`);
      }
    } else {
      toast.error('Por favor corrige los errores en el formulario');
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Agregar Nuevo Anime</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Título */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2" htmlFor="title">
                Título *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            {/* URL de Imagen */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2" htmlFor="imageUrl">
                URL de Imagen *
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
            </div>
            
            {/* Sinopsis */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2" htmlFor="synopsis">
                Sinopsis *
              </label>
              <textarea
                id="synopsis"
                name="synopsis"
                value={formData.synopsis}
                onChange={handleChange}
                rows="4"
                className={`w-full px-3 py-2 border rounded-md ${errors.synopsis ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.synopsis && <p className="text-red-500 text-sm mt-1">{errors.synopsis}</p>}
            </div>
            
            {/* Géneros */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">
                Géneros *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {genreOptions.map(genre => (
                  <div key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      id={genre}
                      checked={formData.genres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                      className="mr-2"
                    />
                    <label htmlFor={genre}>{genre}</label>
                  </div>
                ))}
              </div>
              {errors.genres && <p className="text-red-500 text-sm mt-1">{errors.genres}</p>}
            </div>
            
            {/* Rating */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="rating">
                Puntuación (0-10) *
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                className={`w-full px-3 py-2 border rounded-md ${errors.rating ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
            </div>
            
            {/* Estado */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="status">
                Estado *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Temporadas */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="seasonCount">
                Temporadas *
              </label>
              <input
                type="number"
                id="seasonCount"
                name="seasonCount"
                value={formData.seasonCount}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            {/* Episodios */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="episodeCount">
                Episodios *
              </label>
              <input
                type="number"
                id="episodeCount"
                name="episodeCount"
                value={formData.episodeCount}
                onChange={handleChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-md ${errors.episodeCount ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.episodeCount && <p className="text-red-500 text-sm mt-1">{errors.episodeCount}</p>}
            </div>
            
            {/* Año */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="releaseYear">
                Año de lanzamiento *
              </label>
              <input
                type="number"
                id="releaseYear"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
                min="1950"
                max={new Date().getFullYear() + 1}
                className={`w-full px-3 py-2 border rounded-md ${errors.releaseYear ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.releaseYear && <p className="text-red-500 text-sm mt-1">{errors.releaseYear}</p>}
            </div>
            
            {/* Estudio */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="studio">
                Estudio *
              </label>
              <input
                type="text"
                id="studio"
                name="studio"
                value={formData.studio}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.studio ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.studio && <p className="text-red-500 text-sm mt-1">{errors.studio}</p>}
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <Link 
              to="/animes" 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancelar
            </Link>
            <button 
              type="submit" 
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimeCreate;