import React, { FormEvent } from "react";
import { Button, Card, Image, Row, Col, Form } from "react-bootstrap";

export interface ReportProps {
    type: string,
    description: string
}

const ReportComponent: React.FC<ReportProps> = ({type, description}) => {
    const handleSubmit = (event: FormEvent) => {
        alert('click');
    }
    
    return (
        <Card className={'mb-2'}>
            <Card.Body className={'d-flex flex-wrap'}>
                <Row>
                    <Form className={'filters-form'} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Row>
                                <Col lg={2}>
                                    <Image roundedCircle height={75} src={'../../logo_psihologie.png'}/>
                                </Col>
                                <Col>
                                    <Card.Text className={'mb-2'}>{description}</Card.Text>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit">GENEREAZĂ</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Row>
            </Card.Body>
        </Card>
    )
};

export default ReportComponent;