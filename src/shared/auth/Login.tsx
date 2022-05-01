import React, {useContext, useState} from "react";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {AuthContext} from "./AuthProvider";
import {Navigate} from "react-router-dom";

const Login: React.FC =()=>{
    const { isAuthenticated, role, login } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        isAuthenticated ?
            <Navigate to={`/${role}`}/>
            :
            <Container fluid>
                <Row>
                    <Col><img src={'ubb_logo.png'} height={100}/></Col>
                    <Col><img src={'psiho_logo.png'} height={100}/></Col>
                </Row>
                <Row>
                    <Col>
                        <h1><small>Bine ați venit!</small></h1>
                        <Form className={'w-25 m-auto'} onSubmit={(event) => { event.preventDefault(); login?.(email, password)}}>
                            <Form.Group className={'text-center mt-4'}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={email} type={'email'} placeholder={'UBB Email'} onChange={event=>setEmail(event.target.value)}/>
                            </Form.Group>
                            <Form.Group className={'text-center mt-4'}>
                                <Form.Label>Parolă</Form.Label>
                                <Form.Control value={password} type={'password'} onChange={event=>setPassword(event.target.value)}/>
                            </Form.Group>
                            <Button className={"mt-4"} type={'submit'}>Autentifică-te</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
    );
}

export default Login;