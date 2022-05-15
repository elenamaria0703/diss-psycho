import React from "react";

import {Container, Row} from "react-bootstrap";
import TableComponent from "./TableComponent";
import FilterComponent from "./FilterComponent";

const StudentTableViewComponent: React.FC = () =>{
    return (
        <Container className={'mt-4 student-container'}>
            <Row><h2 className={'title'}><small className={'px-2'}>Studenți</small></h2></Row>
            <FilterComponent type_element={'student'} name_element={'student'} />
            <TableComponent type_element={'student'} />
        </Container>
    )
};

export default StudentTableViewComponent;