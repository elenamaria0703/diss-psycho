import React from "react";
import {Button, Card, Image} from "react-bootstrap";
// import { Student } from "../slices/coordinatorsSideStudentSlice";
import {useNavigate} from "react-router-dom";
import { BarChartLineFill } from "react-bootstrap-icons";
import {Student} from "../../shared/Entities";


const CoordinatorListItemComponent: React.FC<Student> =( { id, first_name, last_name,email})=> {
    const navigate = useNavigate()

    return (
        <Card className={'mb-2 student-list-item'}>
            <Card.Body className={'d-flex flex-wrap'}>
                <div className={'profile-image'}>
                    <Image roundedCircle height={75} width={75} src={'logo_psihologie.png'}/>
                </div>
                <div className={'profile'}>
                    <Card.Title>{`${last_name} ${first_name}`}</Card.Title>
                    <Card.Text className={'mb-2'}>{email}</Card.Text>
                </div>
                <div className={'request-btn'}>
                    <Button onClick={() => { navigate(`student/${id}`) }} variant={'light'}><BarChartLineFill height={50} width={50}/></Button>
                </div>
            </Card.Body>
        </Card>
    )
}
export default CoordinatorListItemComponent
