import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../../store";
import {useAppSelector} from "../../hooks";

// Slice
export interface Student {
    id: string,
    name: string,
    email: string,
    work?: StudentWork[]
}

export interface StudentWork{
    id: string,
    description: string,
    feedback: string,
    submission_date: Date
}
interface coordinatorsSliceState {
    students: Array<Student>,
    searchedStudent: string
}

const initialState: coordinatorsSliceState = {
    students:  [{
        id: '1',
        name: "Test1 student",
        email: "test@student.com"
    },
    {
        id: '2',
        name: "Test2 student",
        email: "test@student.com",
        work: [
            {
                id: '1',
                description: 'Tema mea',
                feedback: '',
                submission_date: new Date()
            }
        ]
    },
    {
        id: '3',
        name: "Test3 student",
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
        }
    },
});

export default coordinatorsSideStudentSlice.reducer

// Actions
export const { searchChanged } = coordinatorsSideStudentSlice.actions

export const searchChange = (search : string) => (dispatch: AppDispatch) => {
   dispatch(searchChanged(search));
}