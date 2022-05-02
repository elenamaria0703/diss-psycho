import React from "react";
import {Button, Card, Image} from "react-bootstrap";
import {Coordinator} from "../slices/studentsSideCoordinatorSlice";
import {Question} from "react-bootstrap-icons";
import {useNavigate} from "react-router-dom";


const StudentListItemComponent: React.FC<Coordinator> =( { id, name,email,domains})=> {
    const navigate = useNavigate()

    return (
        <Card className={'mb-2 student-list-item'}>
            <Card.Body className={'d-flex flex-wrap'}>
                <div className={'profile-image'}>
                    <Image roundedCircle height={75} width={75} src={'logo_psihologie.png'}/>
                </div>
                <div className={'profile'}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className={'mb-2'}>{email}</Card.Text>
                    <Card.Text>{domains.join(', ')}</Card.Text>
                </div>
                <div className={'request-btn'}>
                    <Button onClick={() => { navigate(`new_coordinator_request/${id}`) }} variant={'light'}><Question height={50} width={50}/></Button>
                </div>
            </Card.Body>
        </Card>
    )
}
export default StudentListItemComponent
