import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import {PrivateRoute} from "./shared/auth/PrivateRoute";
import Login from "./shared/auth/Login";
import StudentMainPage from "./students/StudentMainPage";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="student"
                element={<PrivateRoute roles={['student']} component={StudentMainPage} />}
            />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
