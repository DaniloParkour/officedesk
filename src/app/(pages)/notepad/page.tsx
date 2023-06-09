"use client"

import { useRef } from "react";
import { IconBold, IconItalic, IconUnderline, IconStrikethrough, IconAbc, IconLetterCaseUpper, IconLetterCaseLower } from "@tabler/icons-react"

export default function Notepad() {

  const editorRef = useRef<HTMLDivElement | null>(null);

  function changeStyle(applyStyle: | "bold" | "italic" | "underline" | "line-through" | "capitalize" | "uppercase" | "lowercase") {
    const editor = editorRef.current;
    const selectedText = window.getSelection()?.toString();

    console.log("Selected Text =  \"" + selectedText + "\"");

    if (selectedText) {
      const span = document.createElement('span');

      applyStyle === "bold" && (span.style.fontWeight = 'bold');
      applyStyle === "italic" && (span.style.fontStyle = 'italic'); //normal
      applyStyle === "underline" && (span.style.textDecoration = 'underline'); //normal
      applyStyle === "line-through" && (span.style.textDecoration = 'line-through'); //normal
      applyStyle === "capitalize" && (span.style.textTransform = 'capitalize'); //none
      applyStyle === "uppercase" && (span.style.textTransform = 'uppercase'); //none
      applyStyle === "lowercase" && (span.style.textTransform = 'lowercase'); //none
      
      span.textContent = selectedText;

      const range = window.getSelection()?.getRangeAt(0);
      if(range) {
        range.deleteContents();
        range.insertNode(span);
      }
    }
  }

  function setColor() {
    //...
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
    </div>
    <div ref={editorRef} className="border-cyan-600 border-[1px] w-[80vw] h-[80vh] p-2 bg-white" contentEditable="true"></div>
  </div>
}
