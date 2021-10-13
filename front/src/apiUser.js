import axios from 'axios';

export default axios.create({
  baseURL: 'https://aglomerados.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
