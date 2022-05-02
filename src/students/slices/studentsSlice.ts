import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../../store";
import {useAppSelector} from "../../hooks";

// Slice
export interface Coordinator {
    name: string,
    email: string,
    domains: Array<string>
}
interface studentsSliceState {
    coordinators: Array<Coordinator>,
    selectedDomain: string,
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
            domains: ['d1','d2']
        },
        {
            name: "Test Coordinator",
            email: "test@coordinator.com",
            domains: ['d1','d3']
        }],
    selectedDomain: ''
}

const studentsSlice = createSlice({
    name: 'studentsSlice',
    initialState,
    reducers: {
        filterChanged: (state, action: PayloadAction<string>) => {
            state.selectedDomain = action.payload
        }
    },
});

export default studentsSlice.reducer

// Actions
export const { filterChanged } = studentsSlice.actions

export const filterChange = (filter : string) => (dispatch: AppDispatch) => {
   dispatch(filterChanged(filter));
}