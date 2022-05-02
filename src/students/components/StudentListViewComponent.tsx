import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../hooks";
import StudentListItemComponent from "./StudentListItemComponent";

const StudentListViewComponent: React.FC =()=> {
    const coordinators = useAppSelector((state) => state.studentsSlice.coordinators)
    const dispatch = useAppDispatch()

    const columnsPerRow = 2

    const getColumnsForRow =()=>{
       return coordinators.map((coordinator) => {
            return (
                <Col>
                    <StudentListItemComponent name={coordinator.name} email={coordinator.email} domains={coordinator.domains}/>
                </Col>
            )
        })
    }

    return (
        <Container className={'mt-4 student-container'}>
            <Row>
                <h2 className={'title'}><small className={'px-2'}>Coordonatori</small></h2>
            </Row>
            <Row xs={1} md={columnsPerRow} className={'shadow pt-3 pb-3'}>
                {getColumnsForRow()}
            </Row>
        </Container>
    )
}
export default StudentListViewComponent