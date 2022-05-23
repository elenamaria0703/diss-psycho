import React, {useContext, useEffect} from "react"
import { Col, Container, Row } from "react-bootstrap"
import {useAppDispatch, useAppSelector} from "../../hooks"
import CoordinatorListItemComponent from "./CoordinatorListItemComponent"
import CoordinatorStudentsListSearchComponent from "./CoordinatorStudentsListSearchComponent"
import {Student} from "../../shared/Entities";
import {fetchRequestsDispatch, fetchStudentDispatch} from "../slices/coordinatorsSideStudentSlice";
import { AuthContext } from "../../shared/auth/AuthProvider"
import CoordinatorRequestItemComponent from "./CoordinatorRequestItemComponent"

const CoordinatorListViewComponent: React.FC =()=> {
    const dispatch = useAppDispatch();
    const {id} = useContext(AuthContext)
    useEffect(() => {
        dispatch(fetchStudentDispatch());
        dispatch(fetchRequestsDispatch(id.toString()));
    }, [dispatch])
  const {students, searchedStudent, requests} = useAppSelector((state) => state.coordinatorsSlice)
  const columnsPerRow = 2
  
  const searchStudent = (students: Array<Student>, searchedStudent: string ) => {
    return students.filter((student) => student.last_name?.includes(searchedStudent) || student.first_name?.includes(searchedStudent))
}

  const getColumnsForRow =()=>{
    const studentsToDisplay =  searchedStudent === '' ? students : searchStudent(students, searchedStudent)
    return studentsToDisplay.map((student, i) => {
         return (
            <Col key={i}>
                <CoordinatorListItemComponent id={student.id} first_name={student.first_name} last_name={student.last_name} email={student.email}/>
            </Col>
         )
     })
 }

 const getRequestForRow =()=>{
    return requests?.map((request, i) => {
      return (
        <Row key = {i}>
          <CoordinatorRequestItemComponent id={request.id} subject={request.subject} description={request.description} coord_id={request.coord_id} stud_id={request.stud_id}/>
        </Row>
      )
    })
  }

  return (
    <Container className={'mt-4 student-container'}>
      {requests.length >=1 && <Row><h2 className={'title'}><small className={'px-2'}>Cereri</small></h2>
        {getRequestForRow()}
      </Row>}
      <Row>
        <h2 className={'title'}><small className={'px-2'}>Studenti</small></h2>
      </Row>
      <Row className={'shadow mt-3 mb-4 py-3'}>
        <CoordinatorStudentsListSearchComponent/>
      </Row>
      <Row xs={1} md={columnsPerRow} className={'shadow pt-3 pb-3'}>
          {getColumnsForRow()}
      </Row>
    </Container>
)
}
export default CoordinatorListViewComponent