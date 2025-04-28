"use client"

import { useState } from "react";
import { Task } from "@/types/task";

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const handleAddTask = () => {
    if (newTaskTitle?.trim() === "") return

    const newTask: Task = {
      id: Date?.now().toString(),
      title: newTaskTitle,
      completed: false,
      createdAt: new Date()
    }

    setTasks(prevTasks => [...prevTasks,newTask])
    setNewTaskTitle("")
  }

  return (
    <main className="p-4">
      <h1 className="mb-4">مدیریت وظایف</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="عنوان تسک جدید"
          className="rounded border p-2 flex-1" />
        <button onClick={handleAddTask} className="bg-blue-500 text-white rounded p-2">افزودن</button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task: Task) => (
          <li key={task?.id} className="border p-2 rounded">
            <div className="flex justify-between items-center">
              <span className={task?.completed ? "line-through text-gray-400" : ""}>
                {task?.title}
              </span>
              <button className="text-blue-500">تکمیل</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
