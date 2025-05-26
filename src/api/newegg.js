// import axios from 'axios';

// const API_KEY = 'TU_API_KEY'; // Reemplaza con tu RapidAPI Key

// const neweggApi = axios.create({
//   baseURL: 'https://newegg-products.p.rapidapi.com',
//   headers: {
//     'X-RapidAPI-Key': API_KEY,
//     'X-RapidAPI-Host': 'newegg-products.p.rapidapi.com'
//   }
// });

// // Obtener productos por categoría (ej: "video-cards")
// export const getProductsByCategory = async (category) => {
//   try {
//     const response = await neweggApi.get(`/products`, {
//       params: { category, pageSize: 20 }
//     });
//     return response.data.products;
//   } catch (error) {
//     console.error('Error fetching Newegg products:', error);
//     return []; // Retorna array vacío si hay error
//   }
// };

// // Categorías disponibles en Newegg
// export const categories = [
//   { id: 'video-cards', name: 'Tarjetas Gráficas' },
//   { id: 'processors', name: 'Procesadores' },
//   { id: 'memory', name: 'Memorias RAM' },
//   { id: 'internal-hard-drives', name: 'Discos Duros' },
//   { id: 'notebooks', name: 'Laptops' }
// ];