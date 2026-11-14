
const API_URL = "https://scraper.iguzman.com.mx/search"

export const searchService = {
    async searchTerms() {
        try {
            const response = await fetch(API_URL);


        } catch (error) {
            console.error("Error al obtener los términos de búsqueda:", error);
            return [];
        }

    }

}