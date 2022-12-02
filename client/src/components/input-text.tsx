import { FC } from "react";

const InputText: FC<InputTextProps> = ({ placeholder }) => {
    return (
        <input className="input-text" type="text" placeholder={placeholder} />
    )
}

export default InputText;

export interface InputTextProps {
    placeholder: string;
}