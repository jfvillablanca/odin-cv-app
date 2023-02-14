import React, { Component } from "react";

interface Props {
    tag: keyof JSX.IntrinsicElements; 
    isEditMode: boolean;
    className: string;
    dataName: string;
    textContent: string;
    handleOnClick: (dataName: string) => void;
    handleOnBlur: (dataName: string) => void;
    activeField: string | null;
    handleFormInput: (event: React.SyntheticEvent) => void;
}

class Field extends Component<Props> {
    render() {
        const {
            tag,
            isEditMode,
            className,
            dataName,
            textContent,
            handleOnClick,
            handleOnBlur,
            handleFormInput,
            activeField,
        } = this.props;

        const Tag = tag;
        return (
            !isEditMode 
                ? <Tag className={className} onClick={handleEditMode} data-name={dataName}>{textContent}</Tag>
                : <input className={className} autoFocus data-name={dataName} onBlur={handleEditMode} onChange={handleFormInput} value={textContent} />
        );
    }
};

export default Field;
