import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000, // Se o server não responder em 5s, cancela
});

export default api;