import axios from 'axios';

const api = axios.create({
  baseURL: 'https://g5e8ju8bfl.execute-api.sa-east-1.amazonaws.com/Prod/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 