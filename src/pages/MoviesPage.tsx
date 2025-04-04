import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  image: string;
}

const MoviesPage = () => {
  const { token } = useParams<{ token: string }>();
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://movies-qrcode-api.onrender.com/movies/${token}`);
        setMovies(response.data.movies);
      } catch (err) {
        setError("Invalid or expired QR Code.");
      }
    };

    fetchMovies();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Movie List</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : movies ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white p-4 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
              <div className="flex justify-center items-center">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-56 object-cover rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Loading movies...</p>
      )}
    </div>
  );
};

export default MoviesPage;
