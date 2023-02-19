import { useContext } from "react";
import { AppContext } from "./shared/AppContext";

function FieldOptionContainer() {
    const tailwindStyles =
        "fixed z-10 top-0 left-11 mt-16 flex flex-col gap-2 bg-gray-100 py-4 px-4 rounded-lg";

    return (
        <div className={tailwindStyles}>
        </div>
    );
}

function ExitButton() {
    const { closeInsertFieldDialog } = useContext(AppContext);
    return (
        <button
            onClick={closeInsertFieldDialog}
            className='absolute z-20 top-0 right-0 transform translate-x-4 -translate-y-4 h-8 w-8 p-0 bg-red-600 text-zinc-50 font-mono text-sm rounded-none'
        >
            X
        </button>
    );
}

export default FieldOptionContainer;
