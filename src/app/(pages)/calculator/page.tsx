"use client"

import { useState } from "react";

export default function Calculator() {

  const [value, setValue] = useState<string>("");

  function getResult() {
    const regexCalulator = /^[0-9+\-*/\s]+$/;
    const justRightCharacters = regexCalulator.test(value);

    if(justRightCharacters) {
      setValue(eval(value));
    }
  }

  function addOpetaror(operator: String) {
    const lastchar = value[value.length-1];

    if(lastchar === ',') return;

    if(lastchar === '+' || lastchar === '-' || lastchar === '*' || lastchar === '/') {
      setValue(value.substring(0, value.length-1) + operator);
    } else {
      setValue(value + operator)
    }
  }

  function calculeSquareRoot() {
    const valueIsANumber = Number.parseFloat(value);
    if(!!valueIsANumber) {
      setValue(Math.sqrt(valueIsANumber).toString());
    }
  }

  function putComma() {
    if(value.length == 0) return;
    
    const regexComma = /^[^,]*$/;
    const canAddComma = regexComma.test(value);

    if(canAddComma) {
      setValue(value + ",");
    }
  }

  return (
    <div>
      <div className="bg-cyan-900 p-4 rounded-xl text-cyan-50 shadow-xl shadow-gray-400">
        <input
          className="h-10 rounded-t-xl rounded-b-md mb-4 px-2 w-full bg-cyan-50 text-cyan-900 text-right text-2xl"
          value={value}
          readOnly
        ></input>
        <div className="grid grid-cols-4 gap-4">
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + '(') }
          >(</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + ')') }
          >)</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => calculeSquareRoot() }
          >√</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ getResult }
          >=</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + '7') }
          >7</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + '8') }
          >8</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + '9') }
          >9</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => addOpetaror('/') }
          >/</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + '4') }
          >4</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + '5') }
          >5</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + '6') }
          >6</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => addOpetaror('*') }
          >*</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + '1') }
          >1</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + '2') }
          >2</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + '3') }
          >3</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => addOpetaror('-') }
          >-</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue("") }
          >C</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => setValue(value + '0') }
          >0</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ putComma }
          >,</button>
          <button 
            className="bg-cyan-100 text-cyan-900 font-bold text-2xl p-2 rounded-xl hover:bg-yellow-100 hover:text-yellow-700"
            onClick={ () => addOpetaror('+') }
          >+</button>
        </div>
      </div>
    </div>
  );
}
