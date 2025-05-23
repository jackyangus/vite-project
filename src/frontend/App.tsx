import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuxViewer from "./AuxViewer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/aux-viewer" element={<AuxViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
