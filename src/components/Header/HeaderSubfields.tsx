import { FC, useContext, useState } from "react";
import { AppContext } from "../shared/AppContext";
import Field from "../shared/Field";
import HoverButton from "../shared/HoverButton";

interface Props {
    hoverColor: string;
    subfields: Array<[string, string, string]>;
}

const HeaderSubfields: FC<Props> = ({ hoverColor, subfields }) => {
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

    const { editMode, documentMode } = useContext(AppContext).state;

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
                        dataName={`headerFields|subfields|${subfield[0]}|1`}
                        textContent={subfield[1]}
                    />
                    <Field
                        tag={"h3"}
                        className={""}
                        dataName={`headerFields|subfields|${subfield[0]}|2`}
                        textContent={subfield[2]}
                    />
                    {documentMode === "section" && isHovered[index] && (
                        <HoverButton
                            dataName={`headerFields|subfields|${subfield[0]}`}
                        />
                    )}
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
