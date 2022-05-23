import axios from 'axios';
import {Storage} from "@capacitor/storage";
import {sendRequest} from "../shared/RestApi";
import {Student, Teacher} from "../shared/Entities";
import { CoordRequest } from './slices/studentsSideCoordinatorSlice';

const baseUrl = 'http://localhost:8080/student';

// var config = {
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': '',
//         'Access-Control-Expose-Headers': 'Authorization'
//     }
// };
//
// const authorizeRequest = async() => {
//     const token = await Storage.get({key: "token"});
//     config.headers.Authorization = `Bearer ${token.value}`;
// }
const getStudentsStorage = async() => {
    const studsValue = await Storage.get({key: "students"});
    if (studsValue !== undefined && typeof studsValue.value === "string") {
        const studs: Array<Student> = (JSON.parse(studsValue.value) as Array<Student>);
        return studs;
    }
    return [];
}

export const getCoordinatorId = async() => {
    const id = await Storage.get({key: "id"});
    if(id.value !== null){
        const students = await getStudentsStorage();
        const student = students.find(s => s.id === Number(id.value));
        return student?.coordinator_id;
    }
    return;
}

const getTeachersStorage = async() => {
    const teachersValue = await Storage.get({key: "teachers"});
    if (teachersValue !== undefined && typeof teachersValue.value === "string") {
        const teachers: Array<Teacher> = (JSON.parse(teachersValue.value) as Array<Teacher>);
        return teachers;
    }
    return [];
}

const getRequestsStorage = async() =>{
    const requestsValue = await Storage.get({key: "requests"});
    if (requestsValue !== undefined && typeof requestsValue.value === "string") {
        const requests: Array<CoordRequest> = (JSON.parse(requestsValue.value) as Array<CoordRequest>);
        return requests;
    }
    return [];
}

export const getCoordinators: () => Promise<any> = async () => {
    const teachers = await getTeachersStorage();
    return new Promise<Array<Teacher>>((resolve, reject) => resolve(teachers));
    // return await sendRequest('get', `${baseUrl}/teachers`, null).then(res => res.data);
    // await authorizeRequest();
    // return await axios.get(`${baseUrl}/teachers`,  config).then(res => res.data);
}

export const addRequestStorage: (request: CoordRequest) => Promise<CoordRequest> | undefined = async (request) => {
    const requests = await getRequestsStorage();
    requests.push(request);
    await Storage.set({key: "requests", value: JSON.stringify(requests)});
    return new Promise<CoordRequest>((resolve, reject) => resolve(request));
    // return await sendRequest('post', `${baseUrl}/teacher/new`, {teacher}).then(res => res.data);
}