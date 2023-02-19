import { AppContext } from "../shared/AppContext";
import { useContext, useState } from "react";

interface Props {
    fieldId: string;
    canFieldBeRemoved?: boolean;
}

function HoverButton({ fieldId, canFieldBeRemoved = true }: Props) {
    const [insertButtonIsHovered, setInsertButtonIsHovered] = useState(false);

    const handleHoverState = (callback: (() => void) | null = null): void => {
        setInsertButtonIsHovered((prevState) => !prevState);
        typeof callback === "function" && callback();
    };

    const tailwindStyles =
        "absolute flex gap-2 z-10 h-12 bottom-0 transform -translate-x-1/2 translate-y-12 left-1/2";

    return (
        <div className={tailwindStyles}>
            <InsertButton
                fieldId={fieldId}
                isHovered={insertButtonIsHovered}
                handleHoverState={handleHoverState}
            />
            {canFieldBeRemoved && !insertButtonIsHovered && (
                <DeleteButton fieldId={fieldId} />
            )}
        </div>
    );
}

function InsertButton({
    fieldId,
    isHovered,
    handleHoverState,
}: {
    fieldId: string;
    isHovered: boolean;
    handleHoverState: (callback?: () => void) => void;
}) {
    const { handleOnHoverInsertField } = useContext(AppContext);

    const tailwindStyles =
        "bg-zinc-50 border-2 border-green-500 text-green-500 hover:bg-gray-500 hover:text-gray-500 hover:border-gray-500 hover:opacity-100 opacity-80 text-lg rounded-2xl py-1 px-4 uppercase";

    return (
        <>
            <button
                onMouseEnter={() =>
                    handleHoverState(() => handleOnHoverInsertField(fieldId))
                }
                onMouseLeave={() => handleHoverState()}
                className={tailwindStyles}
            >
                {`Insert below`}
            </button>
        </>
        
    );
}

}

function DeleteButton({ fieldId }: { fieldId: string }) {
    const { handleOnClickDeleteField } = useContext(AppContext);
    return (
        <button
            onClick={() => handleOnClickDeleteField(fieldId)}
            className='bg-zinc-50 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-zinc-50 hover:border-red-500 opacity-80 text-lg rounded-2xl py-1 px-4 uppercase'
        >{`Delete field`}</button>
    );
}

export default HoverButton;
