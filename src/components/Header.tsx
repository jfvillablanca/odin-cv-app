import { Component } from "react";
import Field from "./Field";

interface Props {
    isEditMode: boolean;
    handleEditMode: Function;
    handleFormInput: Function;
    headerFields: {
        fullName: string;
        statement?: string;
        subfields?: Array<[string, string, string]>;
    };
}

class Header extends Component<Props> {
    render() {
        const isEditMode = this.props.isEditMode;
        const handleEditMode = this.props.handleEditMode as React.FormEventHandler<HTMLElement>;
        const handleFormInput = this.props.handleFormInput as (event: React.SyntheticEvent) => void;
        const { fullName, statement, subfields = [] } = this.props.headerFields;
        const headerSubFields = subfields.map((subfield) => {
            return (
                <div
                    key={subfield[0]}
                    className='flex justify-between py-3 uppercase text-lg tracking-wider font-extrabold'
                >
                    <p>{subfield[1]}</p>
                    <p>{subfield[2]}</p>
                </div>
            );
        });

        return (
            <div className='Section grid w-full mb-9'>
                <div className='flex flex-col'>
                    <Field 
                        tag={"h1"} 
                        isEditMode={isEditMode}
                        className='font-semibold text-3xl mb-6' 
                        dataName={"headerFields|fullName"} 
                        textContent={fullName} 
                        handleEditMode={handleEditMode} 
                        handleFormInput={handleFormInput} 
                    />
                    <p className='text-gray-600 mb-6'>{statement}</p>
                    <div className='flex flex-col border-t-2 border-b-2 border-gray-500 divide-y-2 divide-gray-500'>
                        {headerSubFields}
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;
