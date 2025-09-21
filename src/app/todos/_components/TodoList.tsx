import { TaskSquare, Graph, TickCircle, EmojiSad } from "iconsax-reactjs";
import TodoTable from "./TodoTable";
import { usePaginatedTodosByStatus, useTodoStats } from "../todos.store";

interface TodoListProps {
  todoType: string;
  changeListType: (type: "todo" | "in-progress" | "completed") => void;
}

const TodoList = ({ todoType, changeListType }: TodoListProps) => {
  const todo_list = usePaginatedTodosByStatus("todo");
  const in_progress_list = usePaginatedTodosByStatus("in-progress");
  const completed_list = usePaginatedTodosByStatus("complete");
  const stats = useTodoStats();
  return (
    <div className="flex-1 flex flex-col">
      {stats.total === 0 ? (
        <div className="bg-secondary-light rounded-lg p-4 flex flex-col items-center flex-1 justify-center gap-3">
          <EmojiSad size={48} className="text-secondary/50" />
          <p className="text-secondary/70 font-medium text-lg">
            No tasks created yet
          </p>
          <p className="text-secondary/50 italic">
            Create a new task to get started
          </p>
        </div>
      ) : (
        <>
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
                {stats.todo}
              </span>
            </button>
            <button
              onClick={() => changeListType("in-progress")}
              className={`flex gap-2 items-center p-1 rounded-lg transition-colors duration-200 font-semibold ${
                todoType === "in-progress"
                  ? "bg-yellow-400 text-white"
                  : "bg-white"
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
                {stats.inProgress}
              </span>
            </button>
            <button
              onClick={() => changeListType("completed")}
              className={`flex gap-2 items-center p-1 rounded-lg transition-colors duration-200 font-semibold ${
                todoType === "completed"
                  ? "bg-teal-600/60 text-white"
                  : "bg-white"
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
                {stats.completed}
              </span>
            </button>
          </div>
          <div className="flex-1 rounded-lg">
            {todoType === "todo" &&
              (todo_list.data.length === 0 ? (
                <div className="flex items-center justify-center h-full flex-col gap-3">
                  <EmojiSad size={48} className="text-secondary/50" />
                  <p className="text-secondary/50 italic">
                    No todo tasks found
                  </p>
                </div>
              ) : (
                <TodoTable data={todo_list} />
              ))}
            {todoType === "in-progress" &&
              (in_progress_list.data.length === 0 ? (
                <div className="flex items-center justify-center h-full flex-col gap-3">
                  <EmojiSad size={48} className="text-secondary/50" />
                  <p className="text-secondary/50 italic">
                    No in-progress tasks found
                  </p>
                </div>
              ) : (
                <TodoTable data={in_progress_list} />
              ))}
            {todoType === "completed" &&
              (completed_list.data.length === 0 ? (
                <div className="flex items-center justify-center h-full flex-col gap-3">
                  <EmojiSad size={48} className="text-secondary/50" />
                  <p className="text-secondary/50 italic">
                    No completed tasks found
                  </p>
                </div>
              ) : (
                <TodoTable data={completed_list} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
