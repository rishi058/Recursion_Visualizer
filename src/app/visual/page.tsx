"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  MarkerType
} from "reactflow";
import "reactflow/dist/style.css";
import useWindowDimensions from "../hooks/useWindowDimension";
import { GraphData } from "../interface/graphData";
import { getGeneratedOutput } from "../helper/output";


export default function Visual()  {
  const { width, height } = useWindowDimensions();
  let data  = getGeneratedOutput() as GraphData;

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const [hoveredNodeText, setHoveredNodeText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  let xFactor = 200, yFactor = 120;

  useEffect(()=>{
    if(width!=undefined){
      let shift = (width/2) - nodes[0].position.x;
      let shiftedNodes = nodes.map(node => ({
        ...node,
        position: {
          ...node.position,
          x: node.position.x + shift
        }
      }));
      setNodes(shiftedNodes);
    }
  }, [width]);

    useEffect(() => {

    const manipulatedNodes = data.nodes.map(node => ({
      ...node,
      position: {
        x: node.position.x * xFactor,
        y: node.position.y * yFactor
      }
    }));

    const manipulatedEdges = data.edges.map(edge => ({
      ...edge,
      animated : true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#000000',
      },
      style: {
        strokeWidth: 2,
        stroke: '#000000',
      },
    }));

    setEdges(manipulatedEdges);
  
    setNodes(manipulatedNodes);
  }, [xFactor, yFactor]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleMouseMove = useCallback((event : React.MouseEvent<HTMLElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  }, []);

  // Console.log(Hello)  // this will be printed whenever mouse-cursor mover or window is resize

  return (
    <div style={{ width: "100vw", height: "100vh" }} onMouseMove={handleMouseMove}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeMouseEnter={(event, node) => {
          setHoveredNodeText(node.data.hidden);
        }}
        onNodeMouseLeave={() => {
          setHoveredNodeText('');
        }}
        nodesDraggable={true}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultViewport={{ x: 25, y: 25, zoom: 0.8 }}
      >
        <Controls />
        <MiniMap />
        <Background variant={"dots" as BackgroundVariant} gap={12} size={1} />
      
      </ReactFlow>
      {hoveredNodeText && (
        <div
          style={{
            position: 'fixed',
            left: mousePosition.x + 10,
            top: mousePosition.y + 10,
            padding: 10,
            background: 'white',
            border: '1px solid black',
          }}
        >
          {hoveredNodeText}
        </div>
      )}
    </div>
  );
}
