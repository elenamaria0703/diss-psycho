import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import {PencilSquare, Archive} from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addTeacherDispatch, Teacher } from "../slices/adminTeachersSlice";

const TeacherTableComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    
    var teacherToAdd: Teacher = {
        first_name: '',
        last_name: '',
        specialization: '',
        email: ''
    };
    var teacherToEdit: Teacher = {
        first_name: '',
        last_name: '',
        specialization: '',
        email: ''
    };
    
    const clearTeacherToAdd = () => {
        teacherToAdd.last_name = '';
        teacherToAdd.first_name = '';
        teacherToAdd.specialization = '';
        teacherToAdd.email = '';
    };

    const clearTeacherToEdit = () => {
        teacherToEdit.last_name = '';
        teacherToEdit.first_name = '';
        teacherToEdit.specialization = '';
        teacherToEdit.email = '';
    };

    var teachers = useAppSelector((state) => state.adminTeachersSlice.teachers);
    const fields = useAppSelector((state) => state.adminTeachersSlice.fields);

    // Add window
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const handleSave = () => {
        dispatch(addTeacherDispatch(teacherToAdd));
        handleCloseAdd();
        clearTeacherToAdd();
    };

    // XLS window
    const [showXLS, setShowXLS] = useState(false);
    const handleCloseXLS = () => setShowXLS(false);
    const handleShowXLS = () => setShowXLS(true);

    // Edit window
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleUpdate = () => {
        console.log(teacherToEdit);
        handleCloseEdit();
        clearTeacherToEdit();
    };

    const handleEditTeacher = (index: number) => {
        if(teachers.at(index) !== undefined){
            // teacherToEdit = teachers.at(index);
            // console.log(teacherToEdit);
            handleShowEdit();
        }
    };

    const handleArchiveTeacher = (index: number) => {
        console.log(teachers.at(index));
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Table size="sm">
                        <thead>
                            {
                                Object.entries(fields).map(([key, _]) => (
                                    <th key={key}>{fields[key]}</th>
                                ))
                            }
                            <th/>
                            <th/>
                            
                        </thead>
                        <tbody>
                            {
                                teachers.map((teacher, i) => (
                                    <tr>
                                        <td>{teacher.last_name}</td>
                                        <td>{teacher.first_name}</td>
                                        <td>{teacher.specialization}</td>
                                        <td>{teacher.email}</td>
                                        <td>
                                            <Row>
                                                <Col><Button onClick={() => handleEditTeacher(i)}><PencilSquare/></Button></Col>
                                            </Row>
                                        </td>
                                        <td>
                                            <Row>
                                                <Col><Button onClick={() => handleArchiveTeacher(i)}><Archive/></Button></Col>
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
                <Col><Button onClick={handleShowAdd}>Adaugă profesor</Button></Col>
                <Col><Button onClick={handleShowXLS}>Încarcă XLS profesori</Button></Col>
            </Row>
            <Row>
                <Modal show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifică date despre un profesor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="filters-form">
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Nume"
                                    onChange={e => teacherToEdit.last_name = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Prenume"
                                    onChange={e => teacherToEdit.first_name = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Specializare"
                                    onChange={e => teacherToEdit.specialization = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="email"
                                    placeholder="Email"
                                    onChange={e => teacherToEdit.email = e.target.value}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>Renunță</Button>
                        <Button variant="primary" onClick={handleUpdate}>Modifică</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
            <Row>
                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adaugă profesor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="filters-form">
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Nume"
                                    onChange={e => teacherToAdd.last_name = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Prenume"
                                    onChange={e => teacherToAdd.first_name = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Specializare"
                                    onChange={e => teacherToAdd.specialization = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email" 
                                    placeholder="Email"
                                    onChange={e => teacherToAdd.email = e.target.value}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAdd}>Renunță</Button>
                        <Button variant="primary" onClick={handleSave}>Salvează</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
            <Row>
                <Modal show={showXLS} onHide={handleCloseXLS}>
                    <Modal.Header closeButton>
                        <Modal.Title>Încarcă XLS profesori</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="filters-form">
                            <Form.Group className="mb-3">
                                <Form.Control type="file" onChange={(e) => console.log(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseXLS}>Renunță</Button>
                        <Button variant="primary" onClick={handleCloseXLS}>Încarcă</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        </Container>
    )
};

export default TeacherTableComponent;