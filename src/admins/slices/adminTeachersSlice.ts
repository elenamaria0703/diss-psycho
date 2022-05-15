import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../../store";
import {Field, UserFields, XLSFields} from "./common";
import {addTeacher, getTeachers, updateTeacher} from "../AdminsApi";
import {Teacher} from "../../shared/Entities";

export interface TeacherFields extends UserFields{
    first_name: Field,
    last_name: Field,
    specialization: Field,
    email: Field
}

interface teachersSliceState {
    // table + search
    teachers: Array<Teacher>,
    filteredTeachers: Array<Teacher>,
    searchedText: string,
    fields: TeacherFields,
    xls_fields: XLSFields,

    //edit + add
    teacher: Teacher,

    // visibility modal windows
    show: any
}

const initialState: teachersSliceState = {
    teachers: [],
    filteredTeachers: [],
    searchedText: '',
    fields: {
        last_name: { type: 'text', name: 'Nume', key: 'last_name' },
        first_name: { type: 'text', name: 'Prenume', key: 'first_name' },
        specialization: { type: 'text', name: 'Specializare', key: 'specialization' },
        email: { type: 'email', name: 'E-mail', key: 'email' }
    },
    xls_fields: {
        input_file: {type: 'file', name: '', key: 'input_file'}
    },
    teacher: {id: -1},
    show : {
        edit: false,
        add: false,
        xls: false
    }
}

const adminTeachersSlice = createSlice({
    name: 'adminTeachersSlice',
    initialState,
    reducers: {
        fetchTeachers: (state, action: PayloadAction<Array<Teacher>>) => {
            state.teachers = action.payload;
        },
        hideArchive: (state) => {
            state.teachers = state.teachers.filter((t, i) => !t.archived);
        },
        setSearchedText: (state, action: PayloadAction<string>) => {
            state.searchedText = action.payload
        },
        setFilteredTeachers: (state) => {
            if(state.searchedText === '') state.filteredTeachers = state.teachers;
            else {
                state.filteredTeachers = state.teachers.filter((t, i) => t.last_name?.includes(state.searchedText) || t.first_name?.includes(state.searchedText));
            }
        },
        archiveTeacher: (state, action: PayloadAction<Teacher>) => {
            state.teachers.map((t, i) => {
                if(t.id === action.payload.id) t.archived = true;
            });
        },
        add: (state) => {
            state.teachers.push(state.teacher);
            state.teacher = initialState.teacher;
        },
        update: (state) => {
            state.teachers.map((t, i) => {
                if(state.teacher !== null && t.id === state.teacher.id) state.teachers[i] = state.teacher;
            });
            state.teacher = initialState.teacher;
        },
        setTeacher: (state, action: PayloadAction<Teacher>) => {
            // to show student's data when the window opens
            state.teacher = action.payload;
        },
        setTeacherField: (state, action: PayloadAction<Array<string>>) => {
            if(action.payload.length === 2){
                const value = action.payload[0];
                const key = action.payload[1];
                switch (key){
                    case 'id':
                        // get biggest existent id (only for add hardcode)
                        var last_id: number = 0;
                        state.teachers.map((t, i) => {
                            if(t.id > last_id) last_id = t.id;
                        });
                        state.teacher.id = last_id + 1;
                        break;
                    case 'first_name':
                        state.teacher.first_name = value;
                        break;
                    case 'last_name':
                        state.teacher.last_name = value;
                        break;
                    case 'specialization':
                        state.teacher.specialization = value;
                        break;
                    case 'email':
                        state.teacher.email = value;
                        break;
                    default:
                        break;
                }
            }
        },
        openTeacherEdit: (state) => {
            state.show.edit = true;
        },
        closeTeacherEdit: (state) => {
            state.show.edit = false;
        },
        openTeacherAdd: (state) => {
            state.show.add = true;
        },
        closeTeacherAdd: (state) => {
            state.show.add = false;
        },
        openTeacherXLS: (state) => {
            state.show.xls = true;
        },
        closeTeacherXLS: (state) => {
            state.show.xls = false;
        }
    },
});

export default adminTeachersSlice.reducer

// Actions
export const {
    fetchTeachers,
    setSearchedText,
    setFilteredTeachers,
    hideArchive,
    add,
    update,
    archiveTeacher,
    setTeacher,
    setTeacherField,
    openTeacherEdit,
    closeTeacherEdit,
    openTeacherAdd,
    closeTeacherAdd,
    openTeacherXLS,
    closeTeacherXLS
} = adminTeachersSlice.actions

export const setTeacherSearchedTextDispatch = (filter : string) => (dispatch: AppDispatch) => {
    dispatch(setSearchedText(filter));
    dispatch(setFilteredTeachers());
}

// for button
// export const setFilteredTeachersDispatch = () => (dispatch: AppDispatch) => {
//     dispatch(setFilteredTeachers());
// }

export const fetchTeacherDispatch = () => async (dispatch: AppDispatch) => {
    const teachers: Array<Teacher> | undefined = await getTeachers();
    if (teachers !== undefined) {
        dispatch(fetchTeachers(teachers));
        dispatch(hideArchive());
        dispatch(setFilteredTeachers());
    }
}

export const addTeacherDispatch = (teacher: Teacher) => async (dispatch: AppDispatch) => {
    const teacherAdd = await addTeacher(teacher);
    if(teacherAdd !== undefined){
        dispatch(add());
        dispatch(setFilteredTeachers());
    }
}

export const updateTeacherDispatch = (teacher: Teacher) => async (dispatch: AppDispatch) => {
    const teacherUpdate = await updateTeacher(teacher);
    if(teacherUpdate !== undefined){
        dispatch(update())
        dispatch(setFilteredTeachers());
    }
}

export const archiveTeacherDispatch = (teacher: Teacher) => (dispatch: AppDispatch) => {
    dispatch(archiveTeacher(teacher));
    dispatch(hideArchive());
    dispatch(setFilteredTeachers());
}

export const setTeacherDispatch = (teacher: Teacher) => (dispatch: AppDispatch) => {
    dispatch(setTeacher(teacher));
}

export const openTeacherEditDispatch = () => (dispatch: AppDispatch) => {
    dispatch(openTeacherEdit());
}

export const closeTeacherEditDispatch = () => (dispatch: AppDispatch) => {
    dispatch(closeTeacherEdit());
}

export const openTeacherAddDispatch = () => (dispatch: AppDispatch) => {
    dispatch(openTeacherAdd());
}

export const closeTeacherAddDispatch = () => (dispatch: AppDispatch) => {
    dispatch(closeTeacherAdd());
}

export const openTeacherXLSDispatch = () => (dispatch: AppDispatch) => {
    dispatch(openTeacherXLS());
}

export const closeTeacherXLSDispatch = () => (dispatch: AppDispatch) => {
    dispatch(closeTeacherXLS());
}

export const setTeacherFieldDispatch = (newvalue: string, key: string) => (dispatch: AppDispatch) => {
    var arr: Array<string> = new Array<string>();
    arr.push(newvalue);
    arr.push(key);
    dispatch(setTeacherField(arr));
}