import type React from 'react';
import { useState } from 'react';

type EditableSpanProps = {
  title: string;
  onChange: (value: string) => void;
  onDelete: (todolistId: string) => void;
  todolistId: string;
  status?: number;
  onStatusChange?: (newStatus: number) => void;
};

export const EditableSpan = ({
  title,
  onChange,
  onDelete,
  todolistId,
  status,
  onStatusChange,
}: EditableSpanProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const onDoubleClickHandler = () => {
    setIsEditing(true);
  };
  const onBlurHandler = () => {
    setIsEditing(false);
    onChange(value);
    setIsEditing(false);
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onBlurHandler();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setValue(title);
    }
  };

  return (
    <>
      {isEditing ? (
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlurHandler}
          autoFocus
          onKeyDown={onKeyDownHandler}
        />
      ) : (
        <>
          {status != null && (
            <input
              type='checkbox'
              checked={status === 2}
              onChange={() => {
                onStatusChange?.(status === 2 ? 0 : 2);
              }}
            />
          )}
          <span onDoubleClick={onDoubleClickHandler}>{title}</span>
          <button
            onClick={() => {
              onDelete(todolistId);
            }}
            disabled={isEditing}
          >
            X
          </button>
        </>
      )}
    </>
  );
};
