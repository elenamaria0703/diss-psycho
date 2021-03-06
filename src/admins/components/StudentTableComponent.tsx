import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Table, Modal } from "react-bootstrap";
import {PencilSquare, Archive} from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addStudentDispatch, Student, updateStudentDispatch } from "../slices/adminStudentsSlice";

const StudentTableComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    var selectedEditIndex = -1;

    var studentToAdd: Student = {
        last_name: '',
        first_name: '',
        form_of_education: '',
        graduation: '',
        specialization: '',
        email: '',
        academic_code: ''
    };
    var studentToEdit: Student = {
        last_name: '',
        first_name: '',
        form_of_education: '',
        graduation: '',
        specialization: '',
        email: '',
        academic_code: ''
    };

    const clearStudentToAdd = () => {
        studentToAdd.last_name = '';
        studentToAdd.first_name = '';
        studentToAdd.form_of_education = '';
        studentToAdd.graduation = '';
        studentToAdd.specialization = '';
        studentToAdd.email = '';
        studentToAdd.academic_code = '';
    };

    const clearStudentToEdit = () => {
        selectedEditIndex = -1;
        studentToEdit.last_name = '';
        studentToEdit.first_name = '';
        studentToEdit.form_of_education = '';
        studentToEdit.graduation = '';
        studentToEdit.specialization = '';
        studentToEdit.email = '';
        studentToEdit.academic_code = '';
    };

    var students = useAppSelector((state) => state.adminStudentsSlice.students);
    const fields = useAppSelector((state) => state.adminStudentsSlice.fields);

    // Add window
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const handleSave = () => {
        dispatch(addStudentDispatch(studentToAdd));
        handleCloseAdd();
        clearStudentToAdd();
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
        // dispatch(updateStudentDispatch(studentToEdit, selectedEditIndex));
        handleCloseEdit();
        clearStudentToEdit();
    };

    const handleEditStudent = (index: number) => {
        if(students.at(index) !== undefined){
            selectedEditIndex = index;
            studentToEdit.last_name = students.at(index)?.last_name;
            studentToEdit.first_name = students.at(index)?.first_name;
            studentToEdit.form_of_education = students.at(index)?.form_of_education;
            studentToEdit.graduation = students.at(index)?.graduation;
            studentToEdit.specialization = students.at(index)?.specialization;
            studentToEdit.email = students.at(index)?.email;
            studentToEdit.academic_code = students.at(index)?.academic_code;
            handleShowEdit();
        }
        
    };

    const handleArchiveStudent = (index: number) => {
        console.log(students.at(index));
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
                                students.map((student, i) => (
                                    <tr>
                                        <td>{student.last_name}</td>
                                        <td>{student.first_name}</td>
                                        <td>{student.form_of_education}</td>
                                        <td>{student.graduation}</td>
                                        <td>{student.specialization}</td>
                                        <td>{student.email}</td>
                                        <td>{student.academic_code}</td>
                                        <td>
                                            <Row>
                                                <Col><Button onClick={() => handleEditStudent(i)}><PencilSquare/></Button></Col>
                                            </Row>
                                        </td>
                                        <td>
                                            <Row>
                                                <Col><Button onClick={() => handleArchiveStudent(i)}><Archive/></Button></Col>
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
                <Col><Button onClick={handleShowAdd}>Adaug?? student</Button></Col>
                <Col><Button onClick={handleShowXLS}>??ncarc?? XLS studen??i</Button></Col>
            </Row>
            <Row>
                <Modal show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modific?? date despre un student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="filters-form">
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Nume"
                                    onChange={e => studentToEdit.last_name = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Prenume"
                                    onChange={e => studentToEdit.first_name = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Form?? de ??nv??????m??nt"
                                    onChange={e => studentToEdit.form_of_education = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Promo??ie"
                                    onChange={e => studentToEdit.graduation = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Specializare"
                                    onChange={e => studentToEdit.specialization = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="email" 
                                    placeholder="Email"
                                    onChange={e => studentToEdit.email = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Cod academic"
                                    onChange={e => studentToEdit.academic_code = e.target.value}    
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>Renun????</Button>
                        <Button variant="primary" onClick={handleUpdate}>Modific??</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
            <Row>
                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adaug?? student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="filters-form">
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Nume"
                                    onChange={e => studentToAdd.last_name = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Prenume"
                                    onChange={e => studentToAdd.first_name = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Form?? de ??nv??????m??nt"
                                    onChange={e => studentToAdd.form_of_education = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Promo??ie"
                                    onChange={e => studentToAdd.graduation = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Specializare"
                                    onChange={e => studentToAdd.specialization = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Email"
                                    onChange={e => studentToAdd.email = e.target.value}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    placeholder="Cod academic"
                                    onChange={e => studentToAdd.academic_code = e.target.value}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAdd}>Renun????</Button>
                        <Button variant="primary" onClick={handleSave}>Salveaz??</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
            <Row>
                <Modal show={showXLS} onHide={handleCloseXLS}>
                    <Modal.Header closeButton>
                        <Modal.Title>??ncarc?? XLS studen??i</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="filters-form">
                            <Form.Group className="mb-3">
                                <Form.Control type="file" onChange={(e) => console.log(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseXLS}>Renun????</Button>
                        <Button variant="primary" onClick={handleCloseXLS}>??ncarc??</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        </Container>
    )
};

export default StudentTableComponent;