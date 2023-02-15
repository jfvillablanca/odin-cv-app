import { Component } from "react";

interface Props {
    documentMode: "section" | "field";
    toggleDocumentMode: () => void;
}

class ModifyButton extends Component<Props> {
    render() {
        const mode =
            this.props.documentMode === "field"
                ? "Add/Delete Sections"
                : "Edit Fields";

        const buttonBgColor =
            this.props.documentMode === "field"
                ? "bg-orange-700"
                : "bg-teal-600";

        const toggleDocumentMode = this.props.toggleDocumentMode;

        return (
            <div className='fixed z-10 h-12 top-0 transform -translate-x-1/2 left-1/2 mt-16'>
                <button
                    onClick={toggleDocumentMode}
                    className={`${buttonBgColor} text-zinc-50 opacity-80 text-lg rounded-2xl py-3 px-4 uppercase hover:shadow-gray-400 hover:shadow-md`}
                >
                    {mode}
                </button>
            </div>
        );
    }
}

export default ModifyButton;
