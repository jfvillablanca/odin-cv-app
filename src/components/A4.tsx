import React, { Component } from "react";

interface Props {
    children?: React.ReactNode;
}

class A4 extends Component<Props> {
    render() {
        return (
            <div className='A4 bg-gray-100 text-gray-800'>
                {this.props.children}
            </div>
        )
    }
}

export default A4;
