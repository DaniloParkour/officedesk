"use client"

import { MouseEventHandler, useEffect, useRef, useState } from "react";

import { IconPencil, IconBackslash, IconRectangle, IconOvalVertical, IconRectangleFilled, IconOvalVerticalFilled, IconPalette, IconEraser } from "@tabler/icons-react"

interface Point {
  x: number,
  y: number,
}

export default function Draw() {

  let [canvasWidth, setCanvasWidth] = useState<number>(300);
  let [canvasHeight, setCanvasHeight] = useState<number>(300);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let canvas: HTMLCanvasElement | null = null;
  let context2D: CanvasRenderingContext2D | null = null;
  let pointA: Point | null = null;
  let pointB: Point | null = null;

  let tool: "pencil" | "line" | "rect"  | "circle" | "fill_rect"  | "fill_circle" | "erase" = "line";
  let color: { r:number, g:number, b:number } = {r:0, g:0, b:0};
  
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

    context2D.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    context2D.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;

    if(tool === "pencil") {
      //...
    } else if(tool === "line") {
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

    //erase

    pointA = null;
    pointB = null;

  }

  function mouseDown(event: any) {
    getCanvasContex();
    if(!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    pointA = { x, y };
  }

  function mouseUp(event: any) {
    getCanvasContex();
    if(!canvas || pointA == null) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    pointB = { x, y };

    drawNow();
  }
  
  return (
    <div className="flex flex-col">
      <div className="bg-cyan-50 w-full flex justify-between px-1">
        <div className="flex gap-2">
          <IconPencil className="text-cyan-800 hover:text-yellow-500" onClick={() => tool = "pencil"} />
          <IconBackslash className="text-cyan-800 hover:text-yellow-500" onClick={() => tool = "line"} />
          <IconRectangle className="text-cyan-800 hover:text-yellow-500" onClick={() => tool = "rect"} />
          <IconOvalVertical className="text-cyan-800 hover:text-yellow-500" onClick={() => tool = "circle"} />
          <IconRectangleFilled className="text-cyan-800 hover:text-yellow-500" onClick={() => tool = "fill_rect"} />
          <IconOvalVerticalFilled className="text-cyan-800 hover:text-yellow-500" onClick={() => tool = "fill_circle"}/>
        </div>
        <div className="flex gap-4">
          <IconEraser className="text-cyan-800 hover:text-yellow-500" onClick={() => tool = "erase"} />
          <IconPalette className="text-cyan-800 hover:text-yellow-500" />
        </div>
      </div>
      <canvas onMouseDown={mouseDown} onMouseUp={mouseUp} ref={canvasRef} className="bg-white shadow-md"
        height={canvasHeight}
        width={canvasWidth}
      />
    </div>
  );
}
