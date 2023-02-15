import { nanoid } from "nanoid";
import { Component } from "react";
import "./App.scss";
import A4 from "./components/A4";
import Block from "./components/Block";
import BlockContainer from "./components/BlockContainer";
import Header from "./components/Header/Header";

interface Field {
    id: string;
    main: string;
    sub?: string;
    p?: string;
}

interface HeaderValues {
    fullName: string;
    statement?: string;
    subfields?: Array<[string, string, string]>;
}

interface BlockValues {
    blockHeading: string;
    blockFields?: Array<Field>;
}

interface State {
    editMode: boolean;
    currentTarget: string | null;
    headerFields: HeaderValues;
    [key: string]: any;
}

class App extends Component<{}, State> {
    state: State = {
        editMode: false,
        currentTarget: null,
        headerFields: {
            fullName: "Lorem Ipsum",
            statement:
                "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi.",
            subfields: [
                [nanoid(), "profession", "professor"],
                [nanoid(), "phone", "696969"],
                [nanoid(), "email", "email@email.com"],
            ],
        } as HeaderValues,
    };

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
        const [key1, key2, key3 = "", key4 = ""] = stateKeys;
        const updatedValue = checkForEmptyField([key1, key2], target.value);

        this.setState((prevState) => {
            const updatedState = { ...prevState };
            if (Array.isArray(updatedState[key1][key2])) {
                const stateArray = updatedState[key1][key2];
                stateArray[key3 as string][key4 as string] = updatedValue;
                return stateArray;
            }
            updatedState[stateKeys[0]][stateKeys[1]] = updatedValue;
            return updatedState;
        });
    };

    handleOnClick = (dataName: string) => {
        this.setState({
            editMode: true,
            currentTarget: dataName,
        });
    };

    handleOnBlur = (dataName: string) => {
        if (this.state.currentTarget === dataName) {
            this.setState({
                editMode: false,
                currentTarget: null,
            });
        }
    };

    render() {
        return (
            <div className='App bg-gray-500 py-14 px-10'>
                <A4>
                    <Header
                        isEditMode={this.state.editMode}
                        handleOnClick={this.handleOnClick}
                        handleOnBlur={this.handleOnBlur}
                        activeField={this.state.currentTarget}
                        handleFormInput={this.handleFormInput}
                        headerFields={this.state.headerFields}
                    />
                    <BlockContainer>
                        <Block
                            blockValues={this.blockTemplate}
                        />
                    </BlockContainer>
                </A4>
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
    }
    return value;
}

export default App;
