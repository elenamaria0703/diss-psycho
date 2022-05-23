import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch} from "../../store";
import {Student, StudentWork} from "../../shared/Entities";
import {getStudents, getRequestsStorage, getAllStudents, removeAcceptedRequest} from "../TeacherApi";
import { CoordRequest } from '../../students/slices/studentsSideCoordinatorSlice';
import { updateStudent } from '../../admins/AdminsApi';
import {wait} from "@testing-library/user-event/dist/utils";

// Slice
// export interface Student {
//     id: string,
//     name: string,
//     email: string,
//     work?: StudentWork[]
// }
//
// export interface StudentWork{
//     id: string,
//     description: string,
//     feedback: string,
//     // submission_date: Date
//     submission_date: string
// }

const studentAssignments: Array<StudentWork> = [
    {id: "1", description: "Documentarea conceptelor teoretice din lucrarea de licență în baza de date/ surse științifice, academice ", feedback: "", submission_date: "12.04.2022"},
    {id: "2", description: "Autonomie în identificarea și consultarea surselor științifice relevante pentru tema de licență ", feedback: "", submission_date: ""},
    {id: "3", description: "Răspunde la solicitările coordonatorului, în termenele stabilite de acesta. (ex. Trimite text elaborat pentru manuscrisul tezei de licență atunci când i se solicită.) ", feedback: "", submission_date: ""},
    {id: "4", description: "Integrează feedbackul coordonatorului, în termenele stabilite de acesta. ", feedback: "", submission_date: ""},
    {id: "5", description: "Participă la întâlnirile stabilite de coordonator, atunci când este cazul.  ", feedback: "", submission_date: ""}
]

interface coordinatorsSliceState {
    students: Array<Student>,
    allStudents: Array<Student>,
    searchedStudent: string,
    requests: Array<CoordRequest>
}

const initialState: coordinatorsSliceState = {
    students:  [],
    allStudents: [],
    searchedStudent: '',
    requests: []
}

const coordinatorsSideStudentSlice = createSlice({
    name: 'coordinatorsSlice',
    initialState,
    reducers: {
        searchChanged: (state, action: PayloadAction<string>) => {
            state.searchedStudent = action.payload
        },
        fetchStudents: (state, action: PayloadAction<Array<Student>>) => {
            const students = action.payload
            students.map(student => student.work = studentAssignments)
            state.students = students;
        },
        fetchRequests: (state, action: PayloadAction<Array<CoordRequest>>) => {
            state.requests = action.payload;
        },
        fetchAllStudents: (state, action: PayloadAction<Array<Student>>) => {
            state.allStudents = action.payload;
        }
    },
});

export default coordinatorsSideStudentSlice.reducer

// Actions
export const { searchChanged, fetchStudents, fetchRequests, fetchAllStudents } = coordinatorsSideStudentSlice.actions

export const searchChange = (search : string) => (dispatch: AppDispatch) => {
   dispatch(searchChanged(search));
}

export const fetchStudentDispatch = () => async (dispatch: AppDispatch) => {
    const studs: Array<Student> | undefined = await getStudents();
    if (studs !== undefined) dispatch(fetchStudents(studs));
}

export const fetchRequestsDispatch = (id: string) => async (dispatch: AppDispatch) => {
    const requests: Array<CoordRequest> | undefined = await getRequestsStorage();
    const coord_requests = requests.filter(request => request.coord_id === id)
    if (coord_requests !== undefined) dispatch(fetchRequests(coord_requests));
}

export const fetchAllStudentsDispatch = () => async (dispatch: AppDispatch) => {
    const studs: Array<Student> | undefined = await getAllStudents();
    if (studs !== undefined) dispatch(fetchAllStudents(studs));
}

export const acceptRequestDispatch = (req: CoordRequest) => async (dispatch: AppDispatch) => {
    const studs: Array<Student> | undefined = await getAllStudents();
    const req_stud = studs?.find(stud => stud.id.toString() == req.stud_id)
    console.log(req_stud)
    if (req_stud !== undefined){
        req_stud.coordinator_id = parseInt(req.coord_id)
        const studentUpdate = await updateStudent(req_stud);
        const new_requests = await removeAcceptedRequest(req.id);
        dispatch(fetchRequests(new_requests || []));

        dispatch(fetchStudentDispatch())
    }
        

}