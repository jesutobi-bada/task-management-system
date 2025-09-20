import TodoTable from "@/app/todos/_components/TodoTable"
import todos_list from "./todos.json"
import { TodosData } from "./todos.types"

const TodoList = () => {
  return (
    <TodoTable data={todos_list as TodosData} />
  )
}

export default TodoList