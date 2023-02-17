import { Component } from "react";
import HoverButton from "../shared/HoverButton";
import { OrderedFieldsToRender } from "../../App";
import FieldWrapper from "./FieldWrapper";
import HeaderSubfields from "./HeaderSubfields";

interface Props {
    documentMode: "section" | "field";
    orderedFieldsToRender: OrderedFieldsToRender;
    headerFields: {
        fullName: string;
        statement?: string;
        subfields?: Array<[string, string, string]>;
    };
}

const hoverColor = {
    blue: "hover:bg-blue-100",
};

class Header extends Component<Props> {
    render() {
        const documentMode = this.props.documentMode;
        const { fullName, statement, subfields = [] } = this.props.headerFields;

        return (
            <div className='Section grid w-full mb-9'>
                <div className='flex flex-col'>
                    <FieldWrapper
                        tag={"h1"}
                        tailwindStyles={"w-full font-semibold text-3xl mb-6"}
                        hoverColor={hoverColor.blue}
                        dataName={"headerFields|fullName"}
                        textContent={fullName}
                    >
                        {documentMode === "section" && (
                            <HoverButton canFieldBeRemoved={false} />
                        )}
                    </FieldWrapper>
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
