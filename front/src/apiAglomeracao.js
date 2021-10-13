import axios from 'axios';

export default axios.create({
  baseURL: 'https://aglomerados-aval-back.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
