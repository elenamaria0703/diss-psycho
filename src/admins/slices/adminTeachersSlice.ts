import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../../store";
import {useAppSelector} from "../../hooks";

export interface Teacher {
    first_name: string,
    last_name: string,
    specialization: string,
    email: string
};

interface adminTeachersSliceState {
    teachers: Array<Teacher>,
    teachersInitial: Array<Teacher>,
    searchedText: string,
    fields: any
}

const initialState: adminTeachersSliceState = {
    teachers:  [
        {
            first_name: 'Prenume3', 
            last_name: 'Nume3', 
            specialization: 'Inteligență artificială',
            email: 'abc3@stud.ubbcluj.ro'
        },
        {
            first_name: 'Prenume4', 
            last_name: 'Nume4', 
            specialization: 'Sisteme de operare',
            email: 'abc4@stud.ubbcluj.ro'
        }
    ],
    teachersInitial: [
        {
            first_name: 'Prenume3', 
            last_name: 'Nume3', 
            specialization: 'Inteligență artificială',
            email: 'abc3@stud.ubbcluj.ro'
        },
        {
            first_name: 'Prenume4', 
            last_name: 'Nume4', 
            specialization: 'Sisteme de operare',
            email: 'abc4@stud.ubbcluj.ro'
        }
    ],
    searchedText: '',
    fields : {
        last_name: 'Nume',
        first_name: 'Prenume',
        specialization: 'Specializare',
        email: 'E-mail'
    }
}

const adminTeachersSlice = createSlice({
    name: 'adminTeachersSlice',
    initialState,
    reducers: {
        filterChanged: (state, action: PayloadAction<string>) => {
            state.searchedText = action.payload
        },
        filterChanged2: (state, action: PayloadAction<Array<Teacher>>) => {
            if(state.searchedText === '') {
                state.teachers = initialState.teachers;
                state.teachersInitial = initialState.teachersInitial;
            }
            else {
                state.teachers = action.payload;
            }
        }
    },
});

export default adminTeachersSlice.reducer

// Actions
export const { filterChanged, filterChanged2 } = adminTeachersSlice.actions

export const filterChange = (filter : string, teachers : Array<Teacher>) => (dispatch: AppDispatch) => {
   dispatch(filterChanged(filter));
   dispatch(filterChanged2(teachers));
}