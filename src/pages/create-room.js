// src/pages/create-room.js

import { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

export default function CreateRoom() {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState('black');
  const [brushWidth, setBrushWidth] = useState(2);

  useEffect(() => {
    // Initialize Fabric.js Canvas
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true, // Enable freehand drawing mode
    });

    // Set default drawing styles
    fabricCanvas.freeDrawingBrush.color = brushColor;
    fabricCanvas.freeDrawingBrush.width = brushWidth;

    // Store the Fabric.js canvas in a ref for future use
    fabricCanvasRef.current = fabricCanvas;

    // Cleanup on unmount
    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Function to update drawing color
  const changeColor = (color) => {
    setBrushColor(color);
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.freeDrawingBrush.color = color;
    }
  };

  // Function to update brush size
  const changeBrushSize = (size) => {
    setBrushWidth(size);
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.freeDrawingBrush.width = size;
    }
  };

  // Function to enable eraser
  const enableEraser = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.isDrawingMode = true;
      fabricCanvasRef.current.freeDrawingBrush.color = 'white'; // White acts as the eraser
    }
  };

  return (
    <div>
      {/* Tool Buttons */}
      <div style={{ marginBottom: '10px' }}>
        {/* Color Buttons */}
        <button onClick={() => changeColor('black')}>Black</button>
        <button onClick={() => changeColor('red')}>Red</button>
        <button onClick={() => changeColor('blue')}>Blue</button>
        <button onClick={() => changeColor('green')}>Green</button>

        {/* Brush Size Buttons */}
        <button onClick={() => changeBrushSize(2)}>Small</button>
        <button onClick={() => changeBrushSize(5)}>Medium</button>
        <button onClick={() => changeBrushSize(10)}>Large</button>

        {/* Eraser Button */}
        <button onClick={enableEraser}>Eraser</button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          backgroundColor: 'white',
          cursor: 'crosshair',
        }}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </div>
  );
}
