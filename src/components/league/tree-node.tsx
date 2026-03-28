"use client";

import { IconQuestionMark } from "@tabler/icons-react";
import { D3TreeNode } from "./matchmaking-tree";
import { TreeNodeDatum } from "react-d3-tree";
import { LucideCrown } from "lucide-react";

interface TreeNodeProps {
  nodeDatum: TreeNodeDatum & D3TreeNode;
  toggleNode?: () => void;
  onClick?: () => void;
}

const NODE_RADIUS: number = 55;

export default function TreeNode({
  nodeDatum,
  toggleNode,
  onClick,
}: TreeNodeProps) {
  const fillColor = "#ffffff";
  const isRoot = nodeDatum.__rd3t.depth === 0;
  const isLeaf = !nodeDatum.children || nodeDatum.children.length === 0;
  return (
    <g onClick={toggleNode}>
      <circle
        r={NODE_RADIUS}
        fill={fillColor}
        style={{
          cursor: "pointer",
          filter: "drop-shadow(0 4px 6px rgba(0, 8, 27, 0.15))",
          transition: "all 300ms ease-in-out",
          border: "none",
        }}
        className="hover:opacity-90"
      />
      <foreignObject width={100} height={100} x={-50} y={-50}>
        <div
          className="flex justify-center items-center rounded-full h-25 w-25"
          onClick={() =>
            nodeDatum.student != null &&
            nodeDatum.student.codeforces_handle != null &&
            isLeaf
              ? window.open(
                  "https://codeforces.com/profile/" +
                    nodeDatum.student.codeforces_handle,
                )
              : ""
          }
        >
          {!nodeDatum.student ? (
            <>
              {isRoot ? (
                <LucideCrown
                  className="text-yellow-500"
                  width={90}
                  height={90}
                />
              ) : (
                <IconQuestionMark width={100} height={100} />
              )}
            </>
          ) : (
            <img
              src={
                nodeDatum.student.avatar ||
                process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL
              }
              alt="User"
              className="object-cover w-full h-full block rounded-full"
            />
          )}
        </div>
      </foreignObject>
    </g>
  );
}
