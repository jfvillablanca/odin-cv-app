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
    state = {
        isHovered: true,
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
        return (
            <div
                className={!isEditMode ? `${hoverColor} relative` : "relative"}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <Field
                    tag={"p"}
                    isEditMode={isEditMode}
                    className='w-full mb-6'
                    dataName={"headerFields|statement"}
                    textContent={statement}
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

export default Statement;
