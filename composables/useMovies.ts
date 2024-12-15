import {  fetchDiscoverMovie, fetchMovieGenres, fetchTrandingMovie } from "~/services/tmdbService";

export const useMovies = () => {

  const getMovieGenres = async () => {
    const result = await fetchMovieGenres();
    return result;
  };


  const getTrandingMovie = async () =>{
    const result = await fetchTrandingMovie();
    return result
  }


  const getDiscoverMovie = async (params: {
    page: string;
    sort_by: string;
    genre: string;
}) =>{
    const result = await fetchDiscoverMovie({genre:params.genre, page:params.page, sort_by:params.sort_by});
    return result
  }

  return {  getMovieGenres, getTrandingMovie , getDiscoverMovie};
};
