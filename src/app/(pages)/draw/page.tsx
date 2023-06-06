"use client"

import { MouseEventHandler, useEffect, useRef, useState } from "react";

import { IconPencil, IconBackslash, IconRectangle, IconOvalVertical, IconRectangleFilled, IconOvalVerticalFilled, IconPalette, IconEraser } from "@tabler/icons-react"

interface Point {
  x: number,
  y: number,
}

export default function Draw() {

  const [color, setColor] = useState<string>("#000000");
  const [canvasWidth, setCanvasWidth] = useState<number>(300);
  const [canvasHeight, setCanvasHeight] = useState<number>(300);
  const [toolMode, setTtoolMode] = useState<"pencil" | "dragDrop">("dragDrop");
  const [tool, setTool] = useState<"line" | "rect"  | "circle" | "fill_rect"  | "fill_circle" | "erase">("line");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let canvas: HTMLCanvasElement | null = null;
  let context2D: CanvasRenderingContext2D | null = null;
  let pointA: Point | null = null;
  let pointB: Point | null = null;
  let mouseIsPressed = false;

  useEffect(() => {
    const windowResized = () => {
      setCanvasWidth(window.innerWidth > 640 ? window.innerWidth - 260 : window.innerWidth - 80);
      setCanvasHeight(window.innerHeight - 120);      
    };
    window.addEventListener('resize', windowResized);
    windowResized();
    return () => {
      window.removeEventListener('resize', windowResized);
    };
  }, []);

  function getCanvasContex() {
    canvas = canvasRef.current;
    
    if(!canvas) return;
    context2D = canvas.getContext("2d");
    if(!context2D) return;
  }

  function drawNow() {

    if(!context2D) return;
    if(pointA == null || pointB == null) return;

    context2D.fillStyle = color;
    context2D.strokeStyle = color;

    if(tool === "line") {
      context2D.beginPath();
      context2D.moveTo(pointA.x, pointA.y);
      context2D.lineTo(pointB.x, pointB.y);
      context2D.stroke();
    } else if(tool === "rect")
      context2D.strokeRect(pointA.x, pointA.y, pointB.x - pointA.x, pointB.y - pointA.y);
    else if(tool === "circle" || tool === "fill_circle") {
      context2D.beginPath();
      context2D.ellipse(
        (pointA.x + pointB.x) / 2,
        (pointA.y + pointB.y) / 2,
        Math.abs(pointA.x - pointB.x) / 2,
        Math.abs(pointA.y - pointB.y) / 2,
        0, 0, 2 * Math.PI
      );

      if(tool === "fill_circle")
        context2D.fill();
      else
        context2D.stroke();
    }
    else if(tool === "fill_rect")
      context2D.fillRect(pointA.x, pointA.y, pointB.x - pointA.x, pointB.y - pointA.y);
    else if(tool === "erase")
      //context2D.clearRect(0, 0, canvas?.width || 100, canvas?.height || 100);
      context2D.clearRect(pointA.x, pointA.y, pointB.x - pointA.x, pointB.y - pointA.y);

    pointA = null;
    pointB = null;

  }

  function mouseDown(event: any) {
    getCanvasContex();
    if(!canvas) return;

    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    pointA = { x, y };

    mouseIsPressed = true;
  }

  function mouseUp(event: any) {
    getCanvasContex();
    if(!canvas || pointA == null) return;

    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    pointB = { x, y };

    drawNow();

    mouseIsPressed = false;
  }

  function mouseMove(event: any) {
    if(mouseIsPressed && toolMode === "pencil") {
    
      getCanvasContex();
      if(!canvas) return;

      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;

      if(!pointA) {
        pointA = { x, y };
        return;
      }

      pointB = { x, y };

      drawNow();

      pointA = { x, y };
    }
  }
  
  return (
    <div className="flex flex-col">
      <div className="bg-cyan-50 w-full flex justify-between px-1">
        <div className="flex gap-2">
          <IconPencil className={`text-cyan-800 hover:text-yellow-500 ${toolMode.toString() === "pencil" && "text-yellow-600"}`} onClick={() => setTtoolMode(toolMode === "pencil" ? "dragDrop" : "pencil")} />
          <IconBackslash className={`text-cyan-800 hover:text-yellow-500 ${tool.toString() === "line" && "text-yellow-600"}`} onClick={() => setTool("line")} />
          <IconRectangle className={`text-cyan-800 hover:text-yellow-500 ${tool.toString() === "rect" && "text-yellow-600"}`} onClick={() => setTool("rect")} />
          <IconOvalVertical className={`text-cyan-800 hover:text-yellow-500 ${tool.toString() === "circle" && "text-yellow-600"}`} onClick={() => setTool("circle")} />
          <IconRectangleFilled className={`text-cyan-800 hover:text-yellow-500 ${tool.toString() === "fill_rect" && "text-yellow-600"}`} onClick={() => setTool("fill_rect")} />
          <IconOvalVerticalFilled className={`text-cyan-800 hover:text-yellow-500 ${tool.toString() === "fill_circle" && "text-yellow-600"}`} onClick={() => setTool("fill_circle")}/>
        </div>
        <div className="flex gap-4">
          <IconEraser className={`text-cyan-800 hover:text-yellow-500 ${tool.toString() === "erase" && "text-yellow-600"}`} onClick={() => setTool("erase")} />
          <input type="color" id="cor" name="cor" value={color} onChange={(e) => setColor(e.target.value)} className="relative z-0" />
        </div>
      </div>
      <canvas
        onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}
        ref={canvasRef} className="bg-white shadow-md"
        height={canvasHeight}
        width={canvasWidth}
      />
    </div>
  );
}
