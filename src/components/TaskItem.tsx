import { EditableSpan } from "@/components/EditableSpan.tsx";

type Props = {
  taskItem: string;
  checkbox: boolean;
};
export const TaskItem = (props: Props) => {
  return (
    <div>
      <input type="checkbox" />
      <EditableSpan
        tiltle={"Task title"}
        onChangeItem={(title) => console.log(title)}
      />
    </div>
  );
};
