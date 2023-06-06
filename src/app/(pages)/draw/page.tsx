"use client"

import { MouseEventHandler, useEffect, useRef, useState } from "react";

interface Point {
  x: number,
  y: number,
}

export default function Draw() {

  const tool: "pencil" | "line" | "rect"  | "circle" | "fill_rect"  | "fill_circle" = "line";

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let canvas: HTMLCanvasElement | null = null;
  let context2D: CanvasRenderingContext2D | null = null;
  let pointA: Point | null = null;
  let pointB: Point | null = null;

  function getCanvasContex() {
    canvas = canvasRef.current;
    
    if(!canvas) return;
    context2D = canvas.getContext("2d");
    if(!context2D) return;
  }

  function drawNow() {

    if(!context2D) return;
    if(pointA == null || pointB == null) return;

    context2D.fillStyle = "black";

    // context2D.line(pointA.x, pointA.y, pointB.x, pointB.y);

    if(tool === "line") {
      context2D.beginPath();
      context2D.moveTo(pointA.x, pointA.y);
      context2D.lineTo(pointB.x, pointB.y);
      context2D.stroke();
    }

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
      <div className="bg-red-300 w-full">
        T1 - T2 - T3 - T4
      </div>
      <canvas onMouseDown={mouseDown} onMouseUp={mouseUp} ref={canvasRef} className="bg-white shadow-md" width={580} height={620} />
    </div>
  );
}
