import React from "react";

import {Col, Container, Row} from "react-bootstrap";
import { useAppSelector } from "../../hooks";
import ReportComponent from "./ReportComponent";

const ReportListViewComponent: React.FC = () =>{
    const columnsPerRow = 2;
    var reports = useAppSelector((state) => state.adminReportsSlice.reports);

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