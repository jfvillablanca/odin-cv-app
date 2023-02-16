import { FC, useContext, useState } from "react";
import { AppContext } from "../shared/AppContext";
import Field from "../shared/Field";

interface Props {
    hoverColor: string;
    subfields: Array<[string, string, string]>;
    children?: React.ReactNode;
}

const HeaderSubfields: FC<Props> = ({ hoverColor, subfields, children }) => {
    const [isHovered, setIsHovered] = useState(
        new Array(subfields.length).fill(false)
    );

    const handleMouseEnter = (index: number) => {
        setIsHovered((prevIsHovered: boolean[]) => {
            const newIsHovered = [...prevIsHovered];
            newIsHovered[index] = true;
            return newIsHovered;
        });
    };

    const handleMouseLeave = (index: number) => {
        setIsHovered((prevIsHovered: boolean[]) => {
            const newIsHovered = [...prevIsHovered];
            newIsHovered[index] = false;
            return newIsHovered;
        });
    };

    const { editMode } = useContext(AppContext).state;

    const hoverButton = children;
    const headerSubFields = subfields.map(
        (subfield: string[], index: number) => {
            return (
                <div
                    key={subfield[0]}
                    className={`relative flex justify-between py-3 uppercase text-lg tracking-wider font-extrabold ${
                        !editMode ? `${hoverColor}` : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                >
                    <Field
                        tag={"h3"}
                        className={""}
                        dataName={`headerFields|subfields|${index}|1`}
                        textContent={subfield[1]}
                    />
                    <Field
                        tag={"h3"}
                        className={""}
                        dataName={`headerFields|subfields|${index}|2`}
                        textContent={subfield[2]}
                    />
                    {isHovered[index] && hoverButton}
                </div>
            );
        }
    );

    return (
        <div className='flex flex-col border-t-2 border-b-2 border-gray-400 divide-y-2 divide-gray-400'>
            {headerSubFields}
        </div>
    );
};

export default HeaderSubfields;
