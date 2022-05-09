import React, { useContext } from "react";
import {Container} from "react-bootstrap";
import { AuthContext } from "../shared/auth/AuthProvider";
import Layout from "../shared/Layout";
import CoordinatorListViewComponent from "./components/CoordinatorListViewComponent";

const CoordinatorMainPage: React.FC = () =>{
    const {name} = useContext(AuthContext)
    return (
        <Layout title={name}>
            <CoordinatorListViewComponent/>
        </Layout>
    )
}
export default CoordinatorMainPage