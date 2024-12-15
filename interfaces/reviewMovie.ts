

export interface ReviewsMovieInterface {
    id:            number;
    page:          number;
    results:       ResultReview[];
    total_pages:   number;
    total_results: number;
}

export interface ResultReview {
    author:         string;
    author_details: AuthorDetails;
    content:        string;
    created_at:     Date;
    id:             string;
    updated_at:     Date;
    url:            string;
}

export interface AuthorDetails {
    name:        string;
    username:    string;
    avatar_path: null | string;
    rating:      number | null;
}

export class ConvertReviewsMovieInterface {
    public static toReviewsMovieInterface(json: string): ReviewsMovieInterface {
        return JSON.parse(json);
    }

    public static reviewsMovieInterfaceToJson(value: ReviewsMovieInterface): string {
        return JSON.stringify(value);
    }
}
