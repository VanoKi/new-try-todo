import { useState } from "react";

type InputProps = {
    placeholder: string;
    addItem: (value: string) => void;
}

export const Input = ({ placeholder, addItem }: InputProps) => {
    const [value, setValue] = useState("");
    const onClickHandler = () => {
        addItem(value);
        setValue("");
    }
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickHandler();
        } else if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            setValue("");
        }
    }
    
    return (
        <div className="input-container">
            <input
             type="text" 
             value={value} 
             onChange={(e) => setValue(e.currentTarget.value)}
             placeholder={placeholder}
             onKeyDown={onKeyDownHandler}
              />
            <button onClick={onClickHandler}>+</button>
        </div>
    );
};