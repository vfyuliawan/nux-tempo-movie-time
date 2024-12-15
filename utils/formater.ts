import { GeneralEnum } from "~/types/generalEnum";

export const formatRating = (rating: number): string => rating.toFixed(1);

export const formatingYears = (date: Date): string => date.toString() === "" ? "-": date.toString().split("-")[0];



export const getGenreString = async() =>{
    const genreData = await getLocalStorage(GeneralEnum.genres)
    // console.log(genreData);
}
