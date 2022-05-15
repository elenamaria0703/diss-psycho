import React from "react";

import {Container, Row} from "react-bootstrap";
import FilterComponent from "./FilterComponent";
import TableComponent from "./TableComponent";

const TeacherTableViewComponent: React.FC = () =>{
    return (
        <Container className={'mt-4 student-container'}>
            <Row><h2 className={'title'}><small className={'px-2'}>Profesori</small></h2></Row>
            <FilterComponent type_element={'teacher'} name_element={'profesor'} />
            <TableComponent type_element={'teacher'} />
        </Container>
    )
};

export default TeacherTableViewComponent;