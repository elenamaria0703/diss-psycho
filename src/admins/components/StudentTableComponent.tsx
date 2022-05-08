import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import {PencilSquare, Archive} from "react-bootstrap-icons";
import { useAppSelector } from "../../hooks";

const StudentTableComponent: React.FC = () => {
    var students = useAppSelector((state) => state.adminStudentsSlice.students);
    const fields = useAppSelector((state) => state.adminStudentsSlice.fields);
    
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
                                                <Col><PencilSquare/></Col>
                                                <Col><Archive/></Col>
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
                <Col><Button type={"submit"}>Adaugă student</Button></Col>
                <Col><Button type={"submit"}>Încarcă XLS studenți</Button></Col>
            </Row>
        </Container>
    )
};

export default StudentTableComponent;