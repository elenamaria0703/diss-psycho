import {Storage} from "@capacitor/storage";
import axios from "axios";

var config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': '',
        'Access-Control-Expose-Headers': 'Authorization'
    }
};

const authorizeRequest = async() => {
    const token = await Storage.get({key: "token"});
    config.headers.Authorization = `Bearer ${token.value}`;
}

export const sendRequest : (httpMethod: string, httpUrl: string, data: any) => Promise<any> = async (httpMethod, httpUrl, data) => {
    await authorizeRequest();
    if(httpMethod === 'get') return await axios.get(httpUrl,  config);
    else if(httpMethod === 'post') return await axios.post(httpUrl, data, config);
    else if(httpMethod === 'put') return await axios.put(httpUrl, data, config);
};