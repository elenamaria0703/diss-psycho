import { createSlice } from '@reduxjs/toolkit'
import {RootState} from "../../store";

// Slice
export interface Coordinator {
    name: string,
    email: string,
    domains: Array<string>
}
interface studentsSliceState {
    coordinators: Array<Coordinator>
}

const initialState: studentsSliceState = {
    coordinators:  [{
        name: "Test Coordinator",
        email: "test@coordinator.com",
        domains: ['d1','d2','d3']
    },
        {
            name: "Test Coordinator",
            email: "test@coordinator.com",
            domains: ['d1','d2','d3']
        },
        {
            name: "Test Coordinator",
            email: "test@coordinator.com",
            domains: ['d1','d2','d3']
        }],
}

const studentsSlice = createSlice({
    name: 'studentsSlice',
    initialState,
    reducers: {
    },
});

export default studentsSlice.reducer