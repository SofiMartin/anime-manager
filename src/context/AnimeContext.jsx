import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://67f307feec56ec1a36d4c5d3.mockapi.io/api/:endpoint';

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/animes`);
      setAnimes(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los animes');
      toast.error('No se pudieron cargar los animes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getAnimeById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/animes/${id}`);
      return response.data;
    } catch (err) {
      toast.error('Error al obtener el anime');
      console.error(err);
      return null;
    }
  };

  const createAnime = async (animeData) => {
    try {
      const response = await axios.post(`${API_URL}/animes`, animeData);
      setAnimes([...animes, response.data]);
      toast.success('Anime agregado con éxito');
      return response.data;
    } catch (err) {
      toast.error('Error al crear el anime');
      console.error(err);
      return null;
    }
  };

  const updateAnime = async (id, animeData) => {
    try {
      const response = await axios.put(`${API_URL}/animes/${id}`, animeData);
      setAnimes(animes.map(anime => anime.id === id ? response.data : anime));
      toast.success('Anime actualizado con éxito');
      return response.data;
    } catch (err) {
      toast.error('Error al actualizar el anime');
      console.error(err);
      return null;
    }
  };

  const deleteAnime = async (id) => {
    try {
      await axios.delete(`${API_URL}/animes/${id}`);
      setAnimes(animes.filter(anime => anime.id !== id));
      toast.success('Anime eliminado con éxito');
      return true;
    } catch (err) {
      toast.error('Error al eliminar el anime');
      console.error(err);
      return false;
    }
  };

  const value = {
    animes,
    loading,
    error,
    fetchAnimes,
    getAnimeById,
    createAnime,
    updateAnime,
    deleteAnime
  };

  return (
    <AnimeContext.Provider value={value}>
      {children}
    </AnimeContext.Provider>
  );
};