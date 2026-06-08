import { useState } from "react";

export const Input = () => {
    const [value, setValue] = useState("");
    console.log(value);
    
    return (
        <div className="input-container">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={() => setValue("")}>+</button>
        </div>
    );
};