// URL base de Strapi en producción (Render)
const PROD_URL = "https://strapibackend-47t6.onrender.com/api/";


// URL base en desarrollo (localhost)
const DEV_URL = "http://localhost:1337/api/";


// Toma primero la variable STRAPI_API_URL, si no existe, usa PROD o DEV según entorno
export const STRAPI_URL =
   import.meta.env.STRAPI_API_URL ||
   (import.meta.env.DEV ? DEV_URL : PROD_URL);


// URL base para imágenes (sin /api/)
export const STRAPI_BASE_URL = STRAPI_URL.replace("/api/", "");
export const STRAPI_URL_IMAGES = STRAPI_BASE_URL;


export const fetchFromAPI = async (slug: string) => {
   try {
       const url = `${STRAPI_URL}${slug}?populate=*`;
       console.log("Fetching URL:", url);


       const response = await fetch(url);
       const json = await response.json();


       console.log("Response status:", response.status);
       console.log("Response data:", json);


       if (!response.ok) {
           throw new Error(
               `HTTP ${response.status}: ${
                   json.error?.message || json.message || "Error desconocido"
               }`
           );
       }

       return json.data;
   } catch (error) {
       console.error("Error en fetchFromAPI:", error);
       console.error("URL intentada:", `${STRAPI_URL}${slug}?populate=*`);


       // No romper la página
       return null;
   }
};
