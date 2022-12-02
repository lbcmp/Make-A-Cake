import { FC } from "react";

const InputCheckbox:FC<InputCheckboxProps> = ({ id, name,  value, changeHandler }) => {
    return (
        <label className="input-checkbox" htmlFor={`${name}-${id}`}>
            <input 
                id={id}
                name={`${name}-${id}`}
                type="checkbox"
                value={value}
                onChange={(e) => changeHandler(e)}
            />
            { value }
        </label>
    )
}

const InputCheckboxField:FC<InputCheckboxFieldProps> = ({ name, record, changeHandler }) => {
    return (
        <div className="checkbox-field-wrapper">
            {
                Object.keys(record).map((recordKey, index) => (
                    <InputCheckbox
                        key={index}
                        id={recordKey}
                        name={name}
                        value={record[recordKey]}
                        changeHandler={changeHandler}
                    />
                ))
            }
        </div>
    )
}

export default InputCheckboxField;

export interface InputCheckboxProps {
    id: string;
    value: string;
    name: string;
    changeHandler: Function;
}

export interface InputCheckboxFieldProps {
    name: string;
    record: Record<string, string>;
    changeHandler: Function;
}