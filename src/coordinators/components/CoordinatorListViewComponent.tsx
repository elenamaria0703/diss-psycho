import React, {useEffect} from "react"
import { Col, Container, Row } from "react-bootstrap"
import {useAppDispatch, useAppSelector} from "../../hooks"
import CoordinatorListItemComponent from "./CoordinatorListItemComponent"
import CoordinatorStudentsListSearchComponent from "./CoordinatorStudentsListSearchComponent"
import {Student} from "../../shared/Entities";
import {fetchStudentDispatch} from "../slices/coordinatorsSideStudentSlice";

const CoordinatorListViewComponent: React.FC =()=> {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchStudentDispatch());
    }, [dispatch])
  const {students, searchedStudent} = useAppSelector((state) => state.coordinatorsSlice)
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


  return (
    <Container className={'mt-4 student-container'}>
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