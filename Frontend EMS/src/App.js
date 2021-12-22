import React from "react";
import Login from "./login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UploadFile from "./upload/UploadFile";
import GenerateSeatingArrangement from "./generateSeatingArrangement/GenerateSeatingArrangement";

function App() {
  // console.log("ok");
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route path="/download-file" element={<UploadFile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/generate-seating-arrangement" element={<GenerateSeatingArrangement />} />
      </Routes>
    </Router>
  );
}

export default App;
