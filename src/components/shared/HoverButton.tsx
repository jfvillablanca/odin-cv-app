import { Component } from "react";

interface Props {
    canFieldBeRemoved?: boolean;
    handleOnClickDeleteField?: Function;
    dataName?: string;
}

class HoverButton extends Component<Props> {
    render() {
        const handleOnClickDeleteField = this.props
            .handleOnClickDeleteField as (dataName: string) => void;
        const { dataName, canFieldBeRemoved = true } = this.props;
        return (
            <div className='absolute flex gap-2 z-10 h-12 bottom-0 transform -translate-x-1/2 translate-y-12 left-1/2'>
                <InsertButton />
                {canFieldBeRemoved && (
                    <DeleteButton
                        field={dataName as string}
                        handleClick={handleOnClickDeleteField}
                    />
                )}
            </div>
        );
    }
}

class InsertButton extends Component {
    render() {
        return (
            <button className='bg-zinc-50 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-zinc-50 hover:border-green-500 opacity-80 text-lg rounded-2xl py-1 px-4 uppercase'>{`Insert below`}</button>
        );
    }
}

class DeleteButton extends Component<{
    field: string;
    handleClick: (dataName: string) => void;
}> {
    render() {
        const handleClick = this.props.handleClick as (
            dataName: string
        ) => void;
        const field = this.props.field;
        return (
            <button
                onClick={() => handleClick(field)}
                className='bg-zinc-50 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-zinc-50 hover:border-red-500 opacity-80 text-lg rounded-2xl py-1 px-4 uppercase'
            >{`Delete field`}</button>
        );
    }
}

export default HoverButton;
