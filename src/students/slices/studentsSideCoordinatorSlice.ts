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
export interface CoordRequest {
    id: string,
    subject: string,
    description: string,
    coord_id: string
}
interface studentsSliceState {
    coordinators: Array<Coordinator>,
    requests: Array<CoordRequest>,
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
    selectedDomain: '',
    requests: []
}

const studentsSideCoordinatorSlice = createSlice({
    name: 'studentsSlice',
    initialState,
    reducers: {
        filterChanged: (state, action: PayloadAction<string>) => {
            state.selectedDomain = action.payload
        },
        addRequest: (state, action: PayloadAction<CoordRequest>) => {
            let request = action.payload
            request.id = `${state.requests.length + 1}`
            state.requests.push(request)
        }
    },
});

export default studentsSideCoordinatorSlice.reducer

// Actions
export const { filterChanged, addRequest } = studentsSideCoordinatorSlice.actions

export const filterChange = (filter : string) => (dispatch: AppDispatch) => {
   dispatch(filterChanged(filter));
}

export const addCoordRequest = (request: CoordRequest) => (dispatch: AppDispatch) => {
    dispatch(addRequest(request));
}