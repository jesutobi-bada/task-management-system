import { useState, useEffect } from "react";
import { Flag, Edit, Trash, Play, TickCircle, More } from "iconsax-reactjs";
import Avatar from "@/components/custom/Avatar";
import { PaginatedResponse, Todo, useTodoStore } from "../todos.store";

interface TableProps {
  data: PaginatedResponse<Todo>;
  onEdit?: (todo: Todo) => void;
}

const TodoTable: React.FC<TableProps> = ({ 
  data, 
  onEdit 
}) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  
  const { setStatus, deleteTodo } = useTodoStore();

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleAction = (action: string, todo: Todo) => {
    setActiveDropdown(null);
    
    switch (action) {
      case 'in-progress':
        setStatus(todo.id, 'in-progress');
        break;
      case 'complete':
        setStatus(todo.id, 'complete');
        break;
      case 'edit':
        onEdit?.(todo);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this todo?')) {
          deleteTodo(todo.id);
        }
        break;
    }
  };

  const getActionsByStatus = (status: string) => {
    const baseActions = [
      { key: 'edit', label: 'Edit', icon: Edit },
      { key: 'delete', label: 'Delete', icon: Trash, className: 'text-red-600 hover:text-red-800' }
    ];

    if (status === 'todo') {
      return [
        { key: 'in-progress', label: 'Mark as In-Progress', icon: Play },
        { key: 'complete', label: 'Mark as Complete', icon: TickCircle },
        ...baseActions
      ];
    } else if (status === 'in-progress') {
      return [
        { key: 'complete', label: 'Mark as Complete', icon: TickCircle },
        ...baseActions
      ];
    } else {
      return baseActions;
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown !== null) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeDropdown]);

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
            <th
              scope="col"
              className="px-6 py-3"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((todo, index) => (
            <tr key={todo.id} className="bg-white border-b border-primary h-12">
              <td className="px-6 font-medium text-gray-900 whitespace-nowrap h-12 capitalize">
                {todo.title}
              </td>
              <td className="px-6 h-12">
                {todo.dates?.startDate && todo.dates?.endDate 
                  ? `${todo.dates.startDate} - ${todo.dates.endDate}`
                  : todo.dates?.startDate || todo.dates?.endDate || '-'
                }
              </td>
              <td className="px-6 h-12">
                <div className="flex -space-x-2">
                  {todo.assignees.slice(0, 2).map((assignee) => (
                    <Avatar 
                      key={assignee.id} 
                      firstName={assignee.firstName} 
                      lastName={assignee.lastName} 
                      src={assignee.profilePicture} 
                    />
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
              <td className="px-6 h-12 relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(index);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <More size={20} className="text-gray-500" />
                </button>
                
                {activeDropdown === index && (
                  <div 
                    className="absolute right-6 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-48 py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {getActionsByStatus(todo.status).map((action) => {
                      const IconComponent = action.icon;
                      return (
                        <button
                          key={action.key}
                          onClick={() => handleAction(action.key, todo)}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${action.className || 'text-gray-700'}`}
                        >
                          <IconComponent size={16} />
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                )}
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
                <span>Total: {data.pagination.total_rows_approx}</span>
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
