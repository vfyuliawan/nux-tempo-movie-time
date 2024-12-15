// To parse this data:
//
//   import { Convert, GenreInterface } from "./file";
//
//   const genreInterface = Convert.toGenreInterface(json);

export interface GenreInterface {
    genres: Genre[];
}

export interface Genre {
    id:   number;
    name: string;
    isActive?: boolean
}

// Converts JSON strings to/from your types
export class ConvertGenreInterface {
    public static toGenreInterface(json: string): GenreInterface {
        return JSON.parse(json);
    }

    public static genreInterfaceToJson(value: GenreInterface): string {
        return JSON.stringify(value);
    }
}
