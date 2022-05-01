import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import {PrivateRoute} from "./shared/auth/PrivateRoute";
import Login from "./shared/auth/Login";
import StudentMainPage from "./students/StudentMainPage";
import 'bootstrap/dist/css/bootstrap.css';
import {AuthProvider} from "./shared/auth/AuthProvider";

function App() {
  return (
    <div className="App">
     <AuthProvider>
         <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="student"
                    element={<PrivateRoute roles={['student']} component={StudentMainPage} />}
                />
              </Routes>
          </Router>
     </AuthProvider>
    </div>
  );
}

export default App;
