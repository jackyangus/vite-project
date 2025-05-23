import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import AuxViewer from "./AuxViewer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/aux-viewer" element={<AuxViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
