import React, { useContext } from "react";
import { AuthContext } from "../shared/auth/AuthProvider";
import Layout from "../shared/Layout";
import ReportListViewComponent from "./components/ReportListViewComponent";

const AdminReportsPage: React.FC = () =>{
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
            <ReportListViewComponent/>
        </Layout>
    )
};

export default AdminReportsPage;