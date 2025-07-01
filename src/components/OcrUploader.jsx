import React, { useState } from "react";

function OCRUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5001/api/ocr", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.text);
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Lancer l'OCR
      </button>
      <pre className="mt-4 whitespace-pre-wrap">{result}</pre>
    </div>
  );
}

export default OCRUploader;
