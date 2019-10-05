import axios from 'axios';
import { processRequest, processResponse } from './token';
import { BASE_URL } from '../constants/Api';

export const myAxios = () => {
    const axiosInstance = axios.create({ baseURL: BASE_URL });
    axiosInstance.interceptors.request.use(processRequest);
    axiosInstance.interceptors.response.use(processResponse);
    return axiosInstance;
}
