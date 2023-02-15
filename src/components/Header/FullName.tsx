import { Component } from "react";
import Field from "../shared/Field";

interface Props {
    hoverColor: string;
    isEditMode: boolean;
    handleOnClick: Function;
    handleOnBlur: Function;
    handleFormInput: Function;
    activeField: string | null;
    fullName: string;
    children?: React.ReactNode;
}

class FullName extends Component<Props> {
    state = {
        isHovered: false,
    };

    handleMouseEnter = () => {
        this.setState({ isHovered: true });
    };

    handleMouseLeave = () => {
        this.setState({ isHovered: false });
    };

    render() {
        const hoverButton = this.props.children;
        const hoverColor = this.props.hoverColor;
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
        return (
            <div
                className={!isEditMode ? `${hoverColor} relative` : "relative"}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
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
                {this.state.isHovered && hoverButton}
            </div>
        );
    }
}

export default FullName;
