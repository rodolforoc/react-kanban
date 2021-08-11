import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.15.15:9000',
});