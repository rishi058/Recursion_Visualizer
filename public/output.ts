let generatedOutput : any;

export function setGeneratedOutput(output : string) {
    try {
        generatedOutput = JSON.parse(output);
    }
    catch (e) {
        generatedOutput = {
            "edges" : [],
            "nodes" : [{ "id": "1", "position": {"x": 0, "y": 0}, "data": { "label": "Incorrect Output", "hidden": ""} }]
        };
    }
}

export function getGeneratedOutput() {
    return generatedOutput;
}
