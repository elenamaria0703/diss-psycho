import React, {useContext} from 'react';
import {Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import './App.css';
import {PrivateRoute} from "./shared/auth/PrivateRoute";
import Login from "./shared/auth/Login";
import StudentMainPage from "./students/StudentMainPage";
import 'bootstrap/dist/css/bootstrap.css';
import {AuthProvider} from "./shared/auth/AuthProvider";
import CoordinatorMainPage from "./coordinators/CoordinatorMainPage";
import StudentCoordinatorRequestPage from "./students/StudentCoordinatorRequestPage";
import AdminManageStudentsPage from './admins/AdminManageStudentsPage';
import AdminManageTeachersPage from './admins/AdminManageTeachersPage';
import AdminReportsPage from './admins/AdminReportsPage';
import CoordinatorStudentProfilePage from './coordinators/CoordinatorStudentProfilePage';

function App() {
  return (
    <div className="App">
     <AuthProvider>
         <Router>
              <Routes>
                  <Route path="/" element={ <Navigate to={"login"} />} />
                  <Route
                    path="student"
                    element={<PrivateRoute roles={['student']} component={StudentMainPage} />}
                  />
                  <Route
                      path="student/new_coordinator_request/:id"
                      element={<PrivateRoute roles={['student']} component={StudentCoordinatorRequestPage} />}
                  />
                  <Route
                      path="coordinator"
                      element={<PrivateRoute roles={['coordinator']} component={CoordinatorMainPage} />}
                  />
                  <Route
                        path="admin"
                        element={<Navigate replace to="/admin/students" />}
                  />
                  <Route
                      path="admin/students"
                      element={<PrivateRoute roles={['admin']} component={AdminManageStudentsPage} />}
                  />
                  <Route
                      path="admin/teachers"
                      element={<PrivateRoute roles={['admin']} component={AdminManageTeachersPage} />}
                  />
                  <Route
                      path="admin/reports"
                      element={<PrivateRoute roles={['admin']} component={AdminReportsPage} />}
                   />
                  <Route
                      path="coordinator/student/:id"
                      element={<PrivateRoute roles={['coordinator']} component={CoordinatorStudentProfilePage} />}
                  />

                  <Route path="login" element={<Login/>} />
                  
              </Routes>
          </Router>
     </AuthProvider>
    </div>
  );
}

export default App;
