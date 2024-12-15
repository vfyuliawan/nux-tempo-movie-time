import { GeneralEnum } from "~/types/generalEnum";

export const formatRating = (rating: number): string => rating.toFixed(1);

export const formatingYears = (date: Date): string => date.toString() === "" ? "-": date.toString().split("-")[0];

export const formatCurrency=(number:number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0, 
    }).format(number).replace('$', '$');
  }


  export const formaterLanguage = (lang: string) => {
    if (lang === "en") {
      return "English";
    } else if (lang === "zh") {
      return "Chinese";
    } else if (lang === "es") {
      return "Spanish";
    } else if (lang === "fr") {
      return "French";
    } else if (lang === "de") {
      return "German";
    } else if (lang === "it") {
      return "Italian";
    } else if (lang === "pt") {
      return "Portuguese";
    } else if (lang === "ja") {
      return "Japanese";
    } else if (lang === "ko") {
      return "Korean";
    } else if (lang === "ru") {
      return "Russian";
    } else if (lang === "ar") {
      return "Arabic";
    } else if (lang === "hi") {
      return "Hindi";
    } else if (lang === "id") {
      return "Indonesian";
    } else {
      return "Unknown Language"; 
    }
  };

  export const formatterDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  export const truncateText = (text: string, length: number) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

export const getGenreString = async() =>{
    const genreData = await getLocalStorage(GeneralEnum.genres)
}
