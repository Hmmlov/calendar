import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const {VITE_API_URL} = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

// Todo: configurar interceptores, si no tenemos ningún token el backend regresa que no esta autenticado
calendarApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token' : localStorage.getItem('token')
    }
    
    return config;
} )


export default calendarApi;