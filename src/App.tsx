import React, {useContext} from 'react';
import {Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import './App.css';
import {PrivateRoute} from "./shared/auth/PrivateRoute";
import Login from "./shared/auth/Login";
import StudentMainPage from "./students/StudentMainPage";
import 'bootstrap/dist/css/bootstrap.css';
import {AuthProvider} from "./shared/auth/AuthProvider";
import CoordinatorMainPage from "./coordinators/CoordinatorMainPage";
import AdminMainPage from "./admins/AdminMainPage";
import StudentCoordinatorRequestPage from "./students/StudentCoordinatorRequestPage";
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
                      path="coordinator/student/:id"
                      element={<PrivateRoute roles={['coordinator']} component={CoordinatorStudentProfilePage} />}
                  />

                  <Route
                      path="admin"
                      element={<PrivateRoute roles={['admin']} component={AdminMainPage} />}
                  />
                  <Route path="login" element={<Login/>} />
              </Routes>
          </Router>
     </AuthProvider>
    </div>
  );
}

export default App;
