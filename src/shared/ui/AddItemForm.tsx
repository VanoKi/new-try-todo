import {Box, IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'
import {useState} from "react";


type Props = {
  addItem: (title: string) => void
  label?: string
};
export const AddItemForm = ({addItem, label}: Props) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.key === 'Enter') {
      addItemHandler()
    }
  }

  const onBlurHandler = () => {
    if (error !== null) {
      setError(null)
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    if (error) setError(null)
  }

  return (
    <Box>
      <TextField
        variant={'outlined'}
        label={label}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        onBlur={onBlurHandler}
        error={!!error}
        size={'small'}
      />
      <IconButton color={'primary'}
                  onClick={() => {
                  }}>
        <AddBoxIcon fontSize={'large'}/>
      </IconButton>
    </Box>
  );
};