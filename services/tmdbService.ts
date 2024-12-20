import { ConvertGenreInterface, type Genre, type GenreInterface } from "~/interfaces/genre";
import { ConvertMoviesInterface, type MoviesInterface } from "~/interfaces/movies";
import { ConvertAddFavoriteMovie, type AddFavoriteMovie } from '../interfaces/addFavoriteMovie';
import type { DetailMovieInterface } from "~/interfaces/detailMovie";
import type { ReviewsMovieInterface } from "~/interfaces/reviewMovie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "47026bb4f35c8d526f38515060cd7126";
const ACCOUNTID = "21681596";
const ACCESSTOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzAyNmJiNGYzNWM4ZDUyNmYzODUxNTA2MGNkNzEyNiIsIm5iZiI6MTczMzg4NDI2Ni44Miwic3ViIjoiNjc1OGY5NmEyZDIwMGM4NGYxOTExMzc1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.pm6Fo4E5Ch7zcW1B99vYLLG8soFOXqXO5C2D9NnHAwI"

  
  export const fetchMovieGenres = async ():Promise<GenreInterface | null>=> {
    const response : GenreInterface  = await $fetch(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY },
      headers:{
        accept: 'application/json',
        Authorization: ACCESSTOKEN
      }
    });

    return response;
    
  };

  export const fetchTrandingMovie = async ():Promise<MoviesInterface | null>=> {
    const response : MoviesInterface  = await $fetch(`${BASE_URL}/trending/movie/day?language=en-US`, {
      params: { api_key: API_KEY },
      headers:{
        accept: 'application/json',
        Authorization: ACCESSTOKEN
      }
    });

    return response;
    
  };


  export const fetchDiscoverMovie = async (params:{page:string,sort_by: string, genre: string }):Promise<MoviesInterface | null>=> {
    const response : MoviesInterface  = await $fetch(`${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${params.page}&sort_by=${params.sort_by}&with_genres=${params.genre}`, {
      params: { api_key: API_KEY },
      headers:{
        accept: 'application/json',
        Authorization: ACCESSTOKEN
      }
    });
    return response;
  };


  export const fetchSearchMovie = async (params:{title: string , page:number}):Promise<MoviesInterface | null>=> {
    const response : MoviesInterface  = await $fetch(`${BASE_URL}/search/movie?query=${params.title}&include_adult=false&language=en-US&page=${params.page}&sort_by=popularity.desc`, {
      params: { api_key: API_KEY },
      headers:{
        accept: 'application/json',
        Authorization: ACCESSTOKEN
      }
    });
    return response;
  };


  export const postFavoriteMovie = async (body:AddFavoriteMovie) => {
    const response  = await $fetch(`${BASE_URL}/account/${ACCOUNTID}/favorite`, {
      method:"POST",
      params: { api_key: API_KEY },
      headers:{
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: ACCESSTOKEN
      },
      body: ConvertAddFavoriteMovie.addFavoriteMovieToJson(body)

    });
    return response;
  };


  export const fetchFavoriteMovie = async ():Promise<MoviesInterface | null> => {
    const response  : MoviesInterface  = await $fetch(`${BASE_URL}/account/${ACCOUNTID}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`, {
      method:"get",
      params: { api_key: API_KEY },
      headers:{
        accept: 'application/json',
        Authorization: ACCESSTOKEN
      },
    });
    return response;
  };


  export const fetchDetailMovie = async (movieId : string):Promise<DetailMovieInterface | null> => {
    const response  : DetailMovieInterface  = await $fetch(`${BASE_URL}/movie/${movieId}?language=en-US`, {
      method:"get",
      params: { api_key: API_KEY },
      headers:{
        accept: 'application/json',
        Authorization: ACCESSTOKEN
      },
    });
    return response;
  };


  export const fetchReviewsMovie = async (params:{page: number, movieId: string}):Promise<ReviewsMovieInterface | null> => {
    const response  : ReviewsMovieInterface  = await $fetch(`${BASE_URL}/movie/${params.movieId}/reviews?language=en-US&page=${params.page}`, {
      method:"get",
      params: { api_key: API_KEY },
      headers:{
        accept: 'application/json',
        Authorization: ACCESSTOKEN
      },
    });
    return response;
  };


  export const fetchRecomendationMovies = async (params:{page: number, movieId: string}):Promise<MoviesInterface | null> => {
    const response  : MoviesInterface  = await $fetch(`${BASE_URL}/movie/${params.movieId}/recommendations?language=en-US&page=${params.page}`, {
      method:"get",
      params: { api_key: API_KEY },
      headers:{
        accept: 'application/json',
        Authorization: ACCESSTOKEN
      },
    });
    return response;
  };

  