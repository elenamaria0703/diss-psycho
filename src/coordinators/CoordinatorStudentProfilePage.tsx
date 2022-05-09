import React, { useContext } from "react"
import { AuthContext } from "../shared/auth/AuthProvider"
import Layout from "../shared/Layout"
import CoordinatorStudentProflieComponent from "./components/CoordinatorStudentProfileComponent"

const StudentProfliePage: React.FC =( )=> {
  const {name} = useContext(AuthContext)
  return (
    <Layout title={name}>
      <CoordinatorStudentProflieComponent/>
    </Layout>
  )
}
export default StudentProfliePage