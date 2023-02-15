import { Component } from "react";
import HoverButton from "../shared/HoverButton";
import FullName from "./FullName";
import HeaderSubfields from "./HeaderSubfields";
import Statement from "./Statement";

interface Props {
    isEditMode: boolean;
    handleOnClick: Function;
    handleOnBlur: Function;
    handleFormInput: Function;
    activeField: string | null;
    headerFields: {
        fullName: string;
        statement?: string;
        subfields?: Array<[string, string, string]>;
    };
}

class Header extends Component<Props> {
    render() {
        const hoverColor = {
            blue: "hover:bg-blue-100",
        };
        const isEditMode = this.props.isEditMode;
        const activeField = this.props.activeField;
        const handleOnClick = this.props.handleOnClick as (
            dataName: string
        ) => void;
        const handleOnBlur = this.props.handleOnBlur as (
            dataName: string
        ) => void;
        const handleFormInput = this.props.handleFormInput as (
            event: React.SyntheticEvent
        ) => void;
        const { fullName, statement, subfields = [] } = this.props.headerFields;

        return (
            <div className='Section grid w-full mb-9'>
                <div className='flex flex-col'>
                    <FullName
                        hoverColor={hoverColor.blue}
                        isEditMode={isEditMode}
                        handleOnClick={handleOnClick}
                        handleOnBlur={handleOnBlur}
                        handleFormInput={handleFormInput}
                        activeField={activeField}
                        fullName={fullName}
                    >
                        <HoverButton />
                    </FullName>
                    {!!statement && (
                        <Statement
                            hoverColor={hoverColor.blue}
                            isEditMode={isEditMode}
                            handleOnClick={handleOnClick}
                            handleOnBlur={handleOnBlur}
                            handleFormInput={handleFormInput}
                            activeField={activeField}
                            statement={statement}
                        >
                            <HoverButton />
                        </Statement>
                    )}
                    {subfields.length !== 0 && (
                        <HeaderSubfields
                            hoverColor={hoverColor.blue}
                            isEditMode={isEditMode}
                            handleOnClick={handleOnClick}
                            handleOnBlur={handleOnBlur}
                            handleFormInput={handleFormInput}
                            activeField={activeField}
                            subfields={subfields}
                        >
                            <HoverButton />
                        </HeaderSubfields>
                    )}
                </div>
            </div>
        );
    }
}
export default Header;
