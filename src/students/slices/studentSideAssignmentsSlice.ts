import {createSlice, PayloadAction} from '@reduxjs/toolkit'

// Slice
export interface Assignment {
    title: string,
    description: string,
    grade: number | null,
    feedback: string | null,
    gradedAt: string | null
}
interface studentsSliceState {
    assignments: Array<Assignment>,
    examGrade: number | null,
    reExamGrade: number | null
}

const initialState: studentsSliceState = {
    assignments: [
        {title: "Test", description: "Desc", grade: null, feedback: null, gradedAt: null},
        {title: "Test1", description: "Desc1", grade: 9, feedback: "Observatii aici", gradedAt: "12.04.2022"},
        {title: "Test1", description: "Desc1", grade: null, feedback: null, gradedAt: null},
        {title: "Test1", description: "Desc1", grade: null, feedback: null, gradedAt: null},
        {title: "Test1", description: "Desc1", grade: null, feedback: null, gradedAt: null}
    ],
    examGrade: 9.5,
    reExamGrade: null
}

const studentsSideAssignmentsSlice = createSlice({
    name: 'studentsAssignmentsSlice',
    initialState,
    reducers: {}
});

export default studentsSideAssignmentsSlice.reducer