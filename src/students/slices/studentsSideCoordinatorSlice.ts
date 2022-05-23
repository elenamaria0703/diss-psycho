import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch} from "../../store";
import {addRequestStorage, getCoordinatorId, getCoordinators} from "../StudentsApi";
import {Teacher} from "../../shared/Entities";

// Slice
export interface Coordinator {
    id: string,
    name: string,
    email: string,
    domains: Array<string>
}
// export interface CoordinatorResponse {
//     id: number,
//     email: string,
//     firstName: string,
//     lastName: string,
//     specialization: string
// }

// export interface CoordinatorResponse {
//     id: number,
//     email: string,
//     first_name: string,
//     last_name: string,
//     specialization: string
// }

export interface CoordRequest {
    id: string,
    subject: string,
    description: string,
    coord_id: string,
    stud_id: string
}
interface studentsSliceState {
    coordinators: Array<Coordinator>,
    requests: Array<CoordRequest>,
    selectedDomain: string,
    hasCoordinator: boolean
}

const initialState: studentsSliceState = {
    coordinators:  [],
    selectedDomain: '',
    requests: [],
    hasCoordinator: false
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
            state.requests.push(request)
        },
        fetchedCoordinators: (state, action: PayloadAction<Array<Coordinator>>) =>{
            state.coordinators = action.payload
        },
        setCoordinator: (state) => {
            state.hasCoordinator = true;
        }
    },
});

export default studentsSideCoordinatorSlice.reducer

// Actions
export const { filterChanged, addRequest, fetchedCoordinators, setCoordinator } = studentsSideCoordinatorSlice.actions

export const filterChange = (filter : string) => (dispatch: AppDispatch) => {
   dispatch(filterChanged(filter));
}

export const addCoordRequest = (request: CoordRequest) => async (dispatch: AppDispatch) => {
    const requestAdd = await addRequestStorage(request);
    if(requestAdd !== undefined){
        dispatch(addRequest(request));
    }
}

export const fetchCoordinators = () => async (dispatch: AppDispatch) => {
    try{
        const response = await getCoordinators();
        console.log(response);
        dispatch(fetchedCoordinators(response.map((item: Teacher) => {return {
                id: item.id.toString(),
                email: item.email,
                // name: item.lastName + " " + item.firstName,
                name: item.last_name + " " + item.first_name,
                domains: item.specialization?.split(';')
            }
        }) as Array<Coordinator>))
    }
    catch (e) {
        console.log(e)
    }
}

export const getCoordinatorIdDispatch = () => async (dispatch: AppDispatch) => {
    const coordinator_id = await getCoordinatorId();
    if(coordinator_id !== undefined && coordinator_id !== -1) dispatch(setCoordinator());
}
