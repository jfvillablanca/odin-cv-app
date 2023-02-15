import React, { Component } from "react";

interface Props {
    documentMode: "section" | "field";
    children?: React.ReactNode;
}

class A4 extends Component<Props> {
    render() {
        const textColor = 
            this.props.documentMode === "field"
                ? "text-gray-800" 
                : "text-gray-400";

        return (
            <div className={`A4 relative bg-gray-100 ${textColor}`}>
                {this.props.children}
            </div>
        )
    }
}

export default A4;
