import axios from 'axios';

const baseUrl = 'localhost:8080';
const authUrl = `http://${baseUrl}/api/auth`;
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export interface AuthProps {
    token: string;
    role: string;
    name: string;
}

export const login: (email?: string, password?: string) => Promise<AuthProps> = (email, password) => {
    return axios.post(`${authUrl}/login`, { email, password }, config);
}