import React, { useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { CoordRequest } from "../../students/slices/studentsSideCoordinatorSlice"
import { acceptRequestDispatch, fetchAllStudentsDispatch, searchChange } from "../slices/coordinatorsSideStudentSlice"

const CoordinatorRequestItemComponent: React.FC<CoordRequest> =( { id,subject,description,coord_id,stud_id })=> {
  const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllStudentsDispatch());
    }, [dispatch])
  const {allStudents, requests} = useAppSelector((state) => state.coordinatorsSlice)
  const req_stud = allStudents.find(stud =>  stud.id.toString() === stud_id)
  const handleAccept =() =>{
    const current_req = requests.find(req => req.id===id)
    if (current_req !== undefined)
      dispatch(acceptRequestDispatch(current_req));
  }
  return (
    <Card className="text-center">
      <Card.Header>{req_stud?.first_name} {req_stud?.last_name} {req_stud?.academic_code}</Card.Header>
      <Card.Body>
        <Card.Title>{subject}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className={'request-btn'}>
          <Button onClick={handleAccept} variant={'primary'}>Accepta Cererea</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
export default CoordinatorRequestItemComponent