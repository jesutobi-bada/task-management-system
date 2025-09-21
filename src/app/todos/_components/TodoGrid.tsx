import { useTodosByStatus, useTodoStats } from "../todos.store";
import { TaskSquare, Graph, TickCircle, EmojiSad } from "iconsax-reactjs";
import TodoCard from "./TodoCard";

const TodoGrid = () => {
  const todo_list = useTodosByStatus("todo");
  const in_progress_list = useTodosByStatus("in-progress");
  const completed_list = useTodosByStatus("complete");
  const stats = useTodoStats();

  return (
    <div className="grid gap-2 grid-cols-3 flex-1 min-h-96 h-[calc(100vh-210px)]">
      {stats.total === 0 ? (
        <div className="bg-secondary-light rounded-lg p-4 flex flex-col items-center flex-1 justify-center gap-3 col-span-3">
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
                {stats.todo}
              </span>
            </header>
            <div className="space-y-2 overflow-y-auto no-scrollbar flex-1 min-h-0 m-2">
              {todo_list.length === 0 ? (
                <div className="flex items-center justify-center h-full flex-col gap-3">
                  <EmojiSad size={48} className="text-secondary/50" />
                  <p className="text-secondary/50 italic">
                    No todo tasks found
                  </p>
                </div>
              ) : (
                todo_list.map((todo, index) => (
                  <TodoCard key={index} todo={todo} />
                ))
              )}
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
                {stats.inProgress}
              </span>
            </header>
            <div className="space-y-2 overflow-y-auto flex-1 no-scrollbar m-2">
              {in_progress_list.length === 0 ? (
                <div className="flex items-center justify-center h-full flex-col gap-3">
                  <EmojiSad size={48} className="text-secondary/50" />
                  <p className="text-secondary/50 italic">
                    No in-progress tasks found
                  </p>
                </div>
              ) : (
                in_progress_list.map((todo, index) => (
                  <TodoCard key={index} todo={todo} />
                ))
              )}
            </div>
          </div>
          <div className="rounded-lg bg-secondary-light flex flex-col overflow-hidden h-full flex-1">
            <header className="flex items-center p-2 gap-2 bg-teal-600/60 text-secondary shrink-0">
              <div className="flex items-center gap-8 bg-white rounded-lg p-1 justify-between font-semibold">
                <TickCircle
                  size="28"
                  variant="Bold"
                  className="text-teal-600/60"
                />
                <span>Complete</span>
              </div>
              <span
                className={`h-8 min-w-8 w-auto px-2 flex items-center justify-center rounded-lg font-semibold bg-white ml-auto`}
              >
                {stats.completed}
              </span>
            </header>
            <div className="m-2 space-y-3 overflow-y-auto flex-1 no-scrollbar">
              {completed_list.length === 0 ? (
                <div className="flex items-center justify-center h-full flex-col gap-3">
                  <EmojiSad size={48} className="text-secondary/50" />
                  <p className="text-secondary/50 italic">
                    No completed tasks found
                  </p>
                </div>
              ) : (
                completed_list.map((todo, index) => (
                  <TodoCard key={index} todo={todo} />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoGrid;

// NOTE: I left out the add buttons on the todo categories (to do, in progress, completed) since they are couples. It doesn't make sense to randomly add a todo to in-progress or completed without going through the to-do first.

// NOTE: I also made each column scrollable individually.
