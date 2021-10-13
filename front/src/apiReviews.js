import axios from 'axios';

export default axios.create({
  baseURL: 'https://aglomerados-avaliacoes.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
