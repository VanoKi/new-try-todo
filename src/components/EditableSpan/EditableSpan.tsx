import React, { useState } from 'react'

type EditableSpanProps = {
  title: string;
  onChange: (value: string) => void;
  onEditModeChange: (value: boolean) => void;
}

export const EditableSpan = ({title, onChange, onEditModeChange}: EditableSpanProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const onDoubleClickHandler = () => {
    setIsEditing(true);
  }
  const onBlurHandler = () => {
    setIsEditing(false);
    onChange(value);
    onEditModeChange(false);
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
        onFocus={() => onEditModeChange(true)}
        />
      ) : (
        <span 
        onDoubleClick={onDoubleClickHandler}
        >
            {title}
            </span>
      )}
    </>
  )
}