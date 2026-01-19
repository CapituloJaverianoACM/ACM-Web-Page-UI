"use client";

import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { MatchmakingTreeNode } from "@/models/matchmaking.model";
import TreeNode from "./tree-node";
import { Student } from "@/models/student.model";
import { TreeStudentInfo } from "@/controllers/contest.controller";

interface MatchmakingTreeProps {
  tree: MatchmakingTreeNode | null;
  students: Array<TreeStudentInfo>;
}

// Interfaz para el formato de react-d3-tree
interface D3TreeNode {
  name: string;
  children?: D3TreeNode[];
  student?: TreeStudentInfo;
}
// Convertir árbol binario a formato de react-d3-tree
const convertToD3Tree = (
  node: MatchmakingTreeNode | null,
  students: Array<TreeStudentInfo>,
): D3TreeNode | null => {
  if (!node) return null;

  const d3Node: D3TreeNode = {
    name: node.student_id !== null ? `ID: ${node.student_id}` : "Vacío",
    children: [],
  };

  if (node.student_id != null)
    d3Node.student = students.find((student) => student.id == node.student_id);

  if (node.left) {
    const leftChild = convertToD3Tree(node.left, students);
    if (leftChild) d3Node.children?.push(leftChild);
  }

  if (node.right) {
    const rightChild = convertToD3Tree(node.right, students);
    if (rightChild) d3Node.children?.push(rightChild);
  }

  return d3Node;
};

export default function MatchmakingTree({
  tree,
  students,
}: MatchmakingTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const d3TreeData = convertToD3Tree(tree, students);

  if (!tree) {
    return (
      <div className="flex items-center justify-center p-8 text-(--black)/50">
        No hay árbol de matchmaking disponible
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mb-10 w-full rounded-md min-h-[600px] h-[50vh] overflow-hidden bg-white/20 backdrop-blur-lg border border-white"
    >
      {d3TreeData && (
        <Tree
          data={d3TreeData}
          orientation="vertical"
          pathFunc="straight"
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
