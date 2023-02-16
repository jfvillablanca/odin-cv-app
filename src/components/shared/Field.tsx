import { FC, useContext } from "react";
import { AppContext } from "../shared/AppContext";

interface Props {
    tag: keyof JSX.IntrinsicElements;
    className: string;
    dataName: string;
    textContent: string;
}

const Field: FC<Props> = ({ tag, className, dataName, textContent }) => {
    const { editMode, currentTarget } = useContext(AppContext).state;
    const { handleOnClickFormField, handleOnBlurFormField, handleFormInput } =
        useContext(AppContext);

    const Tag = tag;
    if (!editMode || currentTarget !== dataName) {
        return (
            <Tag
                className={className}
                onClick={() => handleOnClickFormField(dataName)}
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
                        onBlur={() => handleOnBlurFormField(dataName)}
                        onChange={handleFormInput}
                        value={textContent}
                        autoFocus
                    />
                );
            default:
                return (
                    <input
                        className={className}
                        data-name={dataName}
                        onBlur={() => handleOnBlurFormField(dataName)}
                        onChange={handleFormInput}
                        value={textContent}
                        autoFocus
                    />
                );
        }
    }
};

export default Field;
