import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonnalisationForm from "./components/PersonnalisationForm";
import PersonnalisationPage from "./components/PersonnalisationPage";
import OCRUpload from "./components/OCRUpload";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonnalisationForm />} />
        <Route path="/ocr" element={<OCRUpload />} />
        <Route path="/personnalisation/:categorie" element={<PersonnalisationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
