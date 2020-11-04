import axios from 'axios';
import Environment from '../helpers/Environment';
const env = Environment[process.env.NODE_ENV || 'development'];

const http = axios.create({
    baseURL:`${env.api}`
});

export default http;