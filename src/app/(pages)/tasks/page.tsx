"use client"


import TaskItemList from "@/app/components/tasks/TaskItemList";
import { useRef, useState } from "react"

interface Task {
  name: string,
  timeLeft: number,
  stoped: boolean,
}

export default function Tasks() {

  const [tasks, setTasks] = useState<Array<Task>>(new Array<Task>());
  const [newTask, setNewTask] = useState<Task>({name: "", timeLeft: 0, stoped: true});
  const [showMessageNameIsUsed, setShowMessageNameIsUsed] = useState<boolean>(false);

  const audioAlarmRef = useRef<HTMLAudioElement | null>(null);

  function deleteTask(index: number ) {
    setTasks(tasks.filter((task, indexMap) => {
      if(indexMap != index) return task;
    }));
  }

  function addNewTask() {
    
    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].name === newTask.name) {
        setShowMessageNameIsUsed(true);
        return;
      }
    }
    
    setTasks([...tasks, newTask])
  }

  return <div className="w-full h-full lg:w-[80%] p-4 pt-14">

    <audio src='alarm.wav' ref={audioAlarmRef} />

    { showMessageNameIsUsed && <p className="text-red-500 text-sm">The name is already in use</p> }
    <div className="flex gap-2 pb-4 border-b-2 border-b-cyan-800 border-opacity-10">
      <input
        value={ newTask.name }
        onChange={ (targetElement) => 
          { 
            { showMessageNameIsUsed && setShowMessageNameIsUsed(false); }
            setNewTask({ name: targetElement.target.value, timeLeft: newTask.timeLeft, stoped: newTask.stoped }) 
          } }
        placeholder="Task name" className="w-[80%]"
      />
      <input
        value={ newTask.timeLeft > 0 ? Math.floor(newTask.timeLeft / 60) : ""}
        type="number"
        placeholder="minutes"
        onChange={(targetElement) => { setNewTask({ name: newTask.name, timeLeft: Number.parseInt(targetElement.target.value) * 60, stoped: newTask.stoped }) } }
        className="w-[10%]"
      />
      <button className="w-[10%] bg-cyan-700 p-1 text-cyan-100 font-bold hover:bg-yellow-500" onClick={addNewTask}>ADD</button>
    </div>

    <div className="mt-4 bg-cyan-700 p-[1px]">
      <h2 className="bg-cyan-700 text-cyan-50 p-1 font-bold px-1">Tasks List</h2>
      <ul>
        {tasks.map((task,index) => (
          <TaskItemList key={task.name} index={index} name={task.name} stoped={task.stoped} timeLeft={task.timeLeft} delete={deleteTask} finishedTask={() => { audioAlarmRef?.current?.play(); }} />
        ))}
      </ul>
    </div>

  </div>
}
