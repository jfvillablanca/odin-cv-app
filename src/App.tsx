import { nanoid } from "nanoid";
import { Component } from "react";
import "./App.scss";
import A4 from "./components/A4";
import Block from "./components/Block";
import BlockContainer from "./components/BlockContainer";
import Header from "./components/Header";

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

class App extends Component {
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

    headerTemplate: HeaderValues = {
        fullName: "Lorem Ipsum",
        statement:
            "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi.",
        subfields: [
            [nanoid(), "profession", "professor"],
            [nanoid(), "phone", "696969"],
            [nanoid(), "email", "email@email.com"],
        ],
    };

    render() {
        return (
            <div className='App bg-gray-500 py-14 px-10'>
                <A4>
                    <Header headerValues={this.headerTemplate} />
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

export default App;
