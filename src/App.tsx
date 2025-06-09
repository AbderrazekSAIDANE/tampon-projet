// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonnalisationPage from "./components/PersonnalisationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonnalisationPage />} />
        {/* Tu peux ajouter d'autres routes ici si nécessaire */}
      </Routes>
    </Router>
  );
};

export default App;
