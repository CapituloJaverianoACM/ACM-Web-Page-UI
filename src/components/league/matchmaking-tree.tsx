"use client";

import { useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import { MatchmakingTreeNode } from "@/models/matchmaking.model";
import TreeNode from "./tree-node";

interface MatchmakingTreeProps {
  tree: MatchmakingTreeNode | null;
}

// Interfaz para el formato de react-d3-tree
interface D3TreeNode {
  name: string;
  nodeSvgShape?: {
    shapeProps?: {
      fill: string;
      stroke: string;
      strokeWidth: number;
      r: number;
    };
  };
  children?: D3TreeNode[];
}

export default function MatchmakingTree({ tree }: MatchmakingTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!tree) {
    return (
      <div className="flex items-center justify-center p-8 text-[color:var(--black)]/50">
        No hay árbol de matchmaking disponible
      </div>
    );
  }

  // Convertir árbol binario a formato de react-d3-tree
  const convertToD3Tree = (
    node: MatchmakingTreeNode | null,
  ): D3TreeNode | null => {
    if (!node) return null;

    const isLeaf = !node.left && !node.right;
    // Usar colores hexadecimales directos para SVG (las variables CSS no funcionan en SVG)
    const fillColor = isLeaf
      ? "#004af5" // azul-electrico - hojas
      : node.left && node.right
        ? "#3a75ff" // azul-crayon - nodos internos con 2 hijos
        : "#022983"; // azul-ultramar - nodos internos con 1 hijo

    const d3Node: D3TreeNode = {
      name: node.student_id !== null ? `ID: ${node.student_id}` : "Vacío",
      nodeSvgShape: {
        shapeProps: {
          fill: fillColor,
          stroke: "#dde5f8", // azul-niebla
          strokeWidth: 2.5,
          r: 55,
        },
      },
      children: [],
    };

    if (node.left) {
      const leftChild = convertToD3Tree(node.left);
      if (leftChild) d3Node.children?.push(leftChild);
    }

    if (node.right) {
      const rightChild = convertToD3Tree(node.right);
      if (rightChild) d3Node.children?.push(rightChild);
    }

    return d3Node;
  };

  const d3TreeData = convertToD3Tree(tree);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-[var(--radius-md)] overflow-hidden border-2 border-[#dde5f8]"
      style={{
        minHeight: "600px",
        height: "100vh",
        background: `linear-gradient(135deg, 
          rgba(221, 229, 248, 0.15) 0%, 
          rgba(58, 117, 255, 0.08) 50%,
          rgba(0, 74, 245, 0.05) 100%)`,
        boxShadow: "var(--shadow-lg)",
      }}
    >
      {/* SVG con definiciones de gradiente para las líneas */}
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="acmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#004af5" /> {/* azul-electrico */}
            <stop offset="50%" stopColor="#3a75ff" /> {/* azul-crayon */}
            <stop offset="100%" stopColor="#022983" /> {/* azul-ultramar */}
          </linearGradient>
        </defs>
      </svg>

      {d3TreeData && (
        <Tree
          data={d3TreeData}
          orientation="vertical"
          pathFunc="diagonal"
          collapsible={true}
          enableLegacyTransitions
          transitionDuration={300}
          zoomable
          draggable
          renderCustomNodeElement={TreeNode}
        />
      )}
    </div>
  );
}
