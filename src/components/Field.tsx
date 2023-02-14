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
        if (!isEditMode || activeField !== dataName) {
            return (
                <Tag
                    className={className}
                    onClick={() => handleOnClick(dataName)}
                    data-name={dataName}
                >
                    {textContent}
                </Tag>
            );
        } else {
            switch (Tag) {
                case "p":
                return (
                    <textarea
                        className={className}
                        data-name={dataName}
                        onBlur={() => handleOnBlur(dataName)}
                        onChange={handleFormInput}
                        value={textContent}
                    />
                );
                default:
                return (
                    <input
                        className={className}
                        data-name={dataName}
                        onBlur={() => handleOnBlur(dataName)}
                        onChange={handleFormInput}
                        value={textContent}
                    />
                );
            }
        }
    }
}

export default Field;
