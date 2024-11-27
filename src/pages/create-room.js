import { useEffect, useRef, useState } from 'react';
import { AppBar, Box, Button, Toolbar, Select, MenuItem, TextField } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import BrushIcon from '@mui/icons-material/Brush';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import EraserIcon from '@mui/icons-material/DeleteForever';
function MenuButton({ icon, onClick }) {
  return (
    <Button
      sx={{
        color: "white", 
        border: "solid",
        marginRight: "8px",
      }}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}

export default function CreateRoom() {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(5);
  const [brushType, setBrushType] = useState('PencilBrush');

  function toggleDrawing() {
    if (fabricCanvasRef.current) {
      const newDrawingMode = !fabricCanvasRef.current.isDrawingMode;
      fabricCanvasRef.current.isDrawingMode = newDrawingMode;
      setIsDrawing(newDrawingMode);
    }
  }

  function clearCanvas() {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('fabric').then((fabric) => {
        if (fabricCanvasRef.current) {
          fabricCanvasRef.current.dispose();
        }
        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);
        const canvas = fabricCanvasRef.current;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = brushWidth;

        fabric.Object.prototype.transparentCorners = false;
        canvas.setWidth(window.innerWidth);
        canvas.setHeight(window.innerHeight - 64);
        canvas.renderAll();
      });
    }
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (fabricCanvasRef.current && fabricCanvasRef.current.freeDrawingBrush) {
      fabricCanvasRef.current.freeDrawingBrush.color = brushColor;
      fabricCanvasRef.current.freeDrawingBrush.width = brushWidth;
    }
  }, [brushColor, brushWidth]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      import('fabric').then((fabric) => {
        fabricCanvasRef.current.freeDrawingBrush = new fabric[brushType](fabricCanvasRef.current);
        fabricCanvasRef.current.freeDrawingBrush.color = brushColor;
        fabricCanvasRef.current.freeDrawingBrush.width = brushWidth;
      });
    }
  }, [brushType]);

  return (
    <Box>
      <AppBar position="fixed"> 
        <Toolbar 
        sx= {{
          bgcolor: "#B7574B",
          display: "flex",
          flexDirection: "row",
          
        }}
        >
         <MenuButton value="PencilBrush" icon={<ModeIcon />} onClick={toggleDrawing}/>
         <MenuButton icon={<BrushIcon />} onClick={() => setBrushType("SprayBrush")}/>
         <MenuButton icon={<PanoramaFishEyeIcon />} onClick={() => setBrushType("CircleBrush")}/>
         <Button onClick={clearCanvas}
          sx= {{
            marginRight: "8px",
            color: "black",
          }}
         ><EraserIcon /></Button>
        <TextField 
          type="color" 
          sx={{ width: "50px", ...sharedTextFieldStyles }}
          value={brushColor} 
          onChange={(e) => setBrushColor(e.target.value)}
        />
        <TextField 
          type="number" 
          sx={{ width: "100px", ...sharedTextFieldStyles }}
          value={brushWidth} 
          onChange={(e) => setBrushWidth(parseInt(e.target.value))}
        />
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: '64px' }}>
        <canvas ref={canvasRef} />
      </Box>
    </Box>
  );
}

const sharedTextFieldStyles = {
  marginRight: "8px",
  "& .MuiInputBase-input": {
    border: "none",
    outline: "none",
  },
  "& .MuiInputBase-input:focus": {
    boxShadow: "0 0 0 2px #FFFFFF", // focus color
    borderRadius: "4px",
  },
};