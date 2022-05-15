import React from "react";

import {Col, Form, Row} from "react-bootstrap";
import { useAppDispatch} from "../../hooks";
import {
    // setFilteredTeachersDispatch,
    setTeacherSearchedTextDispatch
} from "../slices/adminTeachersSlice";
import {
    // setFilteredStudentsDispatch,
    setStudentSearchedTextDispatch
} from "../slices/adminStudentsSlice";

export interface FilterProps {
    type_element: string,
    name_element: string

}
const FilterComponent: React.FC<FilterProps> = ({type_element, name_element}) =>{
    const handleChangeValue = (text: string) => {
        if(type_element === 'student') dispatch(setStudentSearchedTextDispatch(text));
        else if(type_element === 'teacher') dispatch(setTeacherSearchedTextDispatch(text));
    }

    // const handleSubmit = (event: FormEvent) => {
    //     event.preventDefault();
    //     if(type_element === 'student') dispatch(setFilteredStudentsDispatch());
    //     else if(type_element === 'teacher') dispatch(setFilteredTeachersDispatch());
    // }

    const dispatch = useAppDispatch();

    return (
        <Row className={'shadow mt-3 mb-4 py-3'}>
            <Col>
                <Form className={'filters-form'} /*onSubmit={handleSubmit}*/>
                    <Form.Group>
                        <Row>
                            <Col lg={3}>
                                <Form.Control
                                    placeholder={`Caută ${name_element}`}
                                    onChange={e => handleChangeValue(e.target.value.toString())}
                                    // onChange={e => filter = e.target.value}
                                />
                            </Col>
                            {/*<Col><Button variant="primary" type="submit">Caută</Button></Col>*/}
                        </Row>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    )
};

export default FilterComponent;