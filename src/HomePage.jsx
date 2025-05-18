import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  function handleCategorieClick(categorie) {
    navigate(`/personnalisation/${categorie}`);
  }

  /*return (
    <div className="flex">
      <nav className="w-1/4 p-4 bg-gray-100">
        <h2 className="font-bold mb-4">Nos catégories de tampons</h2>
        <ul>
          <li><button onClick={() => handleCategorieClick('professionnel')} className="block w-full text-left p-2 hover:bg-gray-200">Professionnel</button></li>
          <li><button onClick={() => handleCategorieClick('personnel')} className="block w-full text-left p-2 hover:bg-gray-200">Personnel</button></li>
          <li><button onClick={() => handleCategorieClick('administratif')} className="block w-full text-left p-2 hover:bg-gray-200">Administratif</button></li>
        </ul>
      </nav>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Bienvenue sur notre site de tampons</h1>
        <p>Sélectionnez une catégorie à gauche pour personnaliser votre tampon.</p>
      </main>
    </div>
  );*/
}