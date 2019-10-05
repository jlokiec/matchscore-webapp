import { AxiosResponse, AxiosRequestConfig } from 'axios';

const TOKEN_KEY = 'JWT';
const TOKEN_PREFIX = 'Bearer ';

export const saveToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const getTokenFromResponse = (response: AxiosResponse): string | null => {
    if (response.headers.authorization) {
        const token: string = response.headers.authorization;
        return token.replace(TOKEN_PREFIX, '');
    } else {
        return null;
    }
}

export const processResponse = (response: AxiosResponse) => {
    const token = getTokenFromResponse(response)

    if (token) {
        saveToken(token);
    }

    return response;
}

export const processRequest = (request: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
        request.headers = {
            ...request.headers,
            authorization: getToken()
        };
    }

    return request;
}
