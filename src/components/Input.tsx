import { useState } from "react"

type InputProps = {
    placeholder: string
    addItem: (value:string) => void
}

export const Input = ({ placeholder, addItem }: InputProps) => {
    const [value, setValue] = useState('')
    const addItemHandler = () => {
        const trimmedValue = value.trim()
        if (trimmedValue) {
            addItem(trimmedValue)
            setValue('')
        }
    }
    return (
        <div>
            <input
            value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
            onClick={addItemHandler}
            >
                <span>+</span>
            </button>
        </div>
    )
}