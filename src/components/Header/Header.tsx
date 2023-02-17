import { Component } from "react";
import { OrderedFieldsToRender } from "../../App";
import FieldWrapper from "./FieldWrapper";
import HeaderSubfields from "./HeaderSubfields";

interface Props {
    orderedFieldsToRender: OrderedFieldsToRender;
}

const hoverColor = {
    blue: "hover:bg-blue-100",
};

const fieldConfig: { [key: string]: any } = {
    fullName: {
        tag: "h1",
        tailwindStyles: "w-full font-semibold text-3xl mb-6",
        hoverColor: hoverColor.blue,
        canFieldBeRemoved: false,
    },
    statement: {
        tag: "p",
        tailwindStyles: "w-full mb-6",
        hoverColor: hoverColor.blue,
        canFieldBeRemoved: true,
    },
};

class Header extends Component<Props> {
    render() {
        const orderedFieldsToRender = this.props.orderedFieldsToRender;
        const headerFields = orderedFieldsToRender.map((fieldToRender) => {
            const [id, fieldName, fieldValue] = fieldToRender;
            const fieldWrapperConfigs = fieldConfig[fieldName];
            if (fieldWrapperConfigs) {
                return (
                    <FieldWrapper
                        key={id}
                        fieldId={id}
                        {...fieldWrapperConfigs}
                        textContent={fieldValue}
                    />
                );
            }
        });

        return (
            <div className='Section grid w-full mb-9'>
                <div className='flex flex-col'>
                    {headerFields}
                </div>
            </div>
        );
    }
}
export default Header;
