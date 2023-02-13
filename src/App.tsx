import { nanoid } from "nanoid";
import { Component } from "react";
import "./App.scss";
import A4 from "./components/A4";
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

class App extends Component {
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
                    </BlockContainer>
                </A4>
            </div>
        );
    }
}

export default App;
