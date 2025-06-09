// PersonnalisationPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShapeSelector from "./ShapeSelector";
import FileUploader from "./FileUploader";
import PersonnalisationForm from "./PersonnalisationForm";

const PersonnalisationPage = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [documents, setDocuments] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {!selectedShape && (
        <ShapeSelector selectedShape={selectedShape} onSelect={setSelectedShape} />
      )}

      {selectedShape && !documents && (
        <FileUploader onUploadSuccess={setDocuments} />
      )}

      {selectedShape && documents && (
        <PersonnalisationForm shape={selectedShape} documents={documents} />
      )}
    </div>
  );
};

export default PersonnalisationPage;
