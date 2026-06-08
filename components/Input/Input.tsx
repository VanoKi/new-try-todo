import { useState } from "react";

type InputProps = {
    placeholder: string;
    onChange: (value: string) => void;
}

export const Input = ({ placeholder, onChange }: InputProps) => {
    const [value, setValue] = useState("");
    const onClickHandler = () => {
        onChange(value);
        setValue("");
    }
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickHandler();
        } else if (e.key === "Escape") {
            setValue("");
        }
    }
    
    return (
        <div className="input-container">
            <input
             type="text" 
             value={value} 
             onChange={(e) => setValue(e.target.value)}
             placeholder={placeholder}
             onKeyDown={onKeyDownHandler}
              />
            <button onClick={onClickHandler}>+</button>
        </div>
    );
};