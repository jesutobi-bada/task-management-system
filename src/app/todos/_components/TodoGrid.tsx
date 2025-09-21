import todo_list from "../todos.json";
import in_progress_list from "../todos.json";
import completed_list from "../todos.json";
import { TaskSquare, Graph, TickCircle } from "iconsax-reactjs";
import TodoCard from "./TodoCard";
import { Todo } from "../todos.types";

const TodoGrid = () => {
  return (
    <div className="grid gap-2 grid-cols-3 flex-1 min-h-96 h-[calc(100vh-210px)]">
      {" "}
      {/* Removed bg-red-600 */}
      <div className="rounded-lg bg-secondary-light flex flex-col overflow-hidden h-full">
        <header className="flex items-center p-2 gap-2 bg-purple-600/40 text-secondary flex-shrink-0">
          <div className="flex items-center gap-8 bg-white rounded-lg p-1 justify-between font-semibold">
            <TaskSquare
              size="28"
              variant="Bold"
              className="text-purple-600/40"
            />
            <span>To Do</span>
          </div>
          <span className="h-8 min-w-8 w-auto px-2 flex items-center justify-center rounded-lg font-semibold bg-white ml-auto">
            20
          </span>
        </header>
        <div className="space-y-2 overflow-y-auto no-scrollbar flex-1 min-h-0 m-2">
          {todo_list.data.map((todo, index) => (
            <TodoCard key={index} todo={todo as Todo} />
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-secondary-light flex flex-col overflow-hidden h-full flex-1">
        <header className="flex items-center p-2 gap-2 bg-yellow-400 text-secondary shrink-0">
          <div className="flex items-center gap-8 bg-white rounded-lg p-1 justify-between font-semibold">
            <Graph size="28" variant="Bold" className="text-yellow-400" />
            <span>In Progress</span>
          </div>
          <span
            className={`h-8 min-w-8 w-auto px-2 flex items-center justify-center rounded-lg font-semibold text-lg bg-white ml-auto`}
          >
            20
          </span>
        </header>
        <div className="space-y-2 overflow-y-auto flex-1 no-scrollbar m-2">
          {in_progress_list.data.map((todo, index) => (
            <TodoCard key={index} todo={todo as Todo} />
          ))}
        </div>
      </div>
      
 <div className="rounded-lg bg-secondary-light flex flex-col overflow-hidden h-full flex-1">
        <header className="flex items-center p-2 gap-2 bg-teal-600/60 text-secondary shrink-0">
          <div className="flex items-center gap-8 bg-white rounded-lg p-1 justify-between font-semibold">
            <TickCircle size="28" variant="Bold" className="text-teal-600/60" />
            <span>Complete</span>
          </div>
          <span
            className={`h-8 min-w-8 w-auto px-2 flex items-center justify-center rounded-lg font-semibold bg-white ml-auto`}
          >
            20
          </span>
        </header>
        <div className="m-2 space-y-3 overflow-y-auto flex-1 no-scrollbar">
          {completed_list.data.map((todo, index) => (
            <TodoCard key={index} todo={todo as Todo} />
          ))}
        </div>
      </div> 

    </div>
  );
};

export default TodoGrid;

// NOTE: I left out the add buttons on the todo categories (to do, in progress, completed) since they are couples. It doesn't make sense to randomly add a todo to in-progress or completed without going through the to-do first.

// NOTE: I also made each column scrollable individually.
