import React, {FormEvent, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks";

const StudentCoordinatorRequestFormComponent: React.FC =()=> {
    const navigate = useNavigate()
    const {id} = useParams()
    const name = useAppSelector(state => state.studentsSlice.coordinators.find((coordinator) => coordinator.id == id)?.name)
    const [subject, setSubject] = useState('')
    const [motivation, setMotivation] = useState('')

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        navigate('/student')
    }

    return (
        <Container className={'mt-4 student-container'}>
            <Row>
                <Col>
                    <h2 className={'title'}><small className={'px-2'}>Cerere de Coordonare</small></h2>
                </Col>
                <Col><Button className={'float-end'} onClick={() => navigate('/student')}>Înapoi</Button></Col>
            </Row>
            <Form className={'shadow p-3'} onSubmit={handleSubmit}>
                <Row className={'my-3'}>
                    <Col><Form.Label>Profesor</Form.Label></Col>
                    <Col><Form.Control disabled={name !== undefined} readOnly={name !== undefined} type={'text'} value={name}/></Col>
                </Row>
                <Row className={'my-3'}>
                    <Col><Form.Label>Domeniul/Subiectul lucrării</Form.Label></Col>
                    <Col><Form.Control type={'text'} placeholder={'Subiectul Lucrării'} value={subject} onChange={(event) => setSubject(event.target.value)}/></Col>
                </Row>
                <Row className={'my-3'}>
                    <Col><Form.Label>Motivație</Form.Label></Col>
                    <Col><Form.Control  as="textarea" rows={5} placeholder={'De ce am ales această temă?'} value={motivation} onChange={(event)=> setMotivation(event.target.value)}/></Col>
                </Row>
                <Button type={'submit'}>Trimite Cerere</Button>
            </Form>
        </Container>
    )
}
export default StudentCoordinatorRequestFormComponent