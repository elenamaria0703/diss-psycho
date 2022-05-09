import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useAppSelector } from "../../hooks"
import { Student } from "../slices/coordinatorsSideStudentSlice"
import CoordinatorListItemComponent from "./CoordinatorListItemComponent"
import CoordinatorStudentsListSearchComponent from "./CoordinatorStudentsListSearchComponent"

const CoordinatorListViewComponent: React.FC =()=> {
  const {students, searchedStudent} = useAppSelector((state) => state.coordinatorsSlice)
  const columnsPerRow = 2
  
  const searchStudent = (students: Array<Student>, searchedStudent: string ) => {
    return students.filter((student) => student.name.includes(searchedStudent))
}

  const getColumnsForRow =()=>{
    const studentsToDisplay =  searchedStudent === '' ? students : searchStudent(students, searchedStudent)
    return studentsToDisplay.map((student, i) => {
         return (
            <Col key={i}>
                <CoordinatorListItemComponent id={student.id} name={student.name} email={student.email}/>
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