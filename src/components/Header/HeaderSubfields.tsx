import { Component } from "react";
import Field from "../shared/Field";

interface Props {
    hoverColor: string;
    isEditMode: boolean;
    handleOnClick: Function;
    handleOnBlur: Function;
    handleFormInput: Function;
    activeField: string | null;
    subfields: Array<[string, string, string]>;
    children?: React.ReactNode;
}
interface State {
    isHovered: boolean[];
}

class HeaderSubfields extends Component<Props, State> {
    state = {
        isHovered: [false, false, false],
    };

    handleMouseEnter = (index: number) => {
        this.setState((prevState) => {
            const isHovered = [...prevState.isHovered];
            isHovered[index] = true;
            return { isHovered };
        });
    };

    handleMouseLeave = (index: number) => {
        this.setState((prevState) => {
            const isHovered = [...prevState.isHovered];
            isHovered[index] = false;
            return { isHovered };
        });
    };

    render() {
        const hoverButton = this.props.children;
        const hoverColor = this.props.hoverColor;
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

        const subfields = this.props.subfields;
        const headerSubFields = subfields.map((subfield, index) => {
            return (
                <div
                    key={subfield[0]}
                    className={`relative flex justify-between py-3 uppercase text-lg tracking-wider font-extrabold ${
                        !isEditMode ? `${hoverColor}` : ""
                    }`}
                    onMouseEnter={() => this.handleMouseEnter(index)}
                    onMouseLeave={() => this.handleMouseLeave(index)}
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
                    {this.state.isHovered[index] && hoverButton}
                </div>
            );
        });

        return (
            <div className='flex flex-col border-t-2 border-b-2 border-gray-400 divide-y-2 divide-gray-400'>
                {headerSubFields}
            </div>
        );
    }
}

export default HeaderSubfields;
