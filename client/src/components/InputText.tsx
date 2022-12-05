import { FC } from "react";

const InputText: FC<InputTextProps> = ({
    id,
    name,
    value,
    placeholder,
    changeHandler,
    list
}) => {
    return (
        <input
            id={id}
            className="input-text"
            type="text"
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => changeHandler(e)}
            list={list}
        />
    )
}

export default InputText;

export interface InputTextProps {
    id?: string;
    name?: string;
    value?: string;
    placeholder: string;
    changeHandler: Function;
    list?: any;
}