import { nanoid } from "nanoid";
import { Component } from "react";

class Block extends Component {
    render() {
        // NOTE: Mocks for props
        const blockHeading = "Experience";
        const field1 = {
            id: nanoid(),
            main: "Horizon Expert",
            sub: "2021-Present",
            p: "Lorem ipsum shitsadfskadjhf",
        };

        const field2 = {
            id: nanoid(),
            main: "Horizon professor",
            sub: "2012-2017",
            p: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
        };

        const blockFields = [field1, field2];

        const fieldComps = blockFields.map((field) => {
            return (
                <div className='py-5' key={field.id}>
                    <div className='flex justify-between items-center mb-3'>
                        <h1 className='capitalize font-bold text-2xl'>
                            {field.main}
                        </h1>
                        <h2 className='border-gray-900 border-2 rounded-full py-2 px-4 uppercase text-base font-bold'>
                            {field.sub}
                        </h2>
                    </div>
                    <p className='text-gray-600 leading-relaxed text-xl'>
                        {field.p}
                    </p>
                </div>
            );
        });

        return (
            <div>
                <div className='w-full'>
                    <div className='flex flex-col mt-4'>
                        <h1 className='flex justify-end font-bold tracking-wide uppercase text-3xl mb-4'>
                            {blockHeading}
                        </h1>
                        <div className='w-full border-b-2 border-gray-900 mb-1'></div>
                        <div className='w-full border-b-4 border-gray-900'></div>
                    </div>
                </div>
                <div className='flex flex-col divide-y divide-gray-500'>
                    {fieldComps}
                </div>
            </div>
        );
    }
}

export default Block;
