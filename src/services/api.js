import axios from 'axios';

//https://api.themoviedb.org/3/movie/now_playing?api_key=05061f91256dc501894f6258a156ee74&language=pt-BR&page=1

export const key = '05061f91256dc501894f6258a156ee74';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default api;
