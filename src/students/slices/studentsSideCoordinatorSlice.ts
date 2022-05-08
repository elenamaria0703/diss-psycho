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
        name: "Oana Benga",
        email: "oanabenga@psychology.ro",
        domains: ['Mecanisme intrinseci și extrinseci','Variabilitate interindividuală și factori predictivi ai psihopatologiei dezvoltări','Corelate neuronale ale dezvoltării atipice']
    },
        {
            id: '2',
            name: "Adriana Băban",
            email: "adrianababan@psychology.ro",
            domains: ['Comportamente de risc','Calitatea îngrijirii medicale și satisfacția pacientului','Educaţie timpurie']
        },
        {
            id: '3',
            name: "Dorothea (Thea) A. Ionescu",
            email: "theaionescu@psychology.ro",
            domains: ['Formarea conceptelor','Educaţie timpurie', 'Mecanisme intrinseci și extrinseci']
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