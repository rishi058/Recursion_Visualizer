let generatedOutput: any;

export function setGeneratedOutput(output: string) {
  try {
    generatedOutput = JSON.parse(output);

    // Validate the structure of the parsed output
    if (
      !generatedOutput ||
      !Array.isArray(generatedOutput.nodes) ||
      !Array.isArray(generatedOutput.edges) ||
      generatedOutput.nodes.length === 0
    ) {
      generatedOutput = {
        edges: [],
        nodes: [
          {
            id: "1",
            position: { x: 0, y: 0 },
            data: { label: "Incorrect Output", hidden: "" },
          },
        ],
      };
    }
  } catch (e) {
    generatedOutput = {
      edges: [],
      nodes: [
        {
          id: "1",
          position: { x: 0, y: 0 },
          data: { label: "Incorrect Output", hidden: "" },
        },
      ],
    };
  }
}
export function getGeneratedOutput() {
  return generatedOutput;
}