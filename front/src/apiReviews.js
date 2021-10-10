import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3040/',
  headers: {
    'Content-Type': 'application/json',
  },
});
