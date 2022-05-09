import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../../store";
import {useAppSelector} from "../../hooks";

export interface Student {
    first_name?: string,
    last_name?: string,
    academic_code?: string,
    specialization?: string,
    graduation?: string,
    form_of_education?: string,
    email?: string
};

interface adminStudentsSliceState {
    students: Array<Student>,
    studentsInitial: Array<Student>,
    searchedText: string,
    fields: any,
    studentEdited: Student
}

const initialState: adminStudentsSliceState = {
    students: [
        {
            first_name: 'Prenume1', 
            last_name: 'Nume1', 
            academic_code: 'ewdbvchi', 
            specialization: 'Info Română', 
            graduation: '2018-2021',
            form_of_education: 'Zi',
            email: 'abc2@stud.ubbcluj.ro'
        },
        {
            first_name: 'Prenume2', 
            last_name: 'Nume2', 
            academic_code: 'vsjvngrjz', 
            specialization: 'Info Română', 
            graduation: '2018-2021',
            form_of_education: 'ID',
            email: 'abc1@stud.ubbcluj.ro'
        }
    ],
    studentsInitial: [
        {
            first_name: 'Prenume1', 
            last_name: 'Nume1', 
            academic_code: 'ewdbvchi', 
            specialization: 'Info Română', 
            graduation: '2018-2021',
            form_of_education: 'Zi',
            email: 'abc2@stud.ubbcluj.ro'
        },
        {
            first_name: 'Prenume2', 
            last_name: 'Nume2', 
            academic_code: 'vsjvngrjz', 
            specialization: 'Info Română', 
            graduation: '2018-2021',
            form_of_education: 'ID',
            email: 'abc1@stud.ubbcluj.ro'
        }
    ],
    searchedText: '',
    fields: {
        last_name: 'Nume',
        first_name: 'Prenume',
        form_of_education: 'Formă de învățământ',
        graduation: 'Promoție',
        specialization: 'Specializare',
        email: 'E-mail',
        academic_code: 'Cod academic'
    },
    studentEdited:{
        first_name: '', 
        last_name: '', 
        academic_code: '', 
        specialization: '', 
        graduation: '',
        form_of_education: '',
        email: ''
    }
}

const adminStudentsSlice = createSlice({
    name: 'adminStudentsSlice',
    initialState,
    reducers: {
        filterChanged: (state, action: PayloadAction<string>) => {
            state.searchedText = action.payload
        },
        filterChanged2: (state, action: PayloadAction<Array<Student>>) => {
            if(state.searchedText === '') {
                state.students = state.studentsInitial;
            }
            else {
                state.students = action.payload;
            }
        },
        addStudent: (state, action: PayloadAction<Student>) => {
            state.students.push(action.payload);
            state.studentsInitial.push(action.payload);
        },
        updateStudent: (state, action: PayloadAction<number>) => {
            console.log('update');
            state.students[action.payload] = state.studentEdited;
            console.log('trec');
            state.studentsInitial[action.payload] = state.studentEdited;
            console.log(state.students[action.payload]);
        },
        setStudentEdit: (state, action: PayloadAction<Student>) => {
            console.log('edit');
            state.studentEdited = action.payload;
        }
    },
});

export default adminStudentsSlice.reducer

// Actions
export const { filterChanged, filterChanged2, addStudent, setStudentEdit, updateStudent } = adminStudentsSlice.actions

export const filterChange = (filter : string, students: Array<Student>) => (dispatch: AppDispatch) => {
   dispatch(filterChanged(filter));
   dispatch(filterChanged2(students));
}

export const addStudentDispatch = (student: Student) => (dispatch: AppDispatch) => {
    dispatch(addStudent(student));
 }

 export const updateStudentDispatch = (student: Student, index: number) => (dispatch: AppDispatch) => {
    dispatch(setStudentEdit(student));
    // dispatch(updateStudent(index));
 }