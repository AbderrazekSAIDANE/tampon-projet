import React from "react";
import { Link, useLocation } from "react-router-dom";

const categories = [
  { id: "dateur", label: "Dateur" },
  { id: "rectangle", label: "Rectangle" },
  { id: "ovale", label: "Ovale" },
  { id: "rond", label: "Rond" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <nav className="w-48 bg-gray-100 min-h-screen p-4">
      <h2 className="font-bold mb-4">Nos catégories de tampons</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id} className="mb-2">
            <Link
              to={`/personnalisation/${cat.id}`}
              className={`block px-3 py-2 rounded hover:bg-blue-200 ${
                location.pathname === `/personnalisation/${cat.id}`
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
            >
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
