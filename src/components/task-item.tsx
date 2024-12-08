import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description: string;
  };
}

const TaskItem: FC<TaskItemProps> = (props) => {
  const { id, title, description } = props.task;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-blue-200 p-4 rounded shadow-md flex justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </li>
  );
};

export default TaskItem;
