import React from "react";
import {Button, Card, Image, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Coordinator} from "../slices/studentsSideCoordinatorSlice";
import {Clock, Question} from "react-bootstrap-icons";
import {useNavigate} from "react-router-dom";

interface CoordonatorCardProps extends Coordinator{
    maxRequestsSent: boolean,
    requestSent: boolean
}

const StudentCoordinatorListItemComponent: React.FC<CoordonatorCardProps> =({ id, name,email,domains, maxRequestsSent, requestSent})=> {
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
                    {requestSent ?
                        <OverlayTrigger overlay={<Tooltip>Confirmare în așteptare</Tooltip>}>
                            <span><Button disabled variant={'light'}><Clock height={30} width={50}/></Button></span>
                        </OverlayTrigger>
                        :
                        maxRequestsSent ?
                                <OverlayTrigger overlay={<Tooltip>S-a atins numărul maxim de cereri de coordonare</Tooltip>}>
                                    <span><Button disabled variant={'light'}><Question height={50} width={50}/></Button></span>
                                </OverlayTrigger>
                            :
                                <Button onClick={() => {
                                    navigate(`new_coordinator_request/${id}`)
                                }} variant={'light'}><Question height={50} width={50}/></Button>
                    }
                </div>
            </Card.Body>
        </Card>
    )
}
export default StudentCoordinatorListItemComponent
