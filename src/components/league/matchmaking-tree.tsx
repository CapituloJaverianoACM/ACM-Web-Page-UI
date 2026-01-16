"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { MatchmakingTreeNode } from "@/models/matchmaking.model";
import TreeNode from "./tree-node";
import { Student } from "@/models/student.model";
import { getStudentById } from "@/controllers/student.controller";

interface MatchmakingTreeProps {
  tree: MatchmakingTreeNode | null;
}

// Interfaz para el formato de react-d3-tree
interface D3TreeNode {
  name: string;
  children?: D3TreeNode[];
  student?: Student;
}
// Convertir árbol binario a formato de react-d3-tree
const convertToD3Tree = async (
  node: MatchmakingTreeNode | null,
): Promise<D3TreeNode | null> => {
  if (!node) return null;

  const d3Node: D3TreeNode = {
    name: node.student_id !== null ? `ID: ${node.student_id}` : "Vacío",
    children: [],
  };

  if (node.student_id != null)
    d3Node.student = await getStudentById(node.student_id);

  if (node.left) {
    const leftChild = await convertToD3Tree(node.left);
    if (leftChild) d3Node.children?.push(leftChild);
  }

  if (node.right) {
    const rightChild = await convertToD3Tree(node.right);
    if (rightChild) d3Node.children?.push(rightChild);
  }

  return d3Node;
};

export default function MatchmakingTree({ tree }: MatchmakingTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [d3TreeData, setTreeData] = useState<D3TreeNode | null>(null);

  useEffect(() => {
    convertToD3Tree(tree).then(setTreeData);
  }, []);

  if (!tree) {
    return (
      <div className="flex items-center justify-center p-8 text-[color:var(--black)]/50">
        No hay árbol de matchmaking disponible
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full rounded-[var(--radius-md)] overflow-hidden border-2 border-[#dde5f8]"
      style={{
        minHeight: "600px",
        height: "50vh",
        background: `linear-gradient(135deg, 
          rgba(221, 229, 248, 0.15) 0%, 
          rgba(58, 117, 255, 0.08) 50%,
          rgba(0, 74, 245, 0.05) 100%)`,
        boxShadow: "var(--shadow-lg)",
      }}
    >
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
