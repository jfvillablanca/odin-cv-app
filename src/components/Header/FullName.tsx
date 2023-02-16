import { FC, useContext, useState } from "react";
import { AppContext } from "../shared/AppContext";
import Field from "../shared/Field";

interface Props {
    hoverColor: string;
    dataName: string;
    fullName: string;
    children?: React.ReactNode;
}

const FullName: FC<Props> = ({ hoverColor, dataName, fullName, children }) => {
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
                tag={"h1"}
                className='w-full font-semibold text-3xl mb-6'
                dataName={dataName}
                textContent={fullName}
            />
            {isHovered && hoverButton}
        </div>
    );
};

export default FullName;
