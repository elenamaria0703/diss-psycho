import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import CoordinatorStudentWorkComponent from "./CoordinatorStudentWorkComponent"

const CoordinatorStudentProflieComponent: React.FC =( )=> {
  const navigate = useNavigate()
  const {id} = useParams()
  const columnsPerRow = 3
  const name = useAppSelector(state => state.coordinatorsSlice.students.find((students) => students.id == id)?.name)
  const work = useAppSelector(state => state.coordinatorsSlice.students.find((students) => students.id == id)?.work)
  const getColumnsForRow =()=>{
    return work?.map((work, i) => {
      return (
          <Col key={i}>
            <CoordinatorStudentWorkComponent id={work.id} description={work.description} feedback={work.feedback} submission_date={work.submission_date}/>
          </Col>
      )
  })
 }
  return (
    <Container className={'mt-4 student-container'}>
      <Row>
        <Col>
            <h2 className={'title'}><small className={'px-2'}>Lucrarile studentului - {name}</small></h2>
        </Col>
        <Col><Button className={'float-end'} onClick={() => navigate('/coordinator')}>Înapoi</Button></Col>
      </Row>
      {work ? <Row xs={1} md={columnsPerRow} className={'shadow pt-3 pb-3'}>
        {getColumnsForRow()}
      </Row> : <h2>Nu au fost gasite lucrari pentru {name}</h2>}
      
    </Container>
  )
}
export default CoordinatorStudentProflieComponent;