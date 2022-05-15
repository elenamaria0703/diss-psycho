import {Storage} from "@capacitor/storage";
import {Student, Teacher} from "../shared/Entities";
import {sendRequest} from "../shared/RestApi";

const baseUrl = 'http://localhost:8080/teacher';

const getStudentsStorage = async() => {
    const studsValue = await Storage.get({key: "students"});
    if (studsValue !== undefined && typeof studsValue.value === "string") {
        const studs: Array<Student> = (JSON.parse(studsValue.value) as Array<Student>);
        return studs;
    }
    return [];
}

export const getStudents: () => Promise<Array<Student> | undefined> = async () => {
    const id = await Storage.get({key: "id"});
    if(id.value === null) return new Promise<Array<Student>>((resolve, reject) => resolve([]));
    var students = await getStudentsStorage();
    students = students.filter(student => student.coordinator_id !== undefined && student.coordinator_id === Number(id.value));
    return new Promise<Array<Student>>((resolve, reject) => resolve(students));
    // return await sendRequest('get', `${baseUrl}/students`, null).then(res => res.data);
}