import { nanoid } from "nanoid";
import { Component } from "react";
import "./App.scss";
import {
    BlockTemplate,
    HeaderFieldsTemplate,
    Section,
} from "./assets/FieldTemplates";
import A4 from "./components/A4";
import Block from "./components/Block";
import BlockContainer from "./components/BlockContainer";
import FieldOptionContainer from "./components/FieldOption";
import Header from "./components/Header/Header";
import ModifyButton from "./components/ModifyButton";
import { AppContext, AppContextType } from "./components/shared/AppContext";

// NOTE:
// - This data structure is a big mistake
// - The state variable has become deeply nested
// - A technical debt that I don't like to pay
// - State object should be, ideally, flat
export interface OrderedFieldsToRender
    extends Array<[string, string | number, any | OrderedFieldsToRender]> {}

export interface State {
    editMode: boolean;
    openInsertFieldDialogBox: boolean;
    documentMode: "section" | "field";
    currentTarget: string | null;
    orderedFieldsToRender: OrderedFieldsToRender;
    [key: string]: any;
}

const templateState: State = {
    editMode: false,
    openInsertFieldDialogBox: false,
    documentMode: "field",
    currentTarget: null,
    orderedFieldsToRender: [],
};

class App extends Component<{}, State> {
    state: State = {
        editMode: false,
        documentMode: "field",
        currentTarget: null,
        headerFields: {
            fullName: "Your name here",
        },
    };

    componentDidMount() {
        const storedStateValue = localStorage.getItem("CV_state");
        if (storedStateValue) {
            this.setState(JSON.parse(storedStateValue));
        } else {
            this.setState(templateState);
        }
    }

    componentDidUpdate(_: {}, prevState: State) {
        if (prevState !== this.state) {
            localStorage.setItem("CV_state", JSON.stringify(this.state));
        }
    }

    blockTemplate: BlockValues = {
        blockHeading: "Experience",
        blockFields: [
            {
                id: nanoid(),
                main: "Horizon Expert",
                sub: "2021-Present",
                p: "Lorem ipsum shitsadfskadjhf",
            },
            {
                id: nanoid(),
                main: "Horizon professor",
                sub: "2012-2017",
                p: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
            },
        ] as Array<Field>,
    };

    handleFormInput = (event: React.SyntheticEvent, fieldId: string) => {
        this.setState((prevState) => ({
            orderedFieldsToRender: setFieldValueById(
                prevState.orderedFieldsToRender,
                fieldId,
                (event.target as HTMLInputElement).value
            ),
        }));
    };

    handleOnClickFormField = (fieldId: string) => {
        if (this.state.documentMode === "field") {
            this.setState({
                editMode: true,
                currentTarget: fieldId,
            });
        }
    };

    handleOnBlurFormField = (fieldId: string) => {
        const updatedValue = checkForEmptyField(
            getFieldById(this.state.orderedFieldsToRender, fieldId, "value")
        );
        if (this.state.currentTarget === fieldId) {
            this.setState((prevState) => ({
                editMode: false,
                currentTarget: null,
                orderedFieldsToRender: setFieldValueById(
                    prevState.orderedFieldsToRender,
                    fieldId,
                    updatedValue
                ),
            }));
        }
    };

    handleOnClickDeleteField = (fieldId: string) => {
        this.setState((prevState) => ({
            orderedFieldsToRender: deleteFieldById(
                prevState.orderedFieldsToRender,
                fieldId
            ),
        }));
    };


    openInsertFieldDialog = (fieldId: string) => {
        console.log(fieldId);
        this.setState({ openInsertFieldDialogBox: true });
    };

    closeInsertFieldDialog = () => {
        this.setState({ openInsertFieldDialogBox: false });
    };

    toggleDocumentMode = () => {
        this.setState((prevState) => {
            return {
                documentMode:
                    prevState.documentMode === "section" ? "field" : "section",
            };
        });
    };

    render() {
        const context = {
            state: this.state,
            handleFormInput: this.handleFormInput,
            handleOnClickFormField: this.handleOnClickFormField,
            handleOnBlurFormField: this.handleOnBlurFormField,
            handleOnClickDeleteField: this.handleOnClickDeleteField,
            toggleDocumentMode: this.toggleDocumentMode,
        };

        return (
            <div className='App bg-gray-500 py-14 px-10'>
                <AppContext.Provider value={context as AppContextType}>
                    <A4 documentMode={this.state.documentMode}>
                        <Header
                            documentMode={this.state.documentMode}
                            orderedFieldsToRender={
                                this.state.orderedFieldsToRender
                            }
                            headerFields={this.state.headerFields}
                        />
                        <ModifyButton
                            documentMode={this.state.documentMode}
                            toggleDocumentMode={this.toggleDocumentMode}
                        />
                        {this.state.openInsertFieldDialogBox && (
                            <FieldOptionContainer />
                        )}
                    </A4>
                </AppContext.Provider>
            </div>
        );
    }
}

function checkForEmptyField(value: string) {
    if (value.trim() === "") {
        return "Write here";
    }
    return value;
}

function getID(): string {
    return "id_" + nanoid();
}

function populateOrderedFieldsToRender(
    sections: Section[]
): OrderedFieldsToRender {
    return sections.map((section) => {
        const sectionFields = Object.entries(section)
            .map(([key, value]) => {
                if (key === "_sectionName") {
                    return null;
                }
                if (key === "subfields") {
                    const arrayValue = value.map(
                        (subfieldValue: any, index: number) => {
                            const subfieldId = getID();
                            const field1Id = getID();
                            const field2Id = getID();
                            const subfield = [
                                subfieldId,
                                index,
                                [
                                    [field1Id, "field1", subfieldValue.field1],
                                    [field2Id, "field2", subfieldValue.field2],
                                ],
                            ];
                            return subfield;
                        }
                    );
                    return [getID(), key, arrayValue];
                } else {
                    return [getID(), key, value];
                }
            })
            .filter((field) => field !== null);
        return [getID(), section._sectionName, sectionFields];
    });
}

function setFieldValueById(
    orderedFieldsToRender: OrderedFieldsToRender,
    fieldId: string,
    updatedValue: any
): OrderedFieldsToRender {
    return orderedFieldsToRender.map((orderedField) => {
        const [id, name, value] = orderedField;
        if (id === fieldId) {
            return [id, name, updatedValue];
        } else if (Array.isArray(value)) {
            return [id, name, setFieldValueById(value, fieldId, updatedValue)];
        } else {
            return orderedField;
        }
    });
}

function getFieldById(
    orderedFieldsToRender: OrderedFieldsToRender,
    fieldId: string,
    attribute: "name" | "value"
): any | OrderedFieldsToRender {
    for (const orderedField of orderedFieldsToRender) {
        const [id, name, value] = orderedField;
        if (id === fieldId) {
            return attribute === "value" ? value : name;
        } else if (Array.isArray(value)) {
            const fieldValue = getFieldById(value, fieldId, attribute);
            if (fieldValue !== null) {
                return fieldValue;
            }
        }
    }
    return null;
}

function deleteFieldById(
    orderedFields: OrderedFieldsToRender,
    fieldId: string
): OrderedFieldsToRender {
    return orderedFields
        .map((orderedField) => {
            const [id, name, value] = orderedField;

            if (id === fieldId) {
                return null;
            } else if (Array.isArray(value)) {
                const updatedValue = deleteFieldById(value, fieldId);
                if (updatedValue.length === 0) {
                    return null;
                } else {
                    return [id, name, updatedValue];
                }
            } else {
                return [id, name, value];
            }
        })
        .filter((value) => value !== null) as OrderedFieldsToRender;
}

export default App;
