# Recursion Visualizer

This tool allows you to generate recursion tree for any custom made C++ recursion function.

## Tech Stack & Libraries.
    1. Next.js + Typescript.
    2. TailWindCSS + Styled Component.
    4. React Hot toast.
    5. Axios.
    6. React Flow.
    7. Code Mirror.
    8. Judge0 CE API - RAPID API.

## How it works ?

    1. The C++ function stores the information about the recursion tree in a adjacency list
       after the execution of recursion function.

    2. Reingold-Tilford Tree Drawing Algorithm is used to assign coordinates to each node of the tree, so the nodes deosn't overlap.

    3. This tree data is used by react-flow library to plot the tree. Adjust 'X' & 'Y'
       parameter using slider to make the plot look better.

## Setup 

To set up this project on your machine, follow these steps:

1. Clone the repository: `git clone git@github.com:rishi058/Recursion_Visualizer.git`
                          or just download the .zip file and extract it.

2. Install dependencies: `npm install`

3. Start the development server: `npm run dev`

## Preview
![Screenshot 2024-07-02 100559](https://github.com/rishi058/Recursion_Visualizer/assets/97884033/1023d448-139e-4725-8824-4ec1527fb08a)
![ok1](https://github.com/rishi058/Recursion_Visualizer/assets/97884033/2b1f5da2-b1b7-4597-9217-2ba170979d04)


## Upcoming Features
    1. Add Support for JAVA, javascript Python.
    2. Code Intellisense.
    3. AI Code Assistent.
    3. Improved UI/UX.

## Bugs
    1. Ineffecient state management.
    
