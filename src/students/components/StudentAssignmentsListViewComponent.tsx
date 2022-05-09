import React from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useAppSelector} from "../../hooks";
import StudentAssignmentsListItemComponent from "./StudentAssignmentsListItemComponent";
import {useNavigate} from "react-router-dom";


const StudentAssignmentsListViewComponent: React.FC =()=> {
    const {assignments, examGrade, reExamGrade} = useAppSelector(state => state.studentAssignmentsSlice)
    const navigate = useNavigate()
    const columnsPerRow = 3

    const getColumnsForRow =()=>{
        return assignments.map((assignment, i) => {
            return (
                <Col key={i} className={'d-flex align-items-stretch'}>
                    <StudentAssignmentsListItemComponent title={assignment.title} description={assignment.description} feedback={assignment.feedback} grade={assignment.grade} gradedAt={assignment.gradedAt}/>
                </Col>
            )
        })
    }

    const getGradeForDisplay = () => {
        let displayedGrade = null
        if (examGrade && reExamGrade)
            displayedGrade = Math.max(examGrade, reExamGrade)
        else if (examGrade)
            displayedGrade = examGrade
        return displayedGrade ? <h5 className={'text-start'}><small>Notă: {displayedGrade}</small></h5> : <></>
    }

    return (
        <Container className={'mt-4 student-container'}>
            <Row>
                <Col><h2 className={'title'}><small className={'px-2'}>Progresul lucrării</small></h2></Col>
                <Col><Button className={'float-end'} onClick={() => navigate({pathname: '/student', search: '?skipCoordCheck=true'})}>Schimbă coordonator</Button></Col>
            </Row>
            <Row>
                {getGradeForDisplay()}
            </Row>
            <Row xs={1} md={columnsPerRow} className={'pt-3 pb-3'}>
                {getColumnsForRow()}
            </Row>
        </Container>
    )
}
export default StudentAssignmentsListViewComponent