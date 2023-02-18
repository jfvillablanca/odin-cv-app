import { nanoid } from "nanoid";
import { Component } from "react";
import "./App.scss";
import A4 from "./components/A4";
import Block from "./components/Block";
import BlockContainer from "./components/BlockContainer";
import Header from "./components/Header/Header";
import ModifyButton from "./components/ModifyButton";
import { AppContext, AppContextType } from "./components/shared/AppContext";

interface Field {
    id: string;
    main: string;
    sub?: string;
    p?: string;
}

interface Section {
    _sectionName: string;
}

interface HeaderValues extends Section {
    fullName: string;
    statement?: string;
    subfields?: Array<[string, string]>;
    [key: string]: any;
}

interface BlockValues {
    blockHeading: string;
    blockFields?: Array<Field>;
}

export interface OrderedFieldsToRender
    extends Array<[string, string, any | OrderedFieldsToRender]> {}

export interface State {
    editMode: boolean;
    documentMode: "section" | "field";
    currentTarget: string | null;
    orderedFieldsToRender: OrderedFieldsToRender;
    [key: string]: any;
}

const HeaderFieldsTemplate: HeaderValues = {
    _sectionName: "headerFields",
    fullName: "Lorem Ipsum",
    statement:
        "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi.",
    subfields: [
        ["profession", "professor"],
        ["phone", "696969"],
        ["email", "email@email.com"],
    ],
};

const templateState: State = {
    editMode: false,
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
        // TODO:
        // - implement for header subfield
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
            getFieldValueById(this.state.orderedFieldsToRender, fieldId)
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
                if (Array.isArray(value)) {
                    const arrayValue = value.map(
                        (subfieldValue: any, index) => {
                            return [getID(), index, subfieldValue];
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

function getFieldValueById(
    orderedFieldsToRender: OrderedFieldsToRender,
    fieldId: string
): any | OrderedFieldsToRender {
    for (const orderedField of orderedFieldsToRender) {
        const [id, _, value] = orderedField;
        if (id === fieldId) {
            return value;
        } else if (Array.isArray(value)) {
            const fieldValue = getFieldValueById(value, fieldId);
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
