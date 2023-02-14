import { Component } from "react";
import Field from "./Field";

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
            blue: 'hover:bg-blue-100',
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
        const headerSubFields = subfields.map((subfield, index) => {
            return (
                <div
                    key={subfield[0]}
                    className={`flex justify-between py-3 uppercase text-lg tracking-wider font-extrabold ${!isEditMode ? `${hoverColor.blue}`: ''}`}
                >
                    <Field
                        tag={"h3"}
                        isEditMode={isEditMode}
                        className=''
                        dataName={`headerFields|subfields|${index}|1`}
                        textContent={subfield[1]}
                        handleOnClick={handleOnClick}
                        handleOnBlur={handleOnBlur}
                        handleFormInput={handleFormInput}
                        activeField={activeField}
                    />
                    <Field
                        tag={"h3"}
                        isEditMode={isEditMode}
                        className=''
                        dataName={`headerFields|subfields|${index}|2`}
                        textContent={subfield[2]}
                        handleOnClick={handleOnClick}
                        handleOnBlur={handleOnBlur}
                        handleFormInput={handleFormInput}
                        activeField={activeField}
                    />
                </div>
            );
        });

        return (
            <div className='Section grid w-full mb-9'>
                <div className='flex flex-col'>
                    <div className={!isEditMode ? `${hoverColor.blue}`: ''}>
                        <Field
                            tag={"p"}
                            isEditMode={isEditMode}
                            className='text-gray-600 mb-6'
                            dataName={"headerFields|statement"}
                            textContent={statement}
                            handleOnClick={handleOnClick}
                            handleOnBlur={handleOnBlur}
                            handleFormInput={handleFormInput}
                            activeField={activeField}
                        />
                    </div>
                    {!!statement && (
                        <div className={!isEditMode ? `${hoverColor.blue}`: ''}>
                            <Field
                                tag={"p"}
                                isEditMode={isEditMode}
                                className='w-full text-gray-600 mb-6'
                                dataName={"headerFields|statement"}
                                textContent={statement}
                                handleOnClick={handleOnClick}
                                handleOnBlur={handleOnBlur}
                                handleFormInput={handleFormInput}
                                activeField={activeField}
                            />
                        </div>
                    )}
                    {subfields.length !== 0 && (
                        <div className='flex flex-col border-t-2 border-b-2 border-gray-500 divide-y-2 divide-gray-500'>
                            {headerSubFields}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default Header;
