import { Component } from "react";
import Field from "../shared/Field";

interface Props {
    hoverColor: string;
    isEditMode: boolean;
    handleOnClick: Function;
    handleOnBlur: Function;
    handleFormInput: Function;
    activeField: string | null;
    statement: string;
    children?: React.ReactNode;
}

class Statement extends Component<Props> {
    render() {
        const hoverButton = this.props.children;
        const hoverColor = this.props.hoverColor;
        const isEditMode = this.props.isEditMode;
        const activeField = this.props.activeField;
        const statement = this.props.statement;
        const handleOnClick = this.props.handleOnClick as (
            dataName: string
        ) => void;
        const handleOnBlur = this.props.handleOnBlur as (
            dataName: string
        ) => void;
        const handleFormInput = this.props.handleFormInput as (
            event: React.SyntheticEvent
        ) => void;
        return(
            <div className={!isEditMode ? `${hoverColor} relative`: 'relative'}>
                <Field
                    tag={"p"}
                    isEditMode={isEditMode}
                    className='w-full text-gray-600 mb-6'
                    dataName={"headerFields|statement"}
                    textContent={statement}
                    handleOnClick={handleOnClick}
                    handleOnBlur={handleOnBlur}
                    handleFormInput={handleFormInput}
                    activeField={activeField}
                />
                {hoverButton}
            </div>
        )
    }
}

export default Statement
