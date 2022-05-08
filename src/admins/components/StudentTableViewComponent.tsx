import React, { FormEvent } from "react";

import {Button, Col, Container, Form, Row} from "react-bootstrap";
import TableComponent from "./TableComponent";

export interface Student {
    first_name: string,
    last_name: string,
    academic_code: string,
    specialization: string,
    graduation: string,
    form_of_education: string,
    email: string
};

const StudentTableViewComponent: React.FC = () =>{
    const handleSubmit = (event: FormEvent) => {
    }

    var students: Array<Student> = [
        {
            first_name: 'Andra Gabriela', 
            last_name: 'Pufu', 
            academic_code: 'ewdbvchi', 
            specialization: 'Info Română', 
            graduation: '2018-2021',
            form_of_education: 'Zi',
            email: 'abc2@stud.ubbcluj.ro'
        },
        {
            first_name: 'Ioana Claudia', 
            last_name: 'Rotaru', 
            academic_code: 'vsjvngrjz', 
            specialization: 'Info Română', 
            graduation: '2018-2021',
            form_of_education: 'ID',
            email: 'abc1@stud.ubbcluj.ro'
        }
    ];

    const fields = {
        last_name: 'Nume',
        first_name: 'Prenume',
        form_of_education: 'Formă de învățământ',
        graduation: 'Promoție',
        specialization: 'Specializare',
        email: 'E-mail',
        academic_code: 'Cod academic'
    }

    return (
        <Container className={'mt-4 student-container'}>
            <Row>
                <h2 className={'title'}><small className={'px-2'}>Studenți</small></h2>
            </Row>
            <Row className={'shadow mt-3 mb-4 py-3'}>
                <Col>
                    <Form className={'filters-form'} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Row>
                                <Col lg={3}>
                                    <Form.Control type="text" placeholder="Caută student" />
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit">Caută</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <TableComponent type1={'student'} type2={'studenți'} fields={fields} items={students}/>
        </Container>
    )
};

export default StudentTableViewComponent;