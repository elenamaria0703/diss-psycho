import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Archive, PencilSquare} from "react-bootstrap-icons";
import {
    archiveStudentDispatch,
    fetchStudentDispatch,
    openStudentAddDispatch,
    openStudentEditDispatch,
    openStudentXLSDispatch,
    setStudentDispatch, setStudentFieldDispatch
} from "../slices/adminStudentsSlice";
import {UserFields, XLSFields} from "../slices/common";
import ModalComponent from "./ModalComponent";
import {
    archiveTeacherDispatch, fetchTeacherDispatch,
    openTeacherAddDispatch,
    openTeacherEditDispatch,
    openTeacherXLSDispatch,
    setTeacherDispatch, setTeacherFieldDispatch
} from "../slices/adminTeachersSlice";
import {User} from "../../shared/Entities";

export interface TableProps {
    type_element: string
}

const TableComponent: React.FC<TableProps> = ({type_element}) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(type_element === 'student') dispatch(fetchStudentDispatch());
        else if(type_element === 'teacher') dispatch(fetchTeacherDispatch());
    }, [dispatch])
    var users: Array<User> = new Array<User>();
    var fields: UserFields = {};
    var xls_fields: XLSFields = {};

    var parameters = {
        student: {
            titles: {
                edit: 'Modifică date despre un student',
                add: 'Adaugă student',
                xls: 'Încarcă XLS studenți'
            },
            buttons: {
                cancel: 'Renunță',
                submit: {
                    edit: 'Modifică',
                    add: 'Salvează',
                    xls: 'Încarcă'
                }
            },
            user: {id: -1}
        },
        teacher: {
            titles: {
                edit: 'Modifică date despre un profesor',
                add: 'Adaugă profesor',
                xls: 'Încarcă XLS profesori'
            },
            buttons: {
                cancel: 'Renunță',
                submit: {
                    edit: 'Modifică',
                    add: 'Salvează',
                    xls: 'Încarcă'
                }
            },
            user: {id: -1}
        }
    }

    var add_label: string = '';
    var xls_label: string = '';
    // set data
    if(type_element === 'student'){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        users = useAppSelector((state) => state.adminStudentsSlice.filteredStudents);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        fields = useAppSelector((state) => state.adminStudentsSlice.fields);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        xls_fields = useAppSelector((state) => state.adminStudentsSlice.xls_fields);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        parameters.student.user = useAppSelector((state) => state.adminStudentsSlice.student);

        add_label = parameters.student.titles.add;
        xls_label = parameters.student.titles.xls;
    }else if(type_element === 'teacher'){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        users = useAppSelector((state) => state.adminTeachersSlice.filteredTeachers);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        fields = useAppSelector((state) => state.adminTeachersSlice.fields);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        parameters.teacher.user = useAppSelector((state) => state.adminTeachersSlice.teacher);

        add_label = parameters.teacher.titles.add;
        xls_label = parameters.teacher.titles.xls;
    }

    const handleEdit = (user: User) => {
        if(type_element === 'student'){
            dispatch(setStudentDispatch(user));
            dispatch(openStudentEditDispatch());
        }else if(type_element === 'teacher'){
            dispatch(setTeacherDispatch(user));
            dispatch(openTeacherEditDispatch());
        }
    };

    const handleArchive = (user: User) => {
        if(type_element === 'student'){
            dispatch(archiveStudentDispatch(user));
        }else if(type_element === 'teacher'){
            dispatch(archiveTeacherDispatch(user));
        }
    };

    const handleAdd = () => {
        if(type_element === 'student'){
            dispatch(setStudentFieldDispatch('', 'id')); // only for hardcode
            dispatch(openStudentAddDispatch());
        }else if(type_element === 'teacher'){
            dispatch(setTeacherFieldDispatch('', 'id')); // only for hardcode
            dispatch(openTeacherAddDispatch());
        }
    }

    const handleXLS = () => {
        if(type_element === 'student'){
            dispatch(openStudentXLSDispatch());
        }else if(type_element === 'teacher'){
            dispatch(openTeacherXLSDispatch());
        }
    }

    if(fields === {}) return (<Container>Nu s-a putut afisa tabelul.</Container>)
    else return (
        <Container>
            <Row>
                <Col>
                    <Table size="sm">
                        <thead>
                        <tr key={`${type_element}_fields`}>
                            {
                                Object.entries(fields).map(([key, value]) => (
                                    <th key={value.key}>{value.name}</th>
                                ))
                            }
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user, i) => (
                                <tr key={`${type_element}_fields${i}`}>
                                    {
                                        Object.entries(fields).map(([key, value]) => (
                                            Object.entries(user).map(([u_key, u_value]) => {
                                                if(key === u_key) {
                                                    return (<td key={`${type_element}_${key}_${i}`}>{u_value}</td>)
                                                }
                                            })
                                        ))
                                    }
                                    <td key={`td_${type_element}_edit${i}`}>
                                        <Row>
                                            <Col key={`${type_element}_edit${i}`}><Button key={`${type_element}_btn_edit${i}`} onClick={() => {handleEdit(user)}}><PencilSquare/></Button></Col>
                                        </Row>
                                    </td>
                                    <td key={`td_${type_element}_archive${i}`}>
                                        <Row>
                                            <Col key={`${type_element}_archive${i}`}><Button onClick={() => handleArchive(user)}><Archive/></Button></Col>
                                        </Row>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col><Button onClick={handleAdd}>{add_label}</Button></Col>
                <Col><Button onClick={handleXLS}>{xls_label}</Button></Col>
            </Row>
            <Row>
                {
                    type_element === 'student' && <ModalComponent
                    type_element={type_element}
                    type_window={'edit'}
                    fields={fields}
                    title={parameters.student.titles.edit}
                    btn_cancel_label={parameters.student.buttons.cancel}
                    btn_submit_label={parameters.student.buttons.submit.edit}
                    userToEdit={parameters.student.user}
                    />
                }
                {
                    type_element === 'teacher' && <ModalComponent
                        type_element={type_element}
                        type_window={'edit'}
                        fields={fields}
                        title={parameters.teacher.titles.edit}
                        btn_cancel_label={parameters.teacher.buttons.cancel}
                        btn_submit_label={parameters.teacher.buttons.submit.edit}
                        userToEdit={parameters.teacher.user}
                    />
                }
            </Row>
            <Row>
                {
                    type_element === 'student' && <ModalComponent
                        type_element={type_element}
                        type_window={'add'}
                        fields={fields}
                        title={parameters.student.titles.add}
                        btn_cancel_label={parameters.student.buttons.cancel}
                        btn_submit_label={parameters.student.buttons.submit.add}
                    />
                }
                {
                    type_element === 'teacher' && <ModalComponent
                        type_element={type_element}
                        type_window={'add'}
                        fields={fields}
                        title={parameters.teacher.titles.add}
                        btn_cancel_label={parameters.teacher.buttons.cancel}
                        btn_submit_label={parameters.teacher.buttons.submit.add}
                    />
                }
            </Row>
            <Row>
                {
                    type_element === 'student' && <ModalComponent
                        type_element={type_element}
                        type_window={'xls'}
                        fields={xls_fields}
                        title={parameters.student.titles.xls}
                        btn_cancel_label={parameters.student.buttons.cancel}
                        btn_submit_label={parameters.student.buttons.submit.xls}
                    />
                }
                {
                    type_element === 'teacher' && <ModalComponent
                        type_element={type_element}
                        type_window={'xls'}
                        fields={xls_fields}
                        title={parameters.teacher.titles.xls}
                        btn_cancel_label={parameters.teacher.buttons.cancel}
                        btn_submit_label={parameters.teacher.buttons.submit.xls}
                    />
                }
            </Row>
        </Container>
    )
};

export default TableComponent;