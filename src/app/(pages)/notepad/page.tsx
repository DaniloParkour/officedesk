"use client"

import { useRef } from "react";
import { IconBold, IconItalic, IconUnderline, IconStrikethrough, IconAbc, IconLetterCaseUpper, IconLetterCaseLower } from "@tabler/icons-react"
import { split } from "postcss/lib/list";

export default function Notepad() {

  const editorRef = useRef<HTMLDivElement | null>(null);

  //function changeStyle(applyStyle: | "bold" | "italic" | "underline" | "line-through" | "capitalize" | "uppercase" | "lowercase") {
  function changeStyle(applyStyle: string) {
    const editor = editorRef.current;
    const selectedText = window.getSelection()?.toString();

    console.log("Selected Text =  \"" + selectedText + "\"");

    if (selectedText) {
      const span = document.createElement('span');

      applyStyle === "bold" && (span.style.fontWeight = 'bold')
      ||
      applyStyle === "italic" && (span.style.fontStyle = 'italic')
      ||
      applyStyle === "underline" && (span.style.textDecoration = 'underline')
      ||
      applyStyle === "line-through" && (span.style.textDecoration = 'line-through')
      ||
      applyStyle === "capitalize" && (span.style.textTransform = 'capitalize')
      ||
      applyStyle === "uppercase" && (span.style.textTransform = 'uppercase')
      ||
      applyStyle === "lowercase" && (span.style.textTransform = 'lowercase')
      ||
      applyStyle.startsWith("COLOR") && (span.style.color = applyStyle.split(" ")[1])
      ||
      applyStyle.startsWith("BGCOLOR") && (span.style.background = applyStyle.split(" ")[1])
      
      span.textContent = selectedText;

      const range = window.getSelection()?.getRangeAt(0);
      if(range) {
        range.deleteContents();
        range.insertNode(span);
      }
    }
  }

  return <div>
    <div className="flex gap-4">
      <button onClick={() => changeStyle("bold")} ><IconBold/></button> 
      <button onClick={() => changeStyle("italic")} ><IconItalic/></button> 
      <button onClick={() => changeStyle("underline")} ><IconUnderline/></button> 
      <button onClick={() => changeStyle("line-through")} ><IconStrikethrough/></button> 
      <button onClick={() => changeStyle("capitalize")} ><IconAbc/></button> 
      <button onClick={() => changeStyle("uppercase")} ><IconLetterCaseUpper/></button> 
      <button onClick={() => changeStyle("lowercase")} ><IconLetterCaseLower/></button> 
      <div className="flex gap-1 ml-6"><p>Text:</p><input type="color" onChange={(e) => changeStyle("COLOR " + e.target.value)} /></div>
      <div className="flex gap-1"><p>Highlight</p><input type="color" onChange={(e) => changeStyle("BGCOLOR " + e.target.value)} /></div>
    </div>
    <div ref={editorRef} className="border-cyan-600 border-[1px] w-[80vw] h-[80vh] p-2 bg-white" contentEditable="true"></div>
  </div>
}
