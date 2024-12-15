import { ConvertGenreInterface, type Genre, type GenreInterface } from "~/interfaces/genre";
import type { MoviesInterface } from "~/interfaces/movies";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "47026bb4f35c8d526f38515060cd7126";
const ACCESSTOKEN = "Bearer Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzAyNmJiNGYzNWM4ZDUyNmYzODUxNTA2MGNkNzEyNiIsIm5iZiI6MTczMzg4NDI2Ni44Miwic3ViIjoiNjc1OGY5NmEyZDIwMGM4NGYxOTExMzc1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.pm6Fo4E5Ch7zcW1B99vYLLG8soFOXqXO5C2D9NnHAwI"

  
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

  