
export interface GraphData {
    edges: Edge[];
    nodes: Node[];
  }
  
  interface Edge {
    id: string;
    source: string;
    target: string;
  }
  
  interface Node {
    id: string;
    position: {
        x: number;
        y: number;
    };
    data: {
        label: string;
        hidden: string;
    };
  }
  