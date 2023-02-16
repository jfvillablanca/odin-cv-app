import { FC, useContext, useState } from "react";
import { AppContext } from "../shared/AppContext";
import Field from "../shared/Field";

interface Props {
    tag: keyof JSX.IntrinsicElements;
    tailwindStyles: string;
    hoverColor: string;
    dataName: string;
    textContent: string;
    children?: React.ReactNode;
}

const FullName: FC<Props> = ({ tag, tailwindStyles, hoverColor, dataName, textContent, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(() => true);
    };

    const handleMouseLeave = () => {
        setIsHovered(() => false);
    };

    const { editMode } = useContext(AppContext).state;

    const hoverButton = children;
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
            {isHovered && hoverButton}
        </div>
    );
};

export default FullName;
