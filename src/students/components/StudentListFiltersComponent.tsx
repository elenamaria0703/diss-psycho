import React, {FormEvent, useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {filterChange} from "../slices/studentsSideCoordinatorSlice";
import {useDispatch} from "react-redux";

const StudentListFiltersComponent: React.FC =()=> {
    const domenii = useAppSelector((state) =>
        state.studentsSlice.coordinators.map((coordinator) => coordinator.domains)
                                        .flat()
        )

    const [filter, setFilter] = useState(useAppSelector((state => state.studentsSlice.selectedDomain)))
    const dispatch = useAppDispatch();


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if(filter !== undefined && filter !== 'Selectează domenii de interes'){
            dispatch(filterChange(filter))
        }
        else{
            dispatch(filterChange(''))
        }
    }

    return (
        <Col>
           <Form className={'filters-form'} onSubmit={handleSubmit}>
               <Form.Label>Domenii de interes</Form.Label>
               <Form.Group>
                   <Row>
                       <Col lg={3}>
                           <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                               <option key={-1}>Selectează domenii de interes</option>
                               {domenii.filter((d, i) => domenii.findIndex((s) => d === s) === i).map((d, i) => <option key={i} value={d}>{d}</option>)}
                           </Form.Select>
                       </Col>
                       <Col><Button type={"submit"}>Caută</Button></Col>
                   </Row>
               </Form.Group>
           </Form>
        </Col>
    )
}
export default StudentListFiltersComponent
