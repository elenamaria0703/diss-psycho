import React, {useEffect} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../hooks";
import StudentListItemComponent from "./StudentListItemComponent";
import StudentListFiltersComponent from "./StudentListFiltersComponent";
import {Coordinator} from "../slices/studentsSideCoordinatorSlice";
import {useDispatch} from "react-redux";

const StudentListViewComponent: React.FC =()=> {
    const {coordinators, selectedDomain, requests} = useAppSelector((state) => state.studentsSlice)

    const columnsPerRow = 2

    const filterCoordinators = (coordinators: Array<Coordinator>, selectedDomain: string ) => {
        return coordinators.filter((coordinator) => coordinator.domains.includes(selectedDomain))
    }

    const getColumnsForRow =()=>{
       const coordinatorsToDisplay = selectedDomain === '' ? coordinators : filterCoordinators(coordinators, selectedDomain)
       return coordinatorsToDisplay.map((coordinator, i) => {
            return (
                <Col key={i}>
                    <StudentListItemComponent id={coordinator.id} name={coordinator.name} email={coordinator.email} domains={coordinator.domains} maxRequestsSent= {requests.length > 3} requestSent={requests.some(request => request.coord_id === coordinator.id)}/>
                </Col>
            )
        })
    }

    return (
        <Container className={'mt-4 student-container'}>
            <Row>
                <h2 className={'title'}><small className={'px-2'}>Coordonatori</small></h2>
            </Row>
            <Row className={'shadow mt-3 mb-4 py-3'}>
                <StudentListFiltersComponent/>
            </Row>
            <Row xs={1} md={columnsPerRow} className={'shadow pt-3 pb-3'}>
                {getColumnsForRow()}
            </Row>
        </Container>
    )
}
export default StudentListViewComponent