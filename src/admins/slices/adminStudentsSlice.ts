import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch} from "../../store";
import {Field, UserFields, XLSFields} from "./common";
import {addStudent, getStudents, updateStudent} from "../AdminsApi";
import {Student} from "../../shared/Entities";

// export interface Student extends User{
//     first_name?: string,
//     last_name?: string,
//     academic_code?: string,
//     specialization?: string,
//     graduation?: string,
//     form_of_education?: string,
//     email?: string,
//     archived?: boolean
// }

export interface StudentFields {
    first_name: Field,
    last_name: Field,
    academic_code: Field,
    specialization: Field,
    graduation: Field,
    form_of_education: Field,
    email: Field
}

interface studentsSliceState extends UserFields{
    // table + search
    students: Array<Student>,
    filteredStudents: Array<Student>,
    searchedText: string,
    fields: StudentFields,
    xls_fields: XLSFields,

    //edit + add
    student: Student,

    // visibility modal windows
    show: any
}

const initialState: studentsSliceState = {
    students: [],
    filteredStudents: [],
    searchedText: '',
    fields: {
        last_name: { type: 'text', name: 'Nume', key: 'last_name' },
        first_name: { type: 'text', name: 'Prenume', key: 'first_name' },
        form_of_education: { type: 'text', name: 'Formă de învățământ', key: 'form_of_education' },
        graduation: { type: 'text', name: 'Promoție', key: 'graduation' },
        specialization: { type: 'text', name: 'Specializare', key: 'specialization' },
        email: { type: 'email', name: 'E-mail', key: 'email' },
        academic_code: { type: 'text', name: 'Cod academic', key: 'academic_code' }
    },
    xls_fields: {
      input_file: {type: 'file', name: '', key: 'input_file'}
    },
    student: {
        id: -1,
        first_name: '',
        last_name: '',
        academic_code: '',
        specialization: '',
        graduation: '',
        form_of_education: '',
        email: '',
        coordinator_id: -1,
        archived: false
    },
    show : {
        edit: false,
        add: false,
        xls: false
    }
}

const adminStudentsSlice = createSlice({
    name: 'adminStudentsSlice',
    initialState,
    reducers: {
        fetchStudents: (state, action: PayloadAction<Array<Student>>) => {
            state.students = action.payload;
        },
        hideArchive: (state) => {
            state.students = state.students.filter((s, i) => !s.archived);
        },
        setSearchedText: (state, action: PayloadAction<string>) => {
            state.searchedText = action.payload
        },
        setFilteredStudents: (state) => {
            if(state.searchedText === '') state.filteredStudents = state.students;
            else {
                state.filteredStudents = state.students.filter((s, i) => s.last_name?.includes(state.searchedText) || s.first_name?.includes(state.searchedText));
            }
        },
        archiveStudent: (state, action: PayloadAction<Student>) => {
            state.students.map((s, i) => {
                if(s.id === action.payload.id) s.archived = true;
            });
        },
        add: (state) => {
            state.students.push(state.student);
            state.student = initialState.student;
        },
        update: (state) => {
            state.students.map((s, i) => {
                if(state.student !== null && s.id === state.student.id) state.students[i] = state.student;
            });
            state.student = initialState.student;
        },
        setStudent: (state, action: PayloadAction<Student>) => {
            // to show student's data when the window opens
            state.student = action.payload;
        },
        setStudentField: (state, action: PayloadAction<Array<string>>) => {
            if(action.payload.length === 2){
                const value = action.payload[0];
                const key = action.payload[1];
                switch (key){
                    case 'id':
                        // get biggest existent id (only for add hardcode)
                        var last_id: number = 0;
                        state.students.map((s, i) => {
                            if(s.id > last_id) last_id = s.id;
                        });
                        state.student.id = last_id + 1;
                        break;
                    case 'first_name':
                        state.student.first_name = value;
                        break;
                    case 'last_name':
                        state.student.last_name = value;
                        break;
                    case 'form_of_education':
                        state.student.form_of_education = value;
                        break;
                    case 'specialization':
                        state.student.specialization = value;
                        break;
                    case 'graduation':
                        state.student.graduation = value;
                        break;
                    case 'email':
                        state.student.email = value;
                        break;
                    case 'academic_code':
                        state.student.academic_code = value;
                        break;
                    default:
                        break;
                }
            }
        },
        openStudentEdit: (state) => {
            state.show.edit = true;
        },
        closeStudentEdit: (state) => {
            state.show.edit = false;
        },
        openStudentAdd: (state) => {
            state.show.add = true;
        },
        closeStudentAdd: (state) => {
            state.show.add = false;
        },
        openStudentXLS: (state) => {
            state.show.xls = true;
        },
        closeStudentXLS: (state) => {
            state.show.xls = false;
        }
    },
});

export default adminStudentsSlice.reducer

// Actions
export const {
    fetchStudents,
    hideArchive,
    setSearchedText,
    setFilteredStudents,
    add,
    update,
    archiveStudent,
    setStudent,
    setStudentField,
    openStudentEdit,
    closeStudentEdit,
    openStudentAdd,
    closeStudentAdd,
    openStudentXLS,
    closeStudentXLS
} = adminStudentsSlice.actions

export const setStudentSearchedTextDispatch = (filter : string) => (dispatch: AppDispatch) => {
    dispatch(setSearchedText(filter));
    dispatch(hideArchive());
    dispatch(setFilteredStudents());
}

// // for button
// export const setFilteredStudentsDispatch = () => (dispatch: AppDispatch) => {
//     dispatch(setFilteredStudents());
// }

export const fetchStudentDispatch = () => async (dispatch: AppDispatch) => {
    const studs: Array<Student> | undefined = await getStudents();
    if (studs !== undefined) {
        dispatch(fetchStudents(studs));
        dispatch(hideArchive());
        dispatch(setFilteredStudents());
    }
}

export const addStudentDispatch = (student: Student) => async (dispatch: AppDispatch) => {
    const studentAdd = await addStudent(student);
    if(studentAdd !== undefined){
        dispatch(add());
        dispatch(setFilteredStudents());
    }
}

export const updateStudentDispatch = (student: Student) => async (dispatch: AppDispatch) => {
    const studentUpdate = await updateStudent(student);
    if(studentUpdate !== undefined){
        dispatch(update());
        dispatch(setFilteredStudents());
    }
}

export const archiveStudentDispatch = (student: Student) => (dispatch: AppDispatch) => {
    dispatch(archiveStudent(student));
    dispatch(hideArchive());
    dispatch(setFilteredStudents());
}

export const setStudentDispatch = (student: Student) => (dispatch: AppDispatch) => {
    dispatch(setStudent(student));
}

export const openStudentEditDispatch = () => (dispatch: AppDispatch) => {
    dispatch(openStudentEdit());
}

export const closeStudentEditDispatch = () => (dispatch: AppDispatch) => {
    dispatch(closeStudentEdit());
}

export const openStudentAddDispatch = () => (dispatch: AppDispatch) => {
    dispatch(openStudentAdd());
}

export const closeStudentAddDispatch = () => (dispatch: AppDispatch) => {
    dispatch(closeStudentAdd());
}

export const openStudentXLSDispatch = () => (dispatch: AppDispatch) => {
    dispatch(openStudentXLS());
}

export const closeStudentXLSDispatch = () => (dispatch: AppDispatch) => {
    dispatch(closeStudentXLS());
}

export const setStudentFieldDispatch = (newvalue: string, key: string) => (dispatch: AppDispatch) => {
    var arr: Array<string> = new Array<string>();
    arr.push(newvalue);
    arr.push(key);
    dispatch(setStudentField(arr));
}