import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AnimeContext } from '../context/AnimeContext';
import { toast } from 'react-toastify';

const AnimeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAnimeById, updateAnime } = useContext(AnimeContext);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
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
  
  // Opciones para géneros
  const genreOptions = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery',
    'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports',
    'Supernatural', 'Thriller', 'Mecha', 'Music', 'School'
  ];
  
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const animeData = await getAnimeById(id);
        if (animeData) {
          setFormData(animeData);
        } else {
          toast.error('No se pudo cargar la información del anime');
          navigate('/animes');
        }
      } catch (error) {
        console.error('Error al cargar el anime:', error);
        toast.error('Error al cargar los datos del anime');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnime();
  }, [id, getAnimeById, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleGenreChange = (e) => {
    const genre = e.target.value;
    if (e.target.checked) {
      setFormData(prev => ({
        ...prev,
        genres: [...prev.genres, genre]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        genres: prev.genres.filter(g => g !== genre)
      }));
    }
    
    // Limpiar error de géneros
    if (errors.genres) {
      setErrors(prev => ({
        ...prev,
        genres: null
      }));
    }
  };
  
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'La URL de la imagen es obligatoria';
    } else if (!/^https?:\/\/.+\..+/.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Debe ser una URL válida (http:// o https://)';
    }
    
    if (!formData.synopsis.trim()) {
      newErrors.synopsis = 'La sinopsis es obligatoria';
    } else if (formData.synopsis.length < 20) {
      newErrors.synopsis = 'La sinopsis debe tener al menos 20 caracteres';
    }
    
    if (formData.genres.length === 0) {
      newErrors.genres = 'Selecciona al menos un género';
    }
    
    if (formData.rating < 0 || formData.rating > 10) {
      newErrors.rating = 'La puntuación debe estar entre 0 y 10';
    }
    
    if (formData.seasonCount < 1) {
      newErrors.seasonCount = 'Debe tener al menos 1 temporada';
    }
    
    if (formData.episodeCount < 1) {
      newErrors.episodeCount = 'Debe tener al menos 1 episodio';
    }
    
    if (!formData.releaseYear || formData.releaseYear < 1950 || formData.releaseYear > new Date().getFullYear() + 1) {
      newErrors.releaseYear = `El año debe estar entre 1950 y ${new Date().getFullYear() + 1}`;
    }
    
    if (!formData.studio.trim()) {
      newErrors.studio = 'El estudio es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor corrige los errores del formulario');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const result = await updateAnime(id, formData);
      if (result) {
        toast.success('Anime actualizado correctamente');
        navigate(`/animes/${id}`);
      }
    } catch (error) {
      console.error('Error al actualizar anime:', error);
      toast.error('Ocurrió un error al actualizar el anime');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Anime: {formData.title}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Nombre del anime"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          
          {/* URL de la imagen */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="imageUrl">
              URL de la imagen <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
          </div>
          
          {/* Géneros */}
          <div>
            <label className="block text-gray-700 mb-2">
              Géneros <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {genreOptions.map(genre => (
                <div key={genre} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`genre-${genre}`}
                    value={genre}
                    checked={formData.genres.includes(genre)}
                    onChange={handleGenreChange}
                    className="mr-2"
                  />
                  <label htmlFor={`genre-${genre}`}>{genre}</label>
                </div>
              ))}
            </div>
            {errors.genres && <p className="text-red-500 text-sm mt-1">{errors.genres}</p>}
          </div>
          
          {/* Sinopsis */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="synopsis">
              Sinopsis <span className="text-red-500">*</span>
            </label>
            <textarea
              id="synopsis"
              name="synopsis"
              value={formData.synopsis}
              onChange={handleChange}
              rows="4"
              className={`w-full p-2 border rounded-md ${errors.synopsis ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Descripción del anime..."
            ></textarea>
            {errors.synopsis && <p className="text-red-500 text-sm mt-1">{errors.synopsis}</p>}
          </div>
          
          {/* Fila con múltiples campos numéricos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rating */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="rating">
                Puntuación (0-10) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="0"
                max="10"
                step="0.1"
                value={formData.rating}
                onChange={handleNumberChange}
                className={`w-full p-2 border rounded-md ${errors.rating ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
            </div>
            
            {/* Año de lanzamiento */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="releaseYear">
                Año de lanzamiento <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="releaseYear"
                name="releaseYear"
                min="1950"
                max={new Date().getFullYear() + 1}
                value={formData.releaseYear}
                onChange={handleNumberChange}
                className={`w-full p-2 border rounded-md ${errors.releaseYear ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.releaseYear && <p className="text-red-500 text-sm mt-1">{errors.releaseYear}</p>}
            </div>
            
            {/* Temporadas */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="seasonCount">
                Número de temporadas <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="seasonCount"
                name="seasonCount"
                min="1"
                value={formData.seasonCount}
                onChange={handleNumberChange}
                className={`w-full p-2 border rounded-md ${errors.seasonCount ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.seasonCount && <p className="text-red-500 text-sm mt-1">{errors.seasonCount}</p>}
            </div>
            
            {/* Episodios */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="episodeCount">
                Número de episodios <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="episodeCount"
                name="episodeCount"
                min="1"
                value={formData.episodeCount}
                onChange={handleNumberChange}
                className={`w-full p-2 border rounded-md ${errors.episodeCount ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.episodeCount && <p className="text-red-500 text-sm mt-1">{errors.episodeCount}</p>}
            </div>
          </div>
          
          {/* Fila con estudio y estado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Estudio */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="studio">
                Estudio <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="studio"
                name="studio"
                value={formData.studio}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.studio ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nombre del estudio"
              />
              {errors.studio && <p className="text-red-500 text-sm mt-1">{errors.studio}</p>}
            </div>
            
            {/* Estado */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="status">
                Estado <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="En emisión">En emisión</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Anunciado">Anunciado</option>
                <option value="Pausado">Pausado</option>
              </select>
            </div>
          </div>
          
          {/* Botones */}
          <div className="flex justify-between pt-4">
            <Link 
              to={`/animes/${id}`} 
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
            >
              Cancelar
            </Link>
            <button 
              type="submit" 
              className={`bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={submitting}
            >
              {submitting ? 'Guardando...' : 'Actualizar Anime'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimeEdit;