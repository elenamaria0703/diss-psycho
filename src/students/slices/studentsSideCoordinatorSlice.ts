import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../../store";
import {useAppSelector} from "../../hooks";

// Slice
export interface Coordinator {
    id: string,
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
        id: '1',
        name: "Test Coordinator",
        email: "test@coordinator.com",
        domains: ['d1','d2','d3']
    },
        {
            id: '2',
            name: "Test Coordinator",
            email: "test@coordinator.com",
            domains: ['d1','d2']
        },
        {
            id: '3',
            name: "Test Coordinator",
            email: "test@coordinator.com",
            domains: ['d1','d3']
        }],
    selectedDomain: ''
}

const studentsSideCoordinatorSlice = createSlice({
    name: 'studentsSlice',
    initialState,
    reducers: {
        filterChanged: (state, action: PayloadAction<string>) => {
            state.selectedDomain = action.payload
        }
    },
});

export default studentsSideCoordinatorSlice.reducer

// Actions
export const { filterChanged } = studentsSideCoordinatorSlice.actions

export const filterChange = (filter : string) => (dispatch: AppDispatch) => {
   dispatch(filterChanged(filter));
}