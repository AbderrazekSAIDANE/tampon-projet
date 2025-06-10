import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PersonnalisationForm() {
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState("");
  const [registreCommerce, setRegistreCommerce] = useState(null);
  const [pieceIdentite, setPieceIdentite] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categorie || !registreCommerce || !pieceIdentite) {
      alert("Veuillez remplir tous les champs et déposer les deux fichiers.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("registreCommerce", registreCommerce);
    formData.append("pieceIdentite", pieceIdentite);

    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors du téléversement.");

      const justificatifs = {
        registreCommerceUrl: data.registreCommerceUrl,
        pieceIdentiteUrl: data.pieceIdentiteUrl,
      };

      navigate(`/personnalisation/${categorie}`, {
        state: { justificatifs },
      });
    } catch (error) {
      alert("Erreur : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Commencer la personnalisation</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Choisissez la forme :</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">-- Sélectionner --</option>
            <option value="rectangle">Rectangle</option>
            <option value="rond">Rond</option>
            <option value="ovale">Ovale</option>
            <option value="dateur">Dateur</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Registre de commerce :</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, setRegistreCommerce)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Pièce d'identité :</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, setPieceIdentite)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Téléversement..." : "Continuer la personnalisation"}
        </button>
      </form>
    </div>
  );
}
