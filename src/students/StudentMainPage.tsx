import React, {useContext} from "react";
import {Container} from "react-bootstrap";
import Layout from "../shared/Layout";
import {AuthContext} from "../shared/auth/AuthProvider";
import StudentListViewComponent from "./components/StudentListViewComponent";

const StudentMainPage: React.FC = () =>{
    const {name} = useContext(AuthContext)
    return (
        <Layout title={name}>
            <StudentListViewComponent/>
        </Layout>
    )
}
export default StudentMainPage