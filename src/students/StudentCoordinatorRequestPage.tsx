import React, {useContext} from "react";
import {Container} from "react-bootstrap";
import Layout from "../shared/Layout";
import {AuthContext} from "../shared/auth/AuthProvider";
import {useParams} from "react-router-dom";
import StudentCoordinatorRequestFormComponent from "./components/StudentCoordinatorRequestFormComponent";

const StudentCoordinatorRequestPage: React.FC = () =>{
    const {name} = useContext(AuthContext)

    return (
        <Layout title={name}>
            <StudentCoordinatorRequestFormComponent/>
        </Layout>
    )
}
export default StudentCoordinatorRequestPage