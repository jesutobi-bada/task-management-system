"use client";
import {
  AddCircle,
  RowHorizontal,
  RowVertical,
  SearchNormal1,
} from "iconsax-reactjs";
import { useState } from "react";
import TodoList from "./_components/TodoList";
import TodoGrid from "./_components/TodoGrid";
import { populateDummyTodos } from "./todos.utils";
import { useTodoStore } from "./todos.store";
import { useViewLayout } from "../_utils/preferences.utils";

const TodoLayout = () => {
  const [todoType, setTodoType] = useState<
    "todo" | "in-progress" | "completed"
  >("todo");
  const clearTodos = useTodoStore((state) => state.clearAll);
  const handlePopulateData = () => {
    populateDummyTodos();
  };

    const { 
    viewLayout, 
    setViewLayout, 
    isGrid,
    isList 
  } = useViewLayout();

  const handleClearData = () => {
    clearTodos();
  };

  const changeListType = (todoType: "todo" | "in-progress" | "completed") => {
    setTodoType(todoType);
  };
  return (
    <div className="bg-white flex-1 rounded-lg flex flex-col h-full overflow-hidden space-y-2">
      <header className="border-b border-primary p-2 flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Todos</h1>
        <div className="flex gap-3 items-center">
          <button className="flex items-center gap-2 rounded-lg p-2 font-medium bg-teal-700/50 text-white text-sm">
            <AddCircle size={20} /> Add Task
          </button>
          <button
            onClick={handlePopulateData}
            className="flex items-center gap-2 rounded-lg p-2 font-medium bg-teal-700/50 text-white text-sm"
          >
            Add Dummy Data
          </button>
          <button
            onClick={handleClearData}
            className="flex items-center gap-2 rounded-lg p-2 font-medium bg-teal-700/50 text-white text-sm"
          >
            Clear All Data
          </button>
        </div>
      </header>
      <div className="flex items-center justify-between bg-teal-600/10 rounded-xl p-2 mx-2">
        <div className="bg-white text-sm p-2 rounded-lg text-secondary flex items-center h-full gap-2 flex-1 max-w-md">
          <SearchNormal1 size={20} />
          <input
            type="text"
            placeholder="Search for To-do"
            className="focus:outline-none flex-1 placeholder:text-secondary placeholder:font-medium font-medium"
          />
        </div>
        <div className="bg-white p-1 rounded flex gap-2">
          <button
            className={`p-1 rounded cursor-pointer ${
              viewLayout === "grid"
                ? "bg-teal-700/50 text-white"
                : "text-gray-500"
            }`}
            onClick={() => setViewLayout("grid")}
          >
            <RowHorizontal size={20} />
          </button>
          <button
            className={`p-1 rounded cursor-pointer ${
              viewLayout === "list"
                ? "bg-teal-700/50 text-white"
                : "text-gray-500"
            }`}
            onClick={() => setViewLayout("list")}
          >
            <RowVertical size={20} />
          </button>
        </div>
      </div>

      {isList && (
        <div className="flex-1 px-2 mb-2 overflow-y-auto no-scrollbar flex">
          <TodoList todoType={todoType} changeListType={changeListType} />
        </div>
      )}
      {isGrid && (
        <div className="flex-1 px-2 mb-2 flex">
          <TodoGrid />
        </div>
      )}
    </div>
  );
};

export default TodoLayout;

// TODO: Persist layout state
