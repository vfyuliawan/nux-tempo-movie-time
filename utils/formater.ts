import { GeneralEnum } from "~/types/generalEnum";

export const formatRating = (rating: number): string => rating.toFixed(1);


export const getGenreString = async() =>{
    const genreData = await getLocalStorage(GeneralEnum.genres)
    // console.log(genreData);
}
