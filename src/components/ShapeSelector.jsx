// ShapeSelector.jsx
import React from "react";

const ShapeSelector = ({ selectedShape, onSelect }) => {
  const shapes = ["rectangle", "rond", "ovale", "dateur"];

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Choisissez la forme</h2>
      <div className="flex gap-4 flex-wrap">
        {shapes.map((shape) => (
          <button
            key={shape}
            onClick={() => onSelect(shape)}
            className={`px-4 py-2 rounded border ${
              selectedShape === shape ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            {shape}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShapeSelector;
