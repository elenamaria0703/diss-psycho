import axios from 'axios';

const baseUrl = 'http://localhost:8080/student';
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const getCoordinators: () => Promise<any> = async () => {
    return await axios.get(`${baseUrl}/teachers`,  config).then(res => res.data);
}
