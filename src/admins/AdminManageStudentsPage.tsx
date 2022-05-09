import React, { useContext } from "react";

import {Container} from "react-bootstrap";
import { AuthContext } from "../shared/auth/AuthProvider";
import Layout from "../shared/Layout";
import StudentTableViewComponent from "./components/StudentTableViewComponent";

const AdminManageStudentsPage: React.FC = () =>{
    const {name} = useContext(AuthContext);
    return (
        <Layout 
            title={name} 
            links={[
                {'title': 'Studenți', 'nav_link': 'students'}, 
                {'title': 'Coordonatori', 'nav_link': 'teachers'}, 
                {'title': 'Progres', 'nav_link': 'reports'}
                ]}
        >
            <StudentTableViewComponent/>
        </Layout>
    )
};

export default AdminManageStudentsPage;