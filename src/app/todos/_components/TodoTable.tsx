import { Flag } from "iconsax-reactjs";
import Avatar from "@/components/custom/Avatar"
import { PaginatedResponse, Todo } from "../todos.store";

interface TableProps {
  data: PaginatedResponse<Todo>;
}

const TodoTable: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto rounded-lg border-[1.5px] border-primary flex-1 no-scrollbar h-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="sticky top-0 z-10 bg-secondary-light h-12 capitalize text-secondary font-semibold border-b-[1.5px] border-primary">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 border-r-[1.5px] border-primary"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 border-r-[1.5px] border-primary"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 border-r-[1.5px] border-primary"
            >
              Assignee
            </th>
            <th
              scope="col"
              className="px-6 py-3 border-r-[1.5px] border-primary"
            >
              Priority
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((todo, index) => (
            <tr key={index} className="bg-white border-b border-primary h-12">
              <td className="px-6 font-medium text-gray-900 whitespace-nowrap h-12 capitalize">
                {todo.title}
              </td>
              <td className="px-6 h-12">{todo.dates?.startDate} - {todo.dates?.endDate}</td>
              <td className="px-6 h-12">
                <div className="flex -space-x-2">
                  {todo.assignees.slice(0, 2).map((name, nameIndex) => (
                    <Avatar key={nameIndex} firstName={name.firstName} lastName={name.lastName} src={name.profilePicture} />
                  ))}
                  {todo.assignees.length > 2 && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-purple-50 text-xs font-semibold text-gray-600">
                      +{todo.assignees.length - 2}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 flex items-center gap-2 h-12 capitalize">
                {todo.priority === "important" && (
                  <Flag variant="Bold" className="text-important" size={18} />
                )}
                {todo.priority === "urgent" && (
                  <Flag variant="Bold" className="text-urgent" size={18} />
                )}
                {todo.priority === "medium" && (
                  <Flag variant="Bold" className="text-medium" size={18} />
                )}
                {todo.priority === "low" && (
                  <Flag variant="Bold" className="text-secondary/50" size={18} />
                )}
                {todo.priority}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="sticky bottom-0 z-10 bg-secondary-light h-12 border-t-[1.5px] border-primary">
          <tr>
            <td
              colSpan={5}
              className="px-6 py-3 text-center text-secondary font-semibold"
            >
              <div className="flex justify-between items-center h-full">
                <span>Total Todos: {data.pagination.total_rows_approx}</span>
                <span>
                  Page: {data.pagination.current_page} of{" "}
                  {data.pagination.total_pages}
                </span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TodoTable;
