import {type ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type Props = {
  value: string
  onChange: (newValue: string) => void
};
export const EditableSpan = ({value, onChange}: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)
  const activateEditMode = () => setEditMode(true)
  const deactivateMode = () => {
    setEditMode(false)
    onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  return editMode ? (
    <TextField
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={deactivateMode}
      autoFocus
      size={'small'}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{value}</span>
  )
};