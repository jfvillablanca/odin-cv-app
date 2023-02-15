import { Component } from "react";
import Field from "../shared/Field";

interface Props {
    isEditMode: boolean;
    handleOnClick: Function;
    handleOnBlur: Function;
    handleFormInput: Function;
    activeField: string | null;
    fullName: string;
}

class FullName extends Component<Props> {
    render() {
        const hoverColor = {
            blue: 'hover:bg-blue-100',
        };
        const isEditMode = this.props.isEditMode;
        const activeField = this.props.activeField;
        const fullName = this.props.fullName;
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
            <div className={!isEditMode ? `${hoverColor.blue}`: ''}>
                <Field
                    tag={"h1"}
                    isEditMode={isEditMode}
                    className='w-full font-semibold text-3xl mb-6'
                    dataName={"headerFields|fullName"}
                    textContent={fullName}
                    handleOnClick={handleOnClick}
                    handleOnBlur={handleOnBlur}
                    handleFormInput={handleFormInput}
                    activeField={activeField}
                />
            </div>
        )
    }
}

export default FullName
