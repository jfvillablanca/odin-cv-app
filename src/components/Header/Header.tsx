import { Component } from "react";
import HoverButton from "../shared/HoverButton";
import FullName from "./FullName";
import HeaderSubfields from "./HeaderSubfields";

interface Props {
    isEditMode: boolean;
    handleOnClickFormField: Function;
    handleOnBlurFormField: Function;
    handleFormInput: Function;
    activeField: string | null;
    documentMode: "section" | "field";
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
        const documentMode = this.props.documentMode;
        const isEditMode = this.props.isEditMode;
        const activeField = this.props.activeField;
        const handleOnClickFormField = this.props.handleOnClickFormField as (
            dataName: string
        ) => void;
        const handleOnBlurFormField = this.props.handleOnBlurFormField as (
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
                        handleOnClick={handleOnClickFormField}
                        handleOnBlur={handleOnBlurFormField}
                        handleFormInput={handleFormInput}
                        activeField={activeField}
                        fullName={fullName}
                    >
                        {documentMode === "section" && (
                            <HoverButton canFieldBeRemoved={false} />
                        )}
                    </FullName>
                    {!!statement && (
                            hoverColor={hoverColor.blue}
                        >
                    )}
                    {subfields.length !== 0 && (
                        <HeaderSubfields
                            hoverColor={hoverColor.blue}
                            isEditMode={isEditMode}
                            handleOnClick={handleOnClickFormField}
                            handleOnBlur={handleOnBlurFormField}
                            handleFormInput={handleFormInput}
                            activeField={activeField}
                            subfields={subfields}
                        >
                            {documentMode === "section" && <HoverButton />}
                        </HeaderSubfields>
                    )}
                </div>
            </div>
        );
    }
}
export default Header;
