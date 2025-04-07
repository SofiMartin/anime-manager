// src/Router/AppRouter.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Páginas
import Home from '../pages/Home';
import AnimeList from '../pages/AnimeList';
import AnimeDetail from '../pages/AnimeDetail';
import AnimeCreate from '../pages/AnimeCreate';
import AnimeEdit from '../pages/AnimeEdit';
import NotFound from '../pages/NotFound';

// Componentes
import Navbar from '../components/Navbar';

// Contexto
import { AnimeProvider } from '../context/AnimeContext';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AnimeProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/animes" element={<AnimeList />} />
              <Route path="/animes/:id" element={<AnimeDetail />} />
              <Route path="/animes/create" element={<AnimeCreate />} />
              <Route path="/animes/:id/edit" element={<AnimeEdit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 text-center">
              <p>Anime Manager &copy; {new Date().getFullYear()} - CRUD App con React</p>
              <p className="text-gray-400 text-sm mt-2">
                Desarrollado con React + Vite + TailwindCSS + MockAPI
              </p>
            </div>
          </footer>
        </div>
        
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AnimeProvider>
    </BrowserRouter>
  );
};

export default AppRouter;