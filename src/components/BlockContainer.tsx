import { Component } from "react";

interface Props {
    children?: React.ReactNode;
}

class BlockContainer extends Component<Props> {
    render() {
        return (
            <div className='flex gap-9'>
                {this.props.children}
            </div>
        );
    }
}

export default BlockContainer;
