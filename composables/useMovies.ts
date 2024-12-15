import type { AddFavoriteMovie } from "~/interfaces/addFavoriteMovie";
import {  fetchDetailMovie, fetchDiscoverMovie, fetchFavoriteMovie, fetchMovieGenres, fetchRecomendationMovies, fetchReviewsMovie, fetchSearchMovie, fetchTrandingMovie, postFavoriteMovie } from "~/services/tmdbService";

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


  const addFavoriteMovie = async (body: AddFavoriteMovie) =>{
    const result = await postFavoriteMovie(body)
    return result;
  }

  const getFavoriteMovie = async () =>{
    const result = await fetchFavoriteMovie()
    return result;
  }


  const getSearchMovie = async (params:{title: string, page: number}) =>{
    const result = await fetchSearchMovie({page: params.page, title: params.title})
    return result;
  }

  const getDetailMovie = async(params:{movieId : string}) => await fetchDetailMovie(params.movieId);


   const getReviewsMovie = async (params:{page: number, movieId: string}) =>{
    const result = await fetchReviewsMovie({movieId: params.movieId, page: params.page})
    return result
  }

  const getRecomendationMovies = async(params:{page: number, movieId: string}) => await fetchRecomendationMovies({movieId:params.movieId, page:params.page});


  return {  getMovieGenres, getTrandingMovie , getDiscoverMovie, addFavoriteMovie, getFavoriteMovie, getSearchMovie, getDetailMovie, getReviewsMovie, getRecomendationMovies};
};
