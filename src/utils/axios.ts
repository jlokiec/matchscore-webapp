import axios from 'axios';
import { processRequest, processResponse } from './token';

export const myAxios = () => {
    const axiosInstance = axios.create({});
    axiosInstance.interceptors.request.use(processRequest);
    axiosInstance.interceptors.response.use(processResponse);
    return axiosInstance;
}
