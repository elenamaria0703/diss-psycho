import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import CoordinatorStudentWorkComponent from "./CoordinatorStudentWorkComponent"

const CoordinatorStudentProflieComponent: React.FC =( )=> {
  const navigate = useNavigate()
  const {id} = useParams()
  const columnsPerRow = 3
  const last_name = useAppSelector(state => state.coordinatorsSlice.students.find((students) => students.id === Number(id))?.last_name);
  const first_name = useAppSelector(state => state.coordinatorsSlice.students.find((students) => students.id === Number(id))?.first_name);
  const work = useAppSelector(state => state.coordinatorsSlice.students.find((students) => students.id === Number(id))?.work);
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
            <h2 className={'title'}><small className={'px-2'}>Lucrarile studentului - {`${last_name} ${first_name}`}</small></h2>
        </Col>
        <Col><Button className={'float-end'} onClick={() => navigate('/coordinator')}>Înapoi</Button></Col>
      </Row>
      {work ? <Row xs={1} md={columnsPerRow} className={'shadow pt-3 pb-3'}>
        {getColumnsForRow()}
      </Row> : <h2>Nu au fost gasite lucrari pentru {`${last_name} ${first_name}`}</h2>}
      
    </Container>
  )
}
export default CoordinatorStudentProflieComponent;