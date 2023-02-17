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

const fieldConfig: { [key: string]: any } = {
    fullName: {
        tag: "h1",
        tailwindStyles: "w-full font-semibold text-3xl mb-6",
        hoverColor: hoverColor.blue,
        dataName: "headerFields|fullName",
        canFieldBeRemoved: false,
    },
    statement: {
        tag: "p",
        tailwindStyles: "w-full mb-6",
        hoverColor: hoverColor.blue,
        dataName: "headerFields|statement",
        canFieldBeRemoved: true,
    },
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
