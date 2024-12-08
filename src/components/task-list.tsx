import TaskItem from "./task-item.tsx";
import { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

type Task = {
  id: number;
  title: string;
  description: string;
};
const dummyData: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "поесть ",
  },
  {
    id: 2,
    title: "Task 2",
    description: "попить",
  },
  {
    id: 3,
    title: "Task 3",
    description: "поспать",
  },
];

const TaskList = () => {
  const [taskList, setTaskList] = useState<Task[]>(dummyData);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTaskList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  console.log(taskList);
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">TaskList</h1>
      <ul className="max-w-2xl mx-auto grid  gap-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={taskList}
            strategy={verticalListSortingStrategy}
          >
            {taskList.map((task: Task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
    </>
  );
};

export default TaskList;
