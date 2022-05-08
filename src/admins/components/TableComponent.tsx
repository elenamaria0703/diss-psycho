import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import {PencilSquare, Archive} from "react-bootstrap-icons";

export interface TableProps {
    type1: string,
    type2: string,
    fields: any,
    items: Array<any>
}

const TableComponent: React.FC<TableProps> = ({type1, type2, fields, items}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Table size="sm">
                        <thead>
                            {
                                Object.entries(fields).map(([key, _]) => (
                                    <th key={key}>{fields[key]}</th>
                                ))
                            }
                            <th/>
                            
                        </thead>
                        <tbody>
                            {
                                items.map((item, i) => (
                                    <tr>
                                        {
                                            Object.entries(fields).map(([key, _]) => (
                                                <td>{!item.hasOwnProperty(key) ? '' : item[key]}</td>
                                            ))
                                        }
                                        <td>
                                            <Row>
                                                <Col><PencilSquare/></Col>
                                                <Col><Archive/></Col>
                                            </Row>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col><Button type={"submit"}>Adaugă {type1}</Button></Col>
                <Col><Button type={"submit"}>Încarcă XLS {type2}</Button></Col>
            </Row>
        </Container>
    )
};

export default TableComponent;