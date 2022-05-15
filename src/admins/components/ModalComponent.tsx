import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {
    addStudentDispatch, closeStudentAddDispatch, closeStudentEditDispatch,
    closeStudentXLSDispatch,
    setStudentFieldDispatch,
    updateStudentDispatch
} from "../slices/adminStudentsSlice";
import {UserFields} from "../slices/common";
import {
    addTeacherDispatch,
    closeTeacherAddDispatch,
    closeTeacherEditDispatch,
    closeTeacherXLSDispatch,
    setTeacherFieldDispatch,
    updateTeacherDispatch
} from "../slices/adminTeachersSlice";
import {User} from "../../shared/Entities";

export interface ModalProps {
    type_element: string,
    type_window: string,
    fields: UserFields,
    title: string,
    btn_cancel_label: string,
    btn_submit_label: string,
    userToEdit?: User
}

const ModalComponent: React.FC<ModalProps> = ({type_element,type_window,fields,title,btn_cancel_label,btn_submit_label ,userToEdit}) => {
    const dispatch = useAppDispatch();

    var show: boolean = false;

    var studentShow = useAppSelector((state) => state.adminStudentsSlice.show);
    var teacherShow = useAppSelector((state) => state.adminTeachersSlice.show);

    var student = useAppSelector((state) => state.adminStudentsSlice.student);
    var teacher = useAppSelector((state) => state.adminTeachersSlice.teacher);

    const setVisibility = () => {
        if(type_element === 'student'){
            if(type_window === 'edit') show = studentShow.edit;
            else if(type_window === 'add') show = studentShow.add;
            else if(type_window === 'xls') show = studentShow.xls;
        }else if(type_element === 'teacher'){
            if(type_window === 'edit') show = teacherShow.edit;
            else if(type_window === 'add') show = teacherShow.add;
            else if(type_window === 'xls') show = teacherShow.xls;
        }
    }

    const handleClose = () => {
        if(type_window === 'xls'){
            if(type_element === 'student') dispatch(closeStudentXLSDispatch());
            else if(type_element === 'teacher') dispatch(closeTeacherXLSDispatch());
        }else if(type_window === 'edit') {
            if(type_element === 'student') dispatch(closeStudentEditDispatch());
            else if(type_element === 'teacher') dispatch(closeTeacherEditDispatch());
        }
        else if(type_window === 'add') {
            if(type_element === 'student') dispatch(closeStudentAddDispatch());
            else if(type_element === 'teacher') dispatch(closeTeacherAddDispatch());
        }
        show = false;
    }

    const handleSubmit = () => {
        if(type_window === 'edit'){
            if(type_element === 'student') dispatch(updateStudentDispatch(student));
            else if(type_element === 'teacher') dispatch(updateTeacherDispatch(teacher));
        }else if(type_window === 'add'){
            if(type_element === 'student') dispatch(addStudentDispatch(student));
            else if(type_element === 'teacher') dispatch(addTeacherDispatch(teacher));
        }
        handleClose();
    };
    const handleChangeValueField = (newvalue: string, key: string) => {
        if(type_element === 'student') dispatch(setStudentFieldDispatch(newvalue, key));
        else if(type_element === 'teacher') dispatch(setTeacherFieldDispatch(newvalue, key));
    };

    setVisibility();

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="filters-form">
                    {Object.entries(fields).map(([key, value]) => {
                        if(value.type === 'text' || value.type === 'email') {
                            if(userToEdit && userToEdit.hasOwnProperty(key)) return (
                                <Form.Group key={`fgroupedit_${type_element}_${key}`} className={"mb-3"}>
                                    <Form.Control
                                        key={`fcontroledit_${type_element}_${key}`}
                                        type={value.type}
                                        value={(Object.entries(userToEdit).find(pair => pair[0] === key))?.[1]}
                                        placeholder={value.name}
                                        onChange={e => handleChangeValueField(e.target.value.toString(), value.key)}
                                    />
                                </Form.Group>
                            )
                            else return (
                                <Form.Group
                                    key={`fgroupadd_${type_element}_${key}`}
                                    className={"mb-3"}>
                                        <Form.Control
                                            key={`fcontroladd_${type_element}_${key}`}
                                            placeholder={value.name}
                                            onChange={e => handleChangeValueField(e.target.value.toString(), value.key)}
                                        />
                                </Form.Group>
                            )
                        }else if(value.type === 'file'){
                            return (
                                <Form.Group
                                    key={`fgroupfile_${type_element}_${key}`}
                                    className={"mb-3"}>
                                        <Form.Control
                                            key={`fcontrolfile_${type_element}_${key}`}
                                            type={'file'}
                                            onChange={(e) => console.log(e.target.value)}
                                        />
                                </Form.Group>
                            )
                        }
                    })}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>{btn_cancel_label}</Button>
                <Button variant="primary" onClick={handleSubmit}>{btn_submit_label}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalComponent;