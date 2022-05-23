import React, {FormEvent, useContext, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import { AuthContext } from "../../shared/auth/AuthProvider";
import {addCoordRequest} from "../slices/studentsSideCoordinatorSlice";

const StudentCoordinatorRequestFormComponent: React.FC =()=> {
    const navigate = useNavigate()
    const {coord_id} = useParams()
    const {id} = useContext(AuthContext)
    const name = useAppSelector(state => state.studentsSlice.coordinators.find((coordinator) => coordinator.id == coord_id)?.name)
    const new_req_id = useAppSelector(state => state.studentsSlice.requests?.length) + 1
    const [subject, setSubject] = useState('')
    const [motivation, setMotivation] = useState('')
    const [validated, setValidated] = useState(false)
    const dispatch = useAppDispatch();

    const handleSubmit = (event: FormEvent) => {
        const form = event.currentTarget as HTMLFormElement
        event.preventDefault()
        if (form.checkValidity()){
            dispatch(addCoordRequest({id: new_req_id.toString(), coord_id: coord_id || '', description: motivation, subject: subject, stud_id: id.toString() || ''}))
            navigate(-1)
        }

        setValidated(true)
    }

    return (
        <Container className={'mt-4 student-container'}>
            <Row>
                <Col>
                    <h2 className={'title'}><small className={'px-2'}>Cerere de Coordonare</small></h2>
                </Col>
                <Col><Button className={'float-end'} onClick={() => navigate(-1)}>Înapoi</Button></Col>
            </Row>
            <Form noValidate validated={validated} className={'shadow p-3'} onSubmit={handleSubmit}>
                <Row className={'my-3'}>
                    <Col><Form.Label>Profesor</Form.Label></Col>
                    <Col><Form.Control disabled={name !== undefined} readOnly={name !== undefined} type={'text'} value={name}/></Col>
                </Row>
                <Row className={'my-3'}>
                   <Col><Form.Label>Domeniul/Subiectul lucrării</Form.Label></Col>
                   <Col>
                       <Form.Control type={'text'} required placeholder={'Subiectul Lucrării'} value={subject} onChange={(event) => setSubject(event.target.value)}/>
                       <Form.Control.Feedback type="invalid" className={'text-start'}>
                            Subiectul lucrării trebuie completat obligatoriu.
                       </Form.Control.Feedback>
                   </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col><Form.Label>Motivație</Form.Label></Col>
                    <Col>
                        <Form.Control  as="textarea" rows={5} required placeholder={'De ce am ales această temă?'} value={motivation} onChange={(event)=> setMotivation(event.target.value)}/>
                        <Form.Control.Feedback type="invalid" className={'text-start'}>
                            Motivația lucrării trebuie completată obligatoriu.
                        </Form.Control.Feedback>
                    </Col>

                </Row>
                <Button type={'submit'}>Trimite Cerere</Button>
            </Form>
        </Container>
    )
}
export default StudentCoordinatorRequestFormComponent