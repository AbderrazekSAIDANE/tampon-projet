import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PersonnalisationPage from "./components/PersonnalisationPage";
import Sidebar from "./components/Sidebar";

export default function AppRoutes() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/personnalisation/:categorie" element={<PersonnalisationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
