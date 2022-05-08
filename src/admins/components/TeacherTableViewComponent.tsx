import React, { FormEvent, useState } from "react";

import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { filterChange } from "../slices/adminTeachersSlice";
import TeacherTableComponent from "./TeacherTableComponent";

const TeacherTableViewComponent: React.FC = () =>{
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(filter !== undefined || filter !== ''){
            dispatch(filterChange(filter, teachersInitial.filter((t, i) => t.last_name.includes(filter) || t.first_name.includes(filter))))
        }
        else{
            dispatch(filterChange('', []));
        }
    }
    var teachersInitial = useAppSelector((state) => state.adminTeachersSlice.teachersInitial)
    var [filter, setFilter] = useState(useAppSelector((state => state.adminTeachersSlice.searchedText)))
    const dispatch = useAppDispatch();

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
                                    <Form.Control 
                                        placeholder="Caută profesor"
                                        onChange={e => filter = e.target.value} />
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit">Caută</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <TeacherTableComponent/>
        </Container>
    )
};

export default TeacherTableViewComponent;