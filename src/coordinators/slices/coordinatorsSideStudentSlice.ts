import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch} from "../../store";
import {Student} from "../../shared/Entities";
import {getStudents} from "../TeacherApi";

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
interface coordinatorsSliceState {
    students: Array<Student>,
    searchedStudent: string
}

const initialState: coordinatorsSliceState = {
    students:  [{
        id: 1,
        first_name: "Test1",
        last_name: "Test1 student",
        email: "test@student.com"
    },
    {
        id: 2,
        first_name: "Test2",
        last_name: "Test2 student",
        email: "test@student.com",
        work: [
            {
                id: '1',
                description: 'Tema mea',
                feedback: '',
                submission_date: new Date().toDateString()
            },
            {
                id: '1',
                description: 'Tema mea',
                feedback: 'Foarte buna treaba!',
                submission_date: new Date().toDateString()
            }
        ]
    },
    {
        id: 3,
        first_name: "Test3",
        last_name: "Test3 student",
        email: "test@student.com"
    }],
    searchedStudent: ''
}

const coordinatorsSideStudentSlice = createSlice({
    name: 'coordinatorsSlice',
    initialState,
    reducers: {
        searchChanged: (state, action: PayloadAction<string>) => {
            state.searchedStudent = action.payload
        },
        fetchStudents: (state, action: PayloadAction<Array<Student>>) => {
            state.students = action.payload;
        }
    },
});

export default coordinatorsSideStudentSlice.reducer

// Actions
export const { searchChanged, fetchStudents } = coordinatorsSideStudentSlice.actions

export const searchChange = (search : string) => (dispatch: AppDispatch) => {
   dispatch(searchChanged(search));
}

export const fetchStudentDispatch = () => async (dispatch: AppDispatch) => {
    const studs: Array<Student> | undefined = await getStudents();
    if (studs !== undefined) dispatch(fetchStudents(studs));
}