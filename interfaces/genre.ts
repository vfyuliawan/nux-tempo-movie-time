
export interface GenreInterface {
    genres: Genre[];
}

export interface Genre {
    id:   number;
    name: string;
    isActive?: boolean
}

export class ConvertGenreInterface {
    public static toGenreInterface(json: string): GenreInterface {
        return JSON.parse(json);
    }

    public static genreInterfaceToJson(value: GenreInterface): string {
        return JSON.stringify(value);
    }
}
