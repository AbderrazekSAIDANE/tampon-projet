import React, { useState } from "react";

function OCRUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrText, setOcrText] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("http://localhost:5001/api/ocr", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setOcrText(data.text || "Aucun texte trouvé.");
  };

  return (
    <div>
      <h2>OCR</h2>
      <input type="file" onChange={handleFileChange} accept=".png,.jpg,.jpeg,.pdf" />
      <button onClick={handleUpload}>Analyser</button>
      <pre>{ocrText}</pre>
    </div>
  );
}

export default OCRUpload;
