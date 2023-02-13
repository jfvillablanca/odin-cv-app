import { Component } from "react";
import "./App.scss";
import A4 from "./components/A4";
import Header from "./components/Header";

class App extends Component {
    render() {
        return (
            <div className='App bg-gray-500 py-14 px-10'>
                <A4>
                    <Header />
                </A4>
            </div>
        );
    }
}

export default App;
