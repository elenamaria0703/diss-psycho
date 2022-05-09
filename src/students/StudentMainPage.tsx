import React, {useContext} from "react";
import Layout from "../shared/Layout";
import {AuthContext} from "../shared/auth/AuthProvider";
import StudentCoordinatorListViewComponent from "./components/StudentCoordinatorListViewComponent";
import StudentAssignmentsListViewComponent from "./components/StudentAssignmentsListViewComponent";
import {useSearchParams} from "react-router-dom";

const StudentMainPage: React.FC = () =>{
    const {name} = useContext(AuthContext)
    const [queryParams] = useSearchParams()
    const params = Object.fromEntries(queryParams.entries())
    const hasCoordinator = true
    console.log(params.skipCoordCheck === 'true')
    return (
        <Layout title={name}>
            {
                (!hasCoordinator || params.skipCoordCheck == 'true') ?
                    <StudentCoordinatorListViewComponent/>
                    :
                    <StudentAssignmentsListViewComponent/>
            }
        </Layout>
    )
}
export default StudentMainPage