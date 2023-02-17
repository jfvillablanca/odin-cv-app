import { nanoid } from "nanoid";
import { Component, createContext } from "react";
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
    extends Array<[string | OrderedFieldsToRender, string, any]> {}

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

    handleFormInput = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        const stateKeys = (target.dataset as any).name.split("|") as [
            string,
            string,
            string?,
            string?
        ];
        const [key1, fieldToUpdate, subfieldId = "", subfieldIndex = ""] =
            stateKeys;
        const updatedValue = checkForEmptyField(
            [key1, fieldToUpdate],
            target.value
        );

        // TODO:
        // - Use id instead of field name
        // - implement for header subfield
        this.setState((prevState) => ({
            orderedFieldsToRender: prevState.orderedFieldsToRender.map(
                (orderedField) => {
                    const [id, name, _] = orderedField;
                    return name === fieldToUpdate
                        ? [id, name, updatedValue]
                        : orderedField;
                }
            ),
        }));
    };

    handleOnClickFormField = (dataName: string) => {
        if (this.state.documentMode === "field") {
            this.setState({
                editMode: true,
                currentTarget: dataName,
            });
        }
    };

    handleOnBlurFormField = (dataName: string) => {
        if (this.state.currentTarget === dataName) {
            this.setState({
                editMode: false,
                currentTarget: null,
            });
        }
    };

    handleOnClickDeleteField = (dataName: string) => {
        const stateKeys = dataName.split("|") as [string, string, string?];
        const [key1, key2, subfieldId = ""] = stateKeys;
        this.setState((prevState) => {
            const updatedState = { ...prevState };
            if (Array.isArray(updatedState[key1][key2])) {
                updatedState[key1][key2] = updatedState[key1][key2].filter(
                    (subfield: string[]) => subfield[0] !== subfieldId
                );
                return updatedState;
            }
            delete updatedState[key1][key2];
            return updatedState;
        });
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

function checkForEmptyField(stateKeys: [string, string], value: string) {
    if (
        stateKeys[0] === "headerFields" &&
        stateKeys[1] === "fullName" &&
        value === ""
    ) {
        return "Your name here";
    } else if (value === "") {
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

export default App;
