import React from "react";

import {Col, Container, Row} from "react-bootstrap";
import ReportComponent from "./ReportComponent";

export interface Report {
    type: string,
    description: string
};

const ReportListViewComponent: React.FC = () =>{
    const columnsPerRow = 2;

    var reports: Array<Report> = [
        {type: 'students_teachers', description: 'Raport privind studenții cu sau fără profesor asignat'},
        {type: 'students_previous', description: 'Raport privind lucrările studenților din anul curent'}
    ];

    const getColumnsForRow = () => {
        return reports.map((report, i) => {
             return (
                 <Col key={i}>
                     <ReportComponent type={report.type} description={report.description}/>
                 </Col>
             )
         })
    };

    return (
        <Container className={'mt-4 student-container'}>
            <Row xs={1} md={columnsPerRow} className={'shadow pt-3 pb-3'}>
                {getColumnsForRow()}
            </Row>
        </Container>
    )
};

export default ReportListViewComponent;