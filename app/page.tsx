"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const handleAddTask = () => {
    if (newTaskTitle?.trim() === "") return;

    const newTask: Task = {
      id: Date?.now().toString(),
      title: newTaskTitle,
      completed: false,
      createdAt: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle("");
  };

  const handleToggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEdit = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: title } : task
      )
    );
    setTitle("");
  };

  const handleDelete = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <main className="p-4">
      <div className="max-w-md mx-auto">
        <h1 className="mb-4">مدیریت وظایف</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="عنوان تسک جدید"
            className="rounded border p-2 flex-1"
          />
          <button
            onClick={handleAddTask}
            className="bg-orange-500 text-white rounded p-2 flex justify-center align-center"
          >
            افزودن
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task: Task) => (
            <li key={task?.id} className="bg-slate-800 py-3 px-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span
                  className={
                    task?.completed ? "line-through text-gray-400" : ""
                  }
                >
                  {editing ? (
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  ) : (
                    task?.title
                  )}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className="text-blue-500 cursor-pointer"
                  >
                    {task.completed ? "ناقص" : "تکمیل"}
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 cursor-pointer"
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => {
                      if (!editing) {
                        setTitle(task?.title)
                        setEditing(true);}
                      else {
                        handleEdit(task?.id);
                        setEditing(false);
                      }
                    }}
                    className="cursor-pointer"
                  >
                    {editing ? "ذخیره" : "ویرایش"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
