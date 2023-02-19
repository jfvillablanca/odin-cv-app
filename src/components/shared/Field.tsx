import { FC, useContext } from "react";
import { AppContext } from "../shared/AppContext";

interface Props {
    tag: keyof JSX.IntrinsicElements;
    className: string;
    fieldId: string;
    textContent: string;
}

const Field: FC<Props> = ({ tag, className, fieldId, textContent }) => {
    const { editMode, currentTarget } = useContext(AppContext).state;
    const { handleOnClickFormField, handleOnBlurFormField, handleFormInput } =
        useContext(AppContext).handlers;

    const Tag = tag;
    if (!editMode || currentTarget !== fieldId) {
        return (
            <Tag
                className={className}
                onClick={() => handleOnClickFormField(fieldId)}
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
                        onBlur={() => handleOnBlurFormField(fieldId)}
                        onChange={(event) => handleFormInput(event, fieldId)}
                        value={textContent}
                        autoFocus
                    />
                );
            default:
                return (
                    <input
                        className={className}
                        onBlur={() => handleOnBlurFormField(fieldId)}
                        onChange={(event) => handleFormInput(event, fieldId)}
                        value={textContent}
                        autoFocus
                    />
                );
        }
    }
};

export default Field;
