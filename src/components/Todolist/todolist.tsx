
export const Todolist = () => {
  return (
    <div key={todolist.id}>
              <h4 className="todolist-title">
                <EditableSpan
                  title={todolist.title}
                  onChange={(value) => changeTodolistTitleHandler({ id: todolist.id, title: value })}
                  onDelete={deleteTodolistHandler}
                  todolistId={todolist.id}
                />
              </h4>
              <Input
                placeholder="Enter task title"
                addItem={(value) => addTaskHandler({ value, todolistId: todolist.id })}
              />
              <ul>
              {tasks[todolist.id]?.map((task: taskType) => {

                const onStatusChange = (newStatus: number) => {
                  const body = {
                    ...task, status: newStatus
                  }
                  changeTaskStatusHandler({body, todolistId: todolist.id, taskId: task.id});
                }
                return (
                  <li key={task.id}>
                    <EditableSpan
                      title={task.title}
                      onChange={(value) => changeTaskTitleHandler({ taskId: task.id, body: { ...task, title: value }, todolistId: todolist.id })}
                      onDelete={(todoListId) => deleteTaskHandler({taskId: task.id, todolistId: todoListId})}
                      todolistId={todolist.id}
                      status={task.status}
                      onStatusChange={onStatusChange}
                    />
                  </li>
                );
              })}
              </ul>
            </div>
  )
}