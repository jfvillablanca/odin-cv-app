import { Component } from "react";
import "./App.scss";
import A4 from "./components/A4";

class App extends Component {
    render() {
        return (
            <div className='App bg-gray-500 py-28'>
                <A4 />
            </div>
        );
    }
}

export default App;
