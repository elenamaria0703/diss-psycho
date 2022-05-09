import React, {FormEvent, useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {searchChange} from "../slices/coordinatorsSideStudentSlice";
import {useDispatch} from "react-redux";

const CoordinatorStudentsListSearchComponent: React.FC =()=> {
  const [search, setSearch] = useState(useAppSelector((state => state.coordinatorsSlice.searchedStudent)))
  const dispatch = useAppDispatch();


  const handleSubmit = (event: FormEvent) => {
      event.preventDefault()
      if(search !== undefined){
        dispatch(searchChange(search))
      }
      else{
        dispatch(searchChange(''))
      }
  }

  return (
      <Col>
          <Form className={'filters-form'} onSubmit={handleSubmit}>
              <Form.Label>Cauta student</Form.Label>
              <Form.Group>
                  <Row>
                    <Col lg={3}>
                      <Form.Control placeholder="Nume student" value={search} onChange={(e) => setSearch(e.target.value)}></Form.Control>
                    </Col>
                    <Col><Button type={"submit"}>Caută</Button></Col>
                  </Row>
              </Form.Group>
          </Form>
      </Col>
  )
}
export default CoordinatorStudentsListSearchComponent
