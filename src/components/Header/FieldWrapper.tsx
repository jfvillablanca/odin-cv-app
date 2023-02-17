import { FC, useContext, useState } from "react";
import { AppContext } from "../shared/AppContext";
import Field from "../shared/Field";
import HoverButton from "../shared/HoverButton";

interface Props {
    tag: keyof JSX.IntrinsicElements;
    tailwindStyles: string;
    hoverColor: string;
    dataName: string;
    textContent: string;
    canFieldBeRemoved: boolean;
}

const FieldWrapper: FC<Props> = ({
    tag,
    tailwindStyles,
    hoverColor,
    dataName,
    textContent,
    canFieldBeRemoved,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(() => true);
    };

    const handleMouseLeave = () => {
        setIsHovered(() => false);
    };

    const { editMode, documentMode } = useContext(AppContext).state;

    return (
        <div
            className={!editMode ? `${hoverColor} relative` : "relative"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Field
                tag={tag}
                className={tailwindStyles}
                dataName={dataName}
                textContent={textContent}
            />
            {isHovered && documentMode === "section" && (
                <HoverButton
                    canFieldBeRemoved={canFieldBeRemoved}
                    dataName={dataName}
                />
            )}
        </div>
    );
};

export default FieldWrapper;
