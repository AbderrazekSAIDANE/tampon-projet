// FileUploader.jsx
import React, { useState } from "react";
import axios from "axios";

const FileUploader = ({ onUploadSuccess }) => {
  const [registre, setRegistre] = useState(null);
  const [pieceIdentite, setPieceIdentite] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!registre || !pieceIdentite) {
      alert("Les deux fichiers sont obligatoires.");
      return;
    }

    const formData = new FormData();
    formData.append("pieceIdentite", pieceIdentite);       // ✅ nom conforme
    formData.append("registreCommerce", registre);         // ✅ nom conforme

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:5001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploading(false);
      onUploadSuccess(response.data); // Contient les URLs des fichiers uploadés
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      setUploading(false);
      alert("Erreur lors de l'upload des fichiers.");
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Documents obligatoires</h2>
      <div>
        <label className="block">Registre de commerce :</label>
        <input type="file" onChange={(e) => handleFileChange(e, setRegistre)} />
      </div>
      <div>
        <label className="block">Pièce d'identité :</label>
        <input type="file" onChange={(e) => handleFileChange(e, setPieceIdentite)} />
      </div>
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {uploading ? "Envoi en cours..." : "Valider les documents"}
      </button>
    </div>
  );
};

export default FileUploader;