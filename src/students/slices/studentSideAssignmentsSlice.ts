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
        {title: "Tema 1", description: "Documentarea conceptelor teoretice din lucrarea de licență în baza de date/ surse științifice, academice ", grade: 9.2, feedback: "Te rog să detaliez mai mult în secțiunea 2.1", gradedAt: "12.04.2022"},
        {title: "Tema 2", description: "Autonomie în identificarea și consultarea surselor științifice relevante pentru tema de licență ", grade: null, feedback: null, gradedAt: null},
        {title: "Tema 3", description: "Răspunde la solicitările coordonatorului, în termenele stabilite de acesta. (ex. Trimite text elaborat pentru manuscrisul tezei de licență atunci când i se solicită.) ", grade: null, feedback: null, gradedAt: null},
        {title: "Tema 4", description: "Integrează feedbackul coordonatorului, în termenele stabilite de acesta. ", grade: null, feedback: null, gradedAt: null},
        {title: "Tema 5", description: "Participă la întâlnirile stabilite de coordonator, atunci când este cazul.  ", grade: null, feedback: null, gradedAt: null}
    ],
    examGrade: null,
    reExamGrade: null
}

const studentsSideAssignmentsSlice = createSlice({
    name: 'studentsAssignmentsSlice',
    initialState,
    reducers: {}
});

export default studentsSideAssignmentsSlice.reducer