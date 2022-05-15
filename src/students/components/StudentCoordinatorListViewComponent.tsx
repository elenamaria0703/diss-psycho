import React, {useEffect} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../hooks";
import StudentCoordinatorListItemComponent from "./StudentCoordinatorListItemComponent";
import StudentCoordinatorListFiltersComponent from "./StudentCoordinatorListFiltersComponent";
import {Coordinator, fetchCoordinators} from "../slices/studentsSideCoordinatorSlice";
import {useNavigate} from "react-router-dom";

const StudentCoordinatorListViewComponent: React.FC =(hasBackButton)=> {
    const {coordinators, selectedDomain, requests} = useAppSelector((state) => state.studentsSlice)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCoordinators())
    }, [dispatch])

    const columnsPerRow = 2

    const filterCoordinators = (coordinators: Array<Coordinator>, selectedDomain: string ) => {
        return coordinators.filter((coordinator) => coordinator.domains.includes(selectedDomain))
    }

    const getColumnsForRow =()=>{
       const coordinatorsToDisplay = selectedDomain === '' ? coordinators : filterCoordinators(coordinators, selectedDomain)
       return coordinatorsToDisplay.map((coordinator, i) => {
            return (
                <Col key={i}>
                    <StudentCoordinatorListItemComponent id={coordinator.id} name={coordinator.name} email={coordinator.email} domains={coordinator.domains} maxRequestsSent= {requests.length > 3} requestSent={requests.some(request => request.coord_id === coordinator.id)}/>
                </Col>
            )
        })
    }

    return (
        <Container className={'mt-4 student-container'}>
            <Row>
                <Col><h2 className={'title'}><small className={'px-2'}>Coordonatori</small></h2></Col>
                {hasBackButton && <Col><Button className={'float-end'} onClick={() => navigate({pathname: '/student'})}>Înapoi</Button></Col>}
            </Row>
            <Row className={'shadow mt-3 mb-4 py-3'}>
                <StudentCoordinatorListFiltersComponent/>
            </Row>
            <Row xs={1} md={columnsPerRow} className={'shadow pt-3 pb-3'}>
                {getColumnsForRow()}
            </Row>
        </Container>
    )
}
export default StudentCoordinatorListViewComponent