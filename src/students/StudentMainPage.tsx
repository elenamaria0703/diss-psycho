import React, {useContext} from "react";
import {Container} from "react-bootstrap";
import Layout from "../shared/Layout";
import {AuthContext} from "../shared/auth/AuthProvider";

const StudentMainPage: React.FC = () =>{
    const {name} = useContext(AuthContext)
    return (
        <Layout title={name}>
            <Container className={"mt-2 mb-5"}>
            Students Main Page
            </Container>
        </Layout>
    )
}
export default StudentMainPage