

export interface AddFavoriteMovie {
    media_type: string;
    media_id:   number;
    favorite:   boolean;
}

export class ConvertAddFavoriteMovie {
    public static toAddFavoriteMovie(json: string): AddFavoriteMovie {
        return JSON.parse(json);
    }

    public static addFavoriteMovieToJson(value: AddFavoriteMovie): string {
        return JSON.stringify(value);
    }
}
