import { Component } from "react";
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

        return (
            <div className='Section grid w-full mb-9'>
                <div className='flex flex-col'>
                </div>
            </div>
        );
    }
}
export default Header;
