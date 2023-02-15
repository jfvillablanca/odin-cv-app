import { Component } from "react";

class HoverButton extends Component {
    render() {
        const field = 'field';
        return(
            <div className="absolute z-10 h-12 bottom-0 transform -translate-x-1/2 translate-y-12 left-1/2">
                <div className="border-b-2 border-gray-500"></div>
                <button className="bg-zinc-50 border-gray-500 text-gray-500 opacity-80 text-lg border-2 rounded-2xl py-1 px-4 uppercase">{`New ${field}`}</button>
            </div>
        )
    }
}

export default HoverButton
