import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type Props = {
  onAddItem: (title: string) => void
};
export const AddItemForm = ({onAddItem}: Props) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>( null)

  const addItemHandler = () => {
    if (title.trim() !== '') {
      onAddItem(title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onChangerHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    if ( error !== null ) setError(null)
  }

  const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        variant={'outlined'}
        size={'small'}
        value={title}
        onChange={onChangerHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton color={'primary'} onClick={addItemHandler}>
        <AddBox/>
      </IconButton>
    </div>
  );
};