"use client"

import { IconPlayerPauseFilled, IconPlayerPlayFilled, IconTrashFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface Props {
  index: number,
  name: string,
  timeLeft: number,
  stoped: boolean,
  delete: (index: number) => void,
  finishedTask: (index: number) => void,
}

export default function TaskItemList(props: Props) {

  const [timeLeftCounting, setTimeLeftCounting] = useState<number>(props.timeLeft);
  const [countRunning, setCountRunning] = useState<boolean>(!props.stoped);

  let countingTimeoutID: NodeJS.Timeout | null = null;

  useEffect(() => {

    if(!countRunning) return;

    if(timeLeftCounting <= 0) {
      props.finishedTask(props.index);
      setCountRunning(false);
      return;
    }

    countingTimeoutID = setTimeout(() => { 
      setTimeLeftCounting(timeLeftCounting - 1);
    }, 1000);

  }, [countRunning, timeLeftCounting]);

  function playTask() {
    if(timeLeftCounting > 0) 
      setCountRunning(true);    
  }

  function pauseTask() {
    setCountRunning(false);
    if (countingTimeoutID) {
      clearTimeout(countingTimeoutID);
    }
  }

  return(
    <li
      key={props.index}
      className={
        `flex p-1
        ${ props.index % 2 === 1 ? "bg-cyan-600 text-cyan-100" : "bg-cyan-100 text-cyan-600" }
        ${ timeLeftCounting <= 0 && "bg-red-200 text-red-500" }
        `}>{
      <>
        <p className="w-[80%]">{props.name}</p>
        <p className="w-[10%]">{timeLeftCounting}</p>
        {
          (timeLeftCounting > 0)
          &&
          (
            !countRunning
            &&
            <IconPlayerPlayFilled className="w-[10%] hover:text-yellow-500" onClick={playTask} />
            ||
            <IconPlayerPauseFilled className="w-[10%] hover:text-yellow-500" onClick={pauseTask} />
          )
          ||
            <IconTrashFilled className="w-[10%] hover:text-yellow-500" onClick={ () => { (timeLeftCounting <= 0) && props.delete(props.index)} } />
        }
      </>
    }</li>
  );
}
