import React, { useContext } from "react";

import {Container} from "react-bootstrap";
import { AuthContext } from "../shared/auth/AuthProvider";
import Layout from "../shared/Layout";
import ReportListViewComponent from "./components/ReportListViewComponent";

const AdminReportsPage: React.FC = () =>{
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
            <ReportListViewComponent/>
        </Layout>
    )
};

export default AdminReportsPage;