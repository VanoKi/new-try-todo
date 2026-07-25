import { useState } from "react"

type editableSpanProps = {
    title: string
    onChangeItem: (title: string) => void
}

export const EditableSpan = ({ title, onChangeItem }: editableSpanProps) => {
    const [value, setValue] = useState(title)
    const [isEdit, setIsEdit] = useState(false)
    const onBlurHandler = () => {    
        setIsEdit(false)
        onChangeItem(value)
    }

    return (
        isEdit ? (
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlurHandler}
            />
        ) : (
            <span
                onDoubleClick={() => setIsEdit(true)}
            >{title}
            </span >
        )
    )
}