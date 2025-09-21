import { TaskSquare, Graph, TickCircle } from "iconsax-reactjs";
import todo_list from "../todos.json";
import in_progress_list from "../todos.json";
import completed_list from "../todos.json";
import TodoTable from "./TodoTable";
import { TodosData } from "../todos.types";

interface TodoListProps {
  todoType: string;
  changeListType: (type: "todo" | "in-progress" | "completed") => void;
}

const TodoList = ({ todoType, changeListType }: TodoListProps) => {
  return (
    <div className="flex-1 h-auto">
      <div className="bg-secondary-light flex items-center gap-5 p-2 mb-2 rounded-xl">
        <button
          onClick={() => changeListType("todo")}
          className={`flex gap-2 items-center p-1 rounded-lg transition-colors duration-200 font-semibold ${
            todoType === "todo" ? "bg-purple-700/50 text-white" : "bg-white"
          }`}
        >
          <TaskSquare
            size="28"
            variant="Bold"
            className={
              todoType === "todo" ? "text-white" : "text-purple-600/40"
            }
          />
          <span>To Do</span>
          <span
            className={`h-8 min-w-8 w-auto px-2 flex items-center justify-center rounded-md ml-5 ${
              todoType === "todo"
                ? "bg-white text-secondary"
                : "bg-purple-600/40 text-white"
            }`}
          >
            20
          </span>
        </button>
        <button
          onClick={() => changeListType("in-progress")}
          className={`flex gap-2 items-center p-1 rounded-lg transition-colors duration-200 font-semibold ${
            todoType === "in-progress" ? "bg-yellow-400 text-white" : "bg-white"
          }`}
        >
          <Graph
            size="28"
            variant="Bold"
            className={
              todoType === "in-progress" ? "text-white" : "text-yellow-400"
            }
          />
          <span>In Progress</span>
          <span
            className={`h-8 min-w-8 w-auto px-2 flex items-center justify-center font-medium rounded-md  text-secondary ml-5 ${
              todoType === "in-progress"
                ? "bg-white"
                : "bg-yellow-400 text-white"
            }`}
          >
            20
          </span>
        </button>
        <button
          onClick={() => changeListType("completed")}
          className={`flex gap-2 items-center p-1 rounded-lg transition-colors duration-200 font-semibold ${
            todoType === "completed" ? "bg-teal-600/60 text-white" : "bg-white"
          }`}
        >
          <TickCircle
            size="28"
            variant="Bold"
            className={
              todoType === "completed" ? "text-white" : "text-teal-600/60"
            }
          />
          <span>Complete</span>
          <span
            className={`h-8 min-w-8 w-auto px-2 flex items-center justify-center font-medium rounded-md text-secondary ml-5 ${
              todoType === "completed"
                ? "bg-white"
                : "bg-teal-600/60 text-white"
            }`}
          >
            20
          </span>
        </button>
      </div>
      
        {todoType === "todo" && <TodoTable data={todo_list as TodosData} />}
        {todoType === "in-progress" && (
          <TodoTable data={in_progress_list as TodosData} />
        )}  
        {todoType === "completed" && (
          <TodoTable data={completed_list as TodosData} />
        )}
      
    </div>
  );
};

export default TodoList;
