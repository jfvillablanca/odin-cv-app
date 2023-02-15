import { Component } from "react";

class HoverButton extends Component {
    render() {
        return (
            <div className='absolute flex z-10 h-12 bottom-0 transform -translate-x-1/2 translate-y-12 left-1/2'>
                <InsertButton />
            </div>
        );
    }
}

class InsertButton extends Component {
    render() {
        const field = "field";
        return (
            <button className='bg-zinc-50 border-gray-500 text-gray-500 opacity-80 text-lg border-2 rounded-2xl py-1 px-4 uppercase'>{`Insert ${field} below`}</button>
        );
    }
}

export default HoverButton;
