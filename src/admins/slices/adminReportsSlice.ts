import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../../store";
import {useAppSelector} from "../../hooks";

export interface Report {
    type: string,
    description: string
};

interface adminReportsSliceState {
    reports: Array<Report>
}

const initialState: adminReportsSliceState = {
    reports:  [
        {type: 'students_teachers', description: 'Raport privind studenții cu sau fără profesor asignat'},
        {type: 'students_previous', description: 'Raport privind lucrările studenților din anul curent'}
    ]
}

const adminReportsSlice = createSlice({
    name: 'adminReportsSlice',
    initialState,
    reducers: {}
});

export default adminReportsSlice.reducer