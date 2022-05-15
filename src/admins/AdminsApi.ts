import {Storage} from "@capacitor/storage";
import {Student, Teacher} from "../shared/Entities";
import {sendRequest} from "../shared/RestApi";

const baseUrl = 'http://localhost:8080/admin';

const getStudentsStorage = async() => {
    const studsValue = await Storage.get({key: "students"});
    if (studsValue !== undefined && typeof studsValue.value === "string") {
        const studs: Array<Student> = (JSON.parse(studsValue.value) as Array<Student>);
        return studs;
    }
    return [];
}

const getTeachersStorage = async() => {
    const teachersValue = await Storage.get({key: "teachers"});
    if (teachersValue !== undefined && typeof teachersValue.value === "string") {
        const teachers: Array<Student> = (JSON.parse(teachersValue.value) as Array<Teacher>);
        return teachers;
    }
    return [];
}

export const getStudents: () => Promise<Array<Student> | undefined> = async () => {
    const students = await getStudentsStorage();
    return new Promise<Array<Student>>((resolve, reject) => resolve(students));
    // return await sendRequest('get', `${baseUrl}/students`, null).then(res => res.data);
}

export const getTeachers: () => Promise<Array<Teacher>> | undefined = async () => {
    const teachers = await getTeachersStorage();
    return new Promise<Array<Teacher>>((resolve, reject) => resolve(teachers));
    // return await sendRequest('get', `${baseUrl}/teachers`, null).then(res => res.data);
}

export const addStudent: (student: Student) => Promise<Student> | undefined = async (student) => {
    const students = await getStudentsStorage();
    students.push(student);
    await Storage.set({key: "students", value: JSON.stringify(students)});
    return new Promise<Student>((resolve, reject) => resolve(student));
    // return await sendRequest('post', `${baseUrl}/student/new`, {student}).then(res => res.data);
}

export const addTeacher: (teacher: Teacher) => Promise<Teacher> | undefined = async (teacher) => {
    const teachers = await getTeachersStorage();
    teachers.push(teacher);
    await Storage.set({key: "teachers", value: JSON.stringify(teachers)});
    return new Promise<Teacher>((resolve, reject) => resolve(teacher));
    // return await sendRequest('post', `${baseUrl}/teacher/new`, {teacher}).then(res => res.data);
}

export const updateStudent: (student: Student) => Promise<Student> | undefined = async (student) => {
    const students = await getStudentsStorage();
    students.map((s, i) => {
        if(student !== null && s.id === student.id) students[i] = student;
    });
    await Storage.set({key: "students", value: JSON.stringify(students)});
    return new Promise<Student>((resolve, reject) => resolve(student));
    // return await sendRequest('put', `${baseUrl}/student/${student.id}`, {student}).then(res => res.data);
}

export const updateTeacher: (teacher: Teacher) => Promise<Teacher> | undefined = async (teacher) => {
    const teachers = await getTeachersStorage();
    teachers.map((t, i) => {
        if(teacher !== null && t.id === teacher.id) teachers[i] = teacher;
    });
    await Storage.set({key: "teachers", value: JSON.stringify(teachers)});
    return new Promise<Student>((resolve, reject) => resolve(teacher));
    // return await sendRequest('post', `${baseUrl}/teacher/${teacher.id}`, {teacher}).then(res => res.data);
}
