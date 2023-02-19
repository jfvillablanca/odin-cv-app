import { FC, Key, useContext, useState } from "react";
import { OrderedFieldsToRender } from "../../App";
import { AppContext } from "../shared/AppContext";
import Field from "../shared/Field";
import HoverButtonContainer from "../shared/HoverButtonContainer";

interface Props {
    hoverColor: string;
    subfields: OrderedFieldsToRender;
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
        (subfield: OrderedFieldsToRender, index: number) => {
            // NOTE: This is one hell of a hot mess
            const [fieldId, , subfieldValues] = subfield;
            const [field1, field2] = subfieldValues.map((x) => ({
                id: x[0],
                value: x[2],
            }));
            return (
                <div
                    key={fieldId as unknown as Key}
                    className={`relative flex justify-between py-3 uppercase text-lg tracking-wider font-extrabold ${
                        !editMode ? `${hoverColor}` : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                >
                    <Field
                        tag={"h3"}
                        className={""}
                        fieldId={field1.id}
                        textContent={field1.value}
                    />
                    <Field
                        tag={"h3"}
                        className={""}
                        fieldId={field2.id}
                        textContent={field2.value}
                    />
                    {documentMode === "section" && isHovered[index] && (
                        <HoverButtonContainer
                            fieldId={fieldId as unknown as string}
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
