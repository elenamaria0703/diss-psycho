import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../../store";
import {useAppSelector} from "../../hooks";
import {getCoordinators} from "../StudentsApi";

// Slice
export interface Coordinator {
    id: string,
    name: string,
    email: string,
    domains: Array<string>
}
export interface CoordinatorResponse {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    specialization: string
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
    coordinators:  [],
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
        },
        fetchedCoordinators: (state, action: PayloadAction<Array<Coordinator>>) =>{
            state.coordinators = action.payload
        }
    },
});

export default studentsSideCoordinatorSlice.reducer

// Actions
export const { filterChanged, addRequest, fetchedCoordinators } = studentsSideCoordinatorSlice.actions

export const filterChange = (filter : string) => (dispatch: AppDispatch) => {
   dispatch(filterChanged(filter));
}

export const addCoordRequest = (request: CoordRequest) => (dispatch: AppDispatch) => {
    dispatch(addRequest(request));
}

export const fetchCoordinators = () => async (dispatch: AppDispatch) => {
    try{
        const response = await getCoordinators()
        dispatch(fetchedCoordinators(response.map((item: CoordinatorResponse) => {return {
                id: item.id.toString(),
                email: item.email,
                name: item.lastName + " " + item.firstName,
                domains: item.specialization.split(';')
            }
        }) as Array<Coordinator>))
    }
    catch (e) {
        console.log(e)
    }
}