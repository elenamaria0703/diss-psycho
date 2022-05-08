import React, { FormEvent } from "react";

import {Button, Col, Container, Form, Row} from "react-bootstrap";
import TableComponent from "./TableComponent";

export interface Teacher {
    first_name: string,
    last_name: string,
    specialization: string,
    email: string
};

const TeacherTableViewComponent: React.FC = () =>{
    const handleSubmit = (event: FormEvent) => {
    }
    var teachers: Array<Teacher> = [
        {
            first_name: 'Laura Silvia', 
            last_name: 'Dioșan', 
            specialization: 'Inteligență artificială',
            email: 'abc3@stud.ubbcluj.ro'
        },
        {
            first_name: 'Rareș', 
            last_name: 'Boian', 
            specialization: 'Sisteme de operare',
            email: 'abc4@stud.ubbcluj.ro'
        }
    ];

    const fields = {
        last_name: 'Nume',
        first_name: 'Prenume',
        specialization: 'Specializare',
        email: 'E-mail'
    }

    return (
        <Container className={'mt-4 student-container'}>
            <Row>
                <h2 className={'title'}><small className={'px-2'}>Profesori</small></h2>
            </Row>
            <Row className={'shadow mt-3 mb-4 py-3'}>
                <Col>
                    <Form className={'filters-form'} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Row>
                                <Col lg={3}>
                                    <Form.Control type="text" placeholder="Caută profesor" />
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit">Caută</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <TableComponent type1={'profesor'} type2={'profesori'} fields={fields} items={teachers}/>
        </Container>
    )
};

export default TeacherTableViewComponent;