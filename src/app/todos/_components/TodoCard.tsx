import { Todo } from "../todos.store";
import { Calendar, ProfileCircle, Flag } from "iconsax-reactjs";
import Avatar from "@/components/custom/Avatar";

interface TodoCardProps {
  todo: Todo;
}
const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  return (
    <div className="rounded-lg p-2 bg-white space-y-4 flex-1 overflow-y-hidden ">
      <h2 className="font-semibold">{todo.title}</h2>
      <div className="flex items-center gap-3 text-sm">
        <Calendar className="text-secondary/50" size={18} />
        <p>
          {todo.dates?.startDate} - {todo.dates?.endDate}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <ProfileCircle className="text-secondary/50" size={18} />
        <div className="flex -space-x-2">
          {todo.assignees.slice(0, 2).map((name, nameIndex) => (
            <Avatar
              key={nameIndex}
              firstName={name.firstName}
              lastName={name.lastName}
              src={name.profilePicture}
            />
          ))}
          {todo.assignees.length > 2 && (
            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-purple-50 text-xs font-semibold text-gray-600">
              +{todo.assignees.length - 2}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-3 items-center text-sm">
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
      </div>
    </div>
  );
};

export default TodoCard;
