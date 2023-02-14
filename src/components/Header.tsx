import { Component } from "react";

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
        const handleEditMode = this.props.handleEditMode as React.FormEventHandler<HTMLHeadingElement>;
        const handleFormInput = this.props.handleFormInput as React.FormEventHandler<HTMLHeadingElement>;
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
                    {
                        !isEditMode 
                            ? <h1 className='font-semibold text-3xl mb-6' onClick={handleEditMode} data-name={"headerFields|fullName"}>{fullName}</h1>
                            : <input className='font-semibold text-3xl mb-6' autoFocus data-name={"headerFields|fullName"} onBlur={handleEditMode} onChange={handleFormInput} value={fullName} />
                    }
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
