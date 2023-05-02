import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    run();
  }, []);
  const run = async () => {
    const fetchData = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=a6af80b02b99c9fae32ba3c9259d4844&language=en-US&page=1"
    );
    const { results } = await fetchData.json();
    setMovies(results);
  };
  return (
    <div className="py-2">
      <h2 className=" text-[#FFEAEA] text-2xl font-bold py-3">Popular</h2>
      <div
        style={{ scrollBehavior: "smooth" }}
        className=" flex justify-between overflow-scroll gap-5"
      >
        {movies?.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
