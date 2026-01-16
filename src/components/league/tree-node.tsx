"use client";

import React from "react";

interface TreeNodeProps {
  nodeDatum: {
    name: string;
    children?: TreeNodeProps["nodeDatum"][];
    student_id?: number | null;
  };
  toggleNode?: () => void;
  onClick?: () => void;
}

export default function TreeNode({
  nodeDatum,
  toggleNode,
  onClick,
}: TreeNodeProps) {
  // Determinar color basado en si tiene hijos
  const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
  const isLeaf = !hasChildren;

  const fillColor = isLeaf
    ? "#004af5" // azul-electrico
    : nodeDatum.children && nodeDatum.children.length === 2
      ? "#3a75ff" // azul-crayon
      : "#022983"; // azul-ultramar

  // Extraer el ID del nombre o usar el prop
  const studentId =
    nodeDatum.student_id ??
    (nodeDatum.name?.includes("ID:")
      ? parseInt(nodeDatum.name.split(":")[1]?.trim() || "0")
      : null);

  return (
    <g onClick={toggleNode}>
      {/* Círculo del nodo */}
      <circle
        r={55}
        fill={fillColor}
        stroke="#dde5f8"
        strokeWidth={2.5}
        style={{
          cursor: "pointer",
          filter: "drop-shadow(0 4px 6px rgba(0, 8, 27, 0.15))",
          transition: "all 300ms ease-in-out",
        }}
        className="hover:opacity-90"
      />

      {/* Texto del ID */}
      <text
        x={0}
        y={-8}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: "12px",
          fontWeight: "600",
          fill: "#dde5f8",
          fontFamily: "Montserrat, sans-serif",
          pointerEvents: "none",
        }}
      >
        ID:
      </text>

      {/* Número del estudiante */}
      <text
        x={0}
        y={12}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: "20px",
          fontWeight: "500",
          fill: "#eeeeee",
          fontFamily: "Montserrat, sans-serif",
          pointerEvents: "none",
        }}
      >
        {studentId !== null && studentId !== 0 ? studentId : "?"}
      </text>
    </g>
  );
}
