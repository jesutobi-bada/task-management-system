"use client";
import {
  AddCircle,
  RowHorizontal,
  RowVertical,
  SearchNormal1,
  TaskSquare,
  Graph,
  TickCircle,
} from "iconsax-reactjs";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import React from "react";

const TodoLayout = ({ children }: { children: React.ReactNode }) => {
  const [viewLayout, setViewLayout] = useState<"list" | "grid">("list");
  const pathname = usePathname();

  return (
    <div className="bg-white flex-1 rounded-xl flex flex-col h-full overflow-hidden">
      <header className="border-b border-primary p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Todos</h1>
        <button className="flex items-center gap-2 rounded-lg p-3 font-medium bg-teal-700/50 text-white">
          <AddCircle /> Add Task
        </button>
      </header>
      <div className="flex items-center justify-between bg-teal-600/10 rounded-xl p-4 m-4">
        <div className="bg-white p-3 rounded-lg text-secondary flex items-center gap-2 flex-1 max-w-md">
          <SearchNormal1 />
          <input
            type="text"
            placeholder="Search for To-do"
            className="focus:outline-none flex-1 placeholder:text-secondary placeholder:font-medium font-medium"
          />
        </div>
        <div className="bg-white p-1 rounded flex gap-2">
          <button
            className={`p-2 rounded cursor-pointer ${
              viewLayout === "grid"
                ? "bg-teal-700/50 text-white"
                : "text-gray-500"
            }`}
            onClick={() => setViewLayout("grid")}
          >
            <RowHorizontal />
          </button>
          <button
            className={`p-2 rounded cursor-pointer ${
              viewLayout === "list"
                ? "bg-teal-700/50 text-white"
                : "text-gray-500"
            }`}
            onClick={() => setViewLayout("list")}
          >
            <RowVertical />
          </button>
        </div>
      </div>
      <div className="bg-secondary-light flex items-center gap-5 p-4 mx-4 rounded-xl">
        <Link
          href="/todos"
          className={`flex gap-2 text-lg items-center p-3 rounded-lg transition-colors duration-200 font-semibold ${
            pathname === "/todos" ? "bg-purple-700/50 text-white" : "bg-white"
          }`}
        >
          <TaskSquare
            size="36"
            variant="Bold"
            className={pathname === "/todos" ? "text-white" : "text-purple-600/40"}
          />
          <span>To Do</span>
          <span
            className={`h-10 min-w-10 w-auto px-2 flex items-center justify-center rounded-md ml-5 ${pathname === "/todos" ? "bg-white text-secondary" : "bg-purple-600/40 text-white"}`}
          >
            20
          </span>
        </Link>
        <Link
          href="/todos/in-progress"
          className={`flex gap-2 text-lg items-center p-3 rounded-lg transition-colors duration-200 font-semibold ${
            pathname === "/todos/in-progress"
              ? "bg-yellow-500 text-white"
              : "bg-white"
          }`}
        >
          <Graph
            size="36"
            variant="Bold"
            className={
              pathname === "/todos/in-progress"
                ? "text-white"
                : "text-yellow-400"
            }
          />
          <span>In Progress</span>
          <span
            className={`h-10 min-w-10 w-auto px-2 flex items-center justify-center font-medium rounded-md  text-secondary ml-5 ${pathname === "/todos/in-progress" ? "bg-white" : "bg-yellow-400 text-white"}`}
          >
            20
          </span>
        </Link>
        <Link
          href="/todos/complete"
          className={`flex gap-2 text-lg items-center p-3 rounded-lg transition-colors duration-200 font-semibold ${
            pathname === "/todos/complete"
              ? "bg-teal-600/60 text-white"
              : "bg-white"
          }`}
        >
          <TickCircle
            size="36"
            variant="Bold"
            className={
              pathname === "/todos/complete"
                ? "text-white"
                : "text-teal-600/60"
            }
          />
          <span>Complete</span>
          <span
            className={`h-10 min-w-10 w-auto px-2 flex items-center justify-center font-medium rounded-md text-secondary ml-5 ${pathname === "/todos/complete" ? "bg-white" : "bg-teal-600/60 text-white"}`}
          >
            20
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
};

export default TodoLayout;

// TODO: Persist layout state
