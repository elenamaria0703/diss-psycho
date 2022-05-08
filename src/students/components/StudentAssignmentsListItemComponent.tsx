import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import {Assignment} from "../slices/studentSideAssignmentsSlice";

const StudentAssignmentsListItemComponent: React.FC<Assignment> =({ title, description, feedback, grade, gradedAt})=> {
    const navigate = useNavigate()

    return (
        <Card className={'mb-2 assignment-container flex-grow-1'}>
            <Card.Title className={'mt-2'}>{title}</Card.Title>
            <Card.Body className={'d-flex flex-column'}>
                <Card.Text>{description}</Card.Text>
                {feedback &&
                    <Card.Text as={'div'}>
                        {grade && <p className={'m-2 border-bottom'}><span className={'text-muted'}>Notă:</span> {grade}</p>}
                        {feedback && <p><p className={'text-muted'}>Observații:</p> {feedback}</p>}
                    </Card.Text>
                }
                {feedback ?
                    <p className={'mt-auto p-2'}>Evaluat în data de {gradedAt}</p>
                    :
                    <p className={'mt-auto'}><Button variant={'light'}>Încarcă</Button></p>
                }
            </Card.Body>
        </Card>
    )
}
export default StudentAssignmentsListItemComponent
