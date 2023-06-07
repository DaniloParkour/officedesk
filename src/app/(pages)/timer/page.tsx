"use client"

import { useEffect, useRef, useState } from "react";

export default function Timer() {

  const [seconds, setSeconds] = useState(0);
  const [countRunning, setCountRunning] = useState(false);

  const audioAlarmRef = useRef<HTMLAudioElement | null>(null);

  const audioPath = 'alarm.wav';

  let countingTimeoutID: NodeJS.Timeout | null = null;
  
  useEffect(() => {

    if(!countRunning) return;

    if(seconds <= 0) {
      if (audioAlarmRef.current) {
        audioAlarmRef?.current?.play();
      }
      setCountRunning(false);
      return;
    }
    countingTimeoutID = setTimeout(() => { 
      setSeconds(seconds - 1);
    }, 1000);
  }, [countRunning, seconds]);

  function setHourValue(value: number) {
    let minutes_now = calculateMinutesFromSecondsValue();
    let seconds_now = calculateSecondsFromSecondsValue();
    setSeconds( value * 3600 + minutes_now * 60 + seconds_now );
  }
  
  function setMinuteValue(value: number) {
    let hour_now = calculateHourFromSecondsValue();
    let seconds_now = calculateSecondsFromSecondsValue();
    setSeconds( hour_now * 3600 + value * 60 + seconds_now );
  }

  function setSecondState(value: number) {
    let hour_now = calculateHourFromSecondsValue();
    let minutes_now = calculateMinutesFromSecondsValue();
    setSeconds( hour_now * 3600 + minutes_now * 60 + value );
  }

  function startCounter() {
    setCountRunning(true);
  }

  function stopCounter() {
    setCountRunning(false);
    if (countingTimeoutID) {
      clearTimeout(countingTimeoutID);
    }
  }

  function resetCounter() {
    setSeconds(0);
    stopCounter();
  }

  function calculateMinutesFromSecondsValue() {
    return Math.floor((seconds - (Math.floor(seconds/3600) * 3600))/60);
  }

  function calculateHourFromSecondsValue() {
    return Math.floor(seconds/3600);
  }

  function calculateSecondsFromSecondsValue() {
    return seconds%60;
  }

  return(
    <div>
      <audio src={audioPath} ref={audioAlarmRef} />
      <div className="flex items-center">
        <div>
          <p className="mx-auto text-center font-bold">Hours</p>
          <input readOnly={countRunning} type="number" max={99} className="w-32 h-28 text-center text-6xl bg-cyan-50 text-cyan-900 rounded-2xl" value={calculateHourFromSecondsValue()} onChange={(e) => setHourValue(Number.parseInt(e.target.value))}/>
        </div>
        <span className="text-6xl mx-2 text-cyan-900">:</span>
        <div>
          <p className="mx-auto text-center font-bold">Minutes</p>
        <input readOnly={countRunning} type="number" max={59} className="w-32 h-28 text-center text-6xl bg-cyan-50 text-cyan-900 rounded-2xl" value={calculateMinutesFromSecondsValue()} onChange={(e) => setMinuteValue(Number.parseInt(e.target.value))}/>
        </div>
        <span className="text-6xl mx-2 text-cyan-900">:</span>
        <div>
          <p className="mx-auto text-center font-bold">Seconds</p>
          <input readOnly={countRunning} type="number" max={59} className="w-32 h-28 text-center text-6xl bg-cyan-50 text-cyan-900 rounded-2xl" value={calculateSecondsFromSecondsValue()} onChange={(e) => setSecondState(Number.parseInt(e.target.value))}/>
        </div>
      </div>
      <div className="flex p-4 mt-2 justify-between">
        <button className="bg-red-400 text-cyan-50 px-4 py-2 rounded-xl w-[40%]" onClick={stopCounter}>Stop</button>
        { !countRunning && <button className="bg-cyan-800 text-cyan-50 px-4 py-2 rounded-xl w-[40%]" onClick={startCounter}>Start</button> }
        { countRunning && <button className="bg-green-700 text-green-50 px-4 py-2 rounded-xl w-[40%]" onClick={resetCounter}>Reset</button> }
      </div>
    </div>
  );
}
