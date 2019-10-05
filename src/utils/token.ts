import { AxiosResponse, AxiosRequestConfig } from 'axios';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'JWT';
const TOKEN_PREFIX = 'Bearer ';

export interface Jwt {
    iss: string,
    aud: string,
    sub: string,
    exp: number,
    roles: Array<string>
}

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

export const decodeJwt = (token: string) => {
    return (jwt_decode(token) as Jwt);
}

export const getUsername = (decodedToken: Jwt) => {
    return decodedToken.sub;
}

export const getIsAdmin = (decodedToken: Jwt) => {
    return decodedToken.roles.includes('ROLE_ADMIN');
}

export const getIsUser = (decodedToken: Jwt) => {
    return decodedToken.roles.includes('ROLE_USER');
}

export const isTokenValid = (decodedToken: Jwt) => {
    return new Date().getUTCMilliseconds() < decodedToken.exp;
}
