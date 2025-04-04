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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : movies ? (
        <ul className="bg-white p-4 rounded-lg shadow-lg">
          {movies.map((movie) => (
            <li key={movie.id} className="border-b last:border-none p-2">
              <h2>{movie.title}</h2>
              <div className="w-2/3 m-5">
                <img src={movie.image} alt={movie.title} width={200} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
};

export default MoviesPage;
