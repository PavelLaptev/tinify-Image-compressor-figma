import React from "react";
import styles from "./styles.module.scss";

interface DropdownProps {
    options?: string[];
    onChange?: (value: string) => void;
    value?: string;
}

interface TextInputProps {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

interface InputBaseProps extends TextInputProps, DropdownProps {
    className?: string;
    minWidth?: string;
    type: "input" | "dropdown";
    label: string;
}

const Dropdown: React.FC<DropdownProps> = props => {
    return (
        <select className={styles.input} value={props.value} onChange={e => props.onChange(e.target.value)}>
            {props.options.map((option, index) => {
                return (
                    <option key={index} value={option}>
                        {option}
                    </option>
                );
            })}
        </select>
    );
};

const TextInput: React.FC<TextInputProps> = props => {
    return (
        <input
            className={styles.input}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            placeholder="—"
        />
    );
};

// Add parent class for sub-components
const Input: React.FC<InputBaseProps> = props => {
    const addInputComponent = () => {
        switch (props.type) {
            case "input":
                return <TextInput {...props} />;
            case "dropdown":
                return <Dropdown {...props} />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`${styles.wrap} ${props.className}`}
            style={{
                minWidth: props.minWidth,
            }}
        >
            <label className={styles.label}>{props.label}</label>
            {addInputComponent()}
        </div>
    );
};

Input.defaultProps = {
    className: "",
    minWidth: "unset",
};

export default Input;
