import React, { useContext } from "react";

import {Container} from "react-bootstrap";
import { AuthContext } from "../shared/auth/AuthProvider";
import Layout from "../shared/Layout";
import TeacherTableViewComponent from "./components/TeacherTableViewComponent";

const AdminManageTeachersPage: React.FC = () =>{
    const {name} = useContext(AuthContext);
    return (
        <Layout 
            title={name} 
            links={[
                {'title': 'Studenți', 'nav_link': 'admin/students'},
                {'title': 'Coordonatori', 'nav_link': 'admin/teachers'},
                {'title': 'Progres', 'nav_link': 'admin/reports'}
                ]}
        >
            <TeacherTableViewComponent/>
        </Layout>
    )
};

export default AdminManageTeachersPage;