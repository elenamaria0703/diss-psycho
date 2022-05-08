import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import {PencilSquare, Archive} from "react-bootstrap-icons";
import { useAppSelector } from "../../hooks";

const TeacherTableComponent: React.FC = () => {
    var teachers = useAppSelector((state) => state.adminTeachersSlice.teachers);
    const fields = useAppSelector((state) => state.adminTeachersSlice.fields);

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
                                teachers.map((teacher, i) => (
                                    <tr>
                                        <td>{teacher.last_name}</td>
                                        <td>{teacher.first_name}</td>
                                        <td>{teacher.specialization}</td>
                                        <td>{teacher.email}</td>
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
                <Col><Button type={"submit"}>Adaugă profesor</Button></Col>
                <Col><Button type={"submit"}>Încarcă XLS profesori</Button></Col>
            </Row>
        </Container>
    )
};

export default TeacherTableComponent;