import {Storage} from "@capacitor/storage";
import {Student, Teacher} from "../shared/Entities";
import {sendRequest} from "../shared/RestApi";
import { CoordRequest } from "../students/slices/studentsSideCoordinatorSlice";

const baseUrl = 'http://localhost:8080/teacher';

const getStudentsStorage = async() => {
    const studsValue = await Storage.get({key: "students"});
    if (studsValue !== undefined && typeof studsValue.value === "string") {
        const studs: Array<Student> = (JSON.parse(studsValue.value) as Array<Student>);
        return studs;
    }
    return [];
}
export const getAllStudents: () => Promise<Array<Student> | undefined> = async () => {
    var students = await getStudentsStorage();
    return new Promise<Array<Student>>((resolve, reject) => resolve(students));
    // return await sendRequest('get', `${baseUrl}/students`, null).then(res => res.data);
}

export const getStudents: () => Promise<Array<Student> | undefined> = async () => {
    const id = await Storage.get({key: "id"});
    if(id.value === null) return new Promise<Array<Student>>((resolve, reject) => resolve([]));
    var students = await getStudentsStorage();
    students = students.filter(student => student.coordinator_id !== undefined && student.coordinator_id === Number(id.value));
    return new Promise<Array<Student>>((resolve, reject) => resolve(students));
    // return await sendRequest('get', `${baseUrl}/students`, null).then(res => res.data);
}

export const getRequestsStorage = async() =>{
    const requestsValue = await Storage.get({key: "requests"});
    if (requestsValue !== undefined && typeof requestsValue.value === "string") {
        const requests: Array<CoordRequest> = (JSON.parse(requestsValue.value) as Array<CoordRequest>);
        return requests;
    }
    return [];
}

export const removeAcceptedRequest = async (id: string) =>{
    const requests = await getRequestsStorage();
    const idx = requests.findIndex(req => req.id === id)
    const request = requests.at(idx)
    let new_requests = requests.slice(0,idx).concat(requests.slice(idx+1, requests.length))
    if (request !== undefined)
        new_requests = new_requests.filter(req => req.stud_id !== request.stud_id)
    await Storage.set({key: "requests", value: JSON.stringify(new_requests)});

    const coord_id = await Storage.get({key: "id"})
    return new_requests.filter( req => req.coord_id === coord_id.value)
}