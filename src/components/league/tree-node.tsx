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

const NODE_RADIUS: number = 55;

export default function TreeNode({
  nodeDatum,
  toggleNode,
  onClick,
}: TreeNodeProps) {
  // Determinar color basado en si tiene hijos
  const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
  const isLeaf = !hasChildren;

  const fillColor = isLeaf
    ? "#ffffff" // azul-electrico
    : nodeDatum.children && nodeDatum.children.length === 2
      ? "#ffffff" // azul-crayon
      : "#ffffff"; // azul-ultramar

  // Extraer el ID del nombre o usar el prop
  const studentId =
    nodeDatum.student_id ??
    (nodeDatum.name?.includes("ID:")
      ? parseInt(nodeDatum.name.split(":")[1]?.trim() || "0")
      : null);

  return (
    <g onClick={toggleNode}>
      <circle
        r={NODE_RADIUS}
        fill={fillColor}
        style={{
          cursor: "pointer",
          filter: "drop-shadow(0 4px 6px rgba(0, 8, 27, 0.15))",
          transition: "all 300ms ease-in-out",
        }}
        className="hover:opacity-90"
      />
      <foreignObject width={100} height={100} x={-50} y={-50}>
        <div>
          <p className="text-center">{studentId}</p>
        </div>
      </foreignObject>
    </g>
  );
}
