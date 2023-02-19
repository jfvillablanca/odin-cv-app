import { AppContext } from "../shared/AppContext";
import { useContext } from "react";

interface Props {
    fieldId: string;
    canFieldBeRemoved?: boolean;
}

function HoverButtonContainer({ fieldId, canFieldBeRemoved = true }: Props) {
    const tailwindStyles =
        "absolute flex gap-2 z-10 h-12 bottom-0 transform -translate-x-1/2 translate-y-12 left-1/2";

    return (
        <div className={tailwindStyles}>
            <InsertButton fieldId={fieldId} />
            {canFieldBeRemoved && <DeleteButton fieldId={fieldId} />}
        </div>
    );
}

function InsertButton({ fieldId }: { fieldId: string }) {
    const tailwindStyles =
        "bg-zinc-50 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-zinc-50 hover:border-green-500 opacity-80 text-lg rounded-2xl py-1 px-4 uppercase";

    const { openInsertFieldDialog } = useContext(AppContext).handlers;

    return (
        <div className='flex flex-col items-center'>
            <button
                onClick={() => openInsertFieldDialog(fieldId)}
                className={tailwindStyles}
            >
                {`Insert below`}
            </button>
        </div>
    );
}

function DeleteButton({ fieldId }: { fieldId: string }) {
    const { handleOnClickDeleteField } = useContext(AppContext).handlers;
    return (
        <button
            onClick={() => handleOnClickDeleteField(fieldId)}
            className='bg-zinc-50 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-zinc-50 hover:border-red-500 opacity-80 text-lg rounded-2xl py-1 px-4 uppercase'
        >{`Delete field`}</button>
    );
}

export default HoverButtonContainer;
