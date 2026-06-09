import React, { useState } from 'react'

type EditableSpanProps = {
  title: string;
  onChange: (value: string) => void;
  deleteTodolistHandler: (todolistId: string) => void;
  todolistId: string;
}

export const EditableSpan = ({ title, onChange, deleteTodolistHandler, todolistId }: EditableSpanProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const onDoubleClickHandler = () => {
    setIsEditing(true);
  }
  const onBlurHandler = () => {
    setIsEditing(false);
    onChange(value);
    setIsEditing(false);
  }
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onBlurHandler();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(title);
    }
  }
  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlurHandler}
          autoFocus
          onKeyDown={onKeyDownHandler}
        />
      ) : (
        <span
          onDoubleClick={onDoubleClickHandler}
        >
          {title}
        </span>
      )}
      <button
        onClick={() => {
          deleteTodolistHandler(todolistId);
        }}
      disabled={isEditing}
    >
      X
    </button>
  </>
);
};
