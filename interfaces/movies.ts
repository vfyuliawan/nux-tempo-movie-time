// To parse this data:
//
//   import { Convert, Movies } from "./file";
//
//   const movies = Convert.toMovies(json);

export interface MoviesInterface {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Result {
    backdrop_path:     string;
    id:                number;
    title:             string;
    original_title:    string;
    overview:          string;
    poster_path:       string;
    media_type:        MediaType;
    adult:             boolean;
    original_language: OriginalLanguage;
    genre_ids:         number[];
    popularity:        number;
    release_date:      Date;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export enum MediaType {
    Movie = "movie",
}

export enum OriginalLanguage {
    En = "en",
    Zh = "zh",
}

// Converts JSON strings to/from your types
export class ConvertMoviesInterface {
    public static toMovies(json: string): MoviesInterface {
        return JSON.parse(json);
    }

    public static moviesToJson(value: MoviesInterface): string {
        return JSON.stringify(value);
    }
}
