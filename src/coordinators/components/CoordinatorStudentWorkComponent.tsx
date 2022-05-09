import React, { FormEvent } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { StudentWork } from "../slices/coordinatorsSideStudentSlice";

const CoordinatorStudentWorkComponent: React.FC<StudentWork> =({id, description, feedback, submission_date })=> {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    //dispach action
  }
  return(
    <Card className="text-center">
      <Card.Header>Tema {id}</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        {feedback ? <Card.Text><hr/><b>Feedback</b><br/>{feedback} </Card.Text> :
          <Form className={'shadow p-3'} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Feedback</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button type={'submit'} variant="primary">Ofera Feedback</Button>
          </Form>
        }
      </Card.Body>
      <Card.Footer className="text-muted">Incarcat la data: {submission_date.toDateString()}</Card.Footer>
    </Card>
  )
}

export default CoordinatorStudentWorkComponent;