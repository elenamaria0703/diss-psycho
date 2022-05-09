import axios from 'axios';

const baseUrl = 'localhost:8080';
const authUrl = `http://${baseUrl}/login`;
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export interface AuthProps {
    role: string;
    name: string;
    token: string;
}

export const login: (email?: string, password?: string) => Promise<AuthProps> = async (email, password) => {
    return await axios.post(`${authUrl}`, { email, password }, config).then(res => res.data);
}
