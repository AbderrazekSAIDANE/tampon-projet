// PersonnalisationPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const taillesDisponibles = {
  rectangle: {
    "47x18": { width: 47, height: 18 },
    "26x9": { width: 26, height: 9 },
    "38x14": { width: 38, height: 14 },
    "58x22": { width: 58, height: 22 },
  },
  rond: {
    "30x30": { width: 30, height: 30 },
    "40x40": { width: 40, height: 40 },
  },
  ovale: {
    "45x30": { width: 45, height: 30 },
    "60x40": { width: 60, height: 40 },
  },
  dateur: {
    "38x14": { width: 38, height: 14 },
  },
};

const policesDisponibles = ["Arial", "Times New Roman", "Courier New", "Verdana"];

export default function PersonnalisationPage() {
  const { categorie } = useParams();
  const nomCategorie = categorie || "";
  const taillesForme = taillesDisponibles[categorie] || {};
  const tailleKeys = Object.keys(taillesForme);

  const [tailleKey, setTailleKey] = useState(tailleKeys[0] || "");
  const [texteHaut, setTexteHaut] = useState("");
  const [texteMilieu, setTexteMilieu] = useState("Votre texte ici");
  const [texteBas, setTexteBas] = useState("");
  const [facteurZoom, setFacteurZoom] = useState(5);
  const [police, setPolice] = useState("Arial");
  const [taillePolice, setTaillePolice] = useState(14);
  const [afficherReel, setAfficherReel] = useState(false);

  useEffect(() => {
    setFacteurZoom(3);
    setTexteHaut("");
    setTexteMilieu("Votre texte ici");
    setTexteBas("");
  }, [categorie]);

  const { width = 0, height = 0 } = taillesForme[tailleKey] || {};
  const pxWidth = width * 3.78 * (afficherReel ? 1 : facteurZoom);
  const pxHeight = height * 3.78 * (afficherReel ? 1 : facteurZoom);
  const fontSize = taillePolice * (afficherReel ? 1 : facteurZoom);
  const couleurContour = "black";
  const couleurTexte = "black";

  const renderCurvedText = (text, isTop, pxW, pxH, font, size, color) => {
    const yPos = pxH / 2;
    const radiusX = pxW * 0.4;
    const radiusY = pxH * 0.4;
    const sweepFlag = isTop ? 1 : 0;
    const pathId = `curve-${isTop ? "top" : "bottom"}`;
    const startX = pxW * 0.1;
    const endX = pxW * 0.9;
    const pathD = `M ${startX} ${yPos} A ${radiusX} ${radiusY} 0 0 ${sweepFlag} ${endX} ${yPos}`;

    return (
      <svg
        viewBox={`0 0 ${pxW} ${pxH}`}
        width={pxW}
        height={pxH}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>
        <text
          fill={color}
          fontSize={size}
          fontFamily={font}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <textPath href={`#${pathId}`} startOffset="50%">
            {text}
          </textPath>
        </text>
      </svg>
    );
  };

  return (
    <div className="p-6 space-y-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold">Personnalisation : {nomCategorie}</h1>

      <div className="flex gap-4 flex-wrap">
        <div>
          <label>Taille :</label>
          <select
            value={tailleKey}
            onChange={(e) => setTailleKey(e.target.value)}
            className="border p-1"
          >
            {tailleKeys.map((k) => (
              <option key={k} value={k}>{k} mm</option>
            ))}
          </select>
        </div>

        <div>
          <label>Zoom :</label>
          <input
            type="number"
            value={facteurZoom}
            min={1}
            max={20}
            onChange={(e) => setFacteurZoom(Number(e.target.value))}
            className="border p-1 w-20"
          />
        </div>

        <div>
          <label>Police :</label>
          <select
            value={police}
            onChange={(e) => setPolice(e.target.value)}
            className="border p-1"
          >
            {policesDisponibles.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Taille police :</label>
          <input
            type="number"
            value={taillePolice}
            min={6}
            max={48}
            onChange={(e) => setTaillePolice(Number(e.target.value))}
            className="border p-1 w-20"
          />
        </div>
      </div>

      {(categorie === "rond" || categorie === "ovale") && (
        <>
          <input
            type="text"
            value={texteHaut}
            onChange={(e) => setTexteHaut(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Ligne cercle extérieur haut"
          />
          <input
            type="text"
            value={texteBas}
            onChange={(e) => setTexteBas(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Ligne cercle extérieur bas"
          />
        </>
      )}

      <textarea
        value={texteMilieu}
        onChange={(e) => setTexteMilieu(e.target.value)}
        className="w-full border rounded p-2"
        rows={4}
        placeholder="Ligne(s) milieu"
      />

      {categorie === "ovale" ? (
        <svg
          width={pxWidth}
          height={pxHeight}
          viewBox={`0 0 ${pxWidth} ${pxHeight}`}
          style={{ display: "block", background: "white" }}
        >
          <ellipse
            cx={pxWidth / 2}
            cy={pxHeight / 2}
            rx={pxWidth / 2 - 3}
            ry={pxHeight / 2 - 3}
            fill="white"
            stroke={couleurContour}
            strokeWidth="3"
          />
          {texteHaut && renderCurvedText(texteHaut, true, pxWidth, pxHeight, police, fontSize, couleurTexte)}
          {texteBas && renderCurvedText(texteBas, false, pxWidth, pxHeight, police, fontSize, couleurTexte)}
          <foreignObject x={0} y={0} width={pxWidth} height={pxHeight} style={{ pointerEvents: "none" }}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: `${fontSize}px`,
                fontFamily: police,
                textAlign: "center",
                color: couleurTexte,
                whiteSpace: "pre-line",
                lineHeight: 1,
              }}
            >
              {texteMilieu}
            </div>
          </foreignObject>
        </svg>
      ) : (
        <div
          style={{
            position: "relative",
            width: `${pxWidth}px`,
            height: `${pxHeight}px`,
            border: `3px solid ${couleurContour}`,
            borderRadius: categorie === "rond" ? "50%" : "0",
            fontSize: `${fontSize}px`,
            fontFamily: police,
            background: "white",
            overflow: "hidden",
            color: couleurTexte,
          }}
        >
          {renderCurvedText(texteHaut, true, pxWidth, pxHeight, police, fontSize, couleurTexte)}
          {renderCurvedText(texteBas, false, pxWidth, pxHeight, police, fontSize, couleurTexte)}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              whiteSpace: "pre-line",
              lineHeight: 1,
              padding: "4px",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {texteMilieu}
          </div>
        </div>
      )}

      <button
        onClick={() => setAfficherReel((prev) => !prev)}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        {afficherReel ? "Revenir au zoom" : "Afficher en taille réelle"}
      </button>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Ajouter au panier
      </button>
    </div>
  );
}
