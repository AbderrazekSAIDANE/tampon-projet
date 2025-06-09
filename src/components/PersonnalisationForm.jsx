import React, { useState } from "react";
import axios from "axios";

const PersonnalisationForm = ({ shape, documents }) => {
  const [textTop, setTextTop] = useState("");
  const [textMiddle, setTextMiddle] = useState("");
  const [textBottom, setTextBottom] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const orderData = {
      shape,
      textTop,
      textMiddle,
      textBottom,
      documents, // contient les URLs { registreUrl, pieceIdentiteUrl }
    };

    try {
      setSubmitting(true);
      await axios.post("http://localhost:5001/api/commandes", orderData);
      alert("Commande enregistrée avec succès !");
      // redirection ou reset possible ici
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement de la commande.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Personnalisation du tampon ({shape})</h2>

      <div>
        <label className="block">Texte haut incurvé :</label>
        <input
          type="text"
          value={textTop}
          onChange={(e) => setTextTop(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div>
        <label className="block">Texte au milieu :</label>
        <input
          type="text"
          value={textMiddle}
          onChange={(e) => setTextMiddle(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div>
        <label className="block">Texte bas incurvé :</label>
        <input
          type="text"
          value={textBottom}
          onChange={(e) => setTextBottom(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitting ? "Envoi en cours..." : "Valider la commande"}
      </button>
    </div>
  );
};

export default PersonnalisationForm;
