import { nanoid } from "nanoid";
import { Component } from "react";

class Section extends Component {
    render() {
        return (
            <div className='Section'>
            </div>
        );
    }
}

export default Section;

class Header extends Component {
    fakeProps = {
        fullName: "Lorem Ipsum",
        statement:
            "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi.",
        subfields: [[nanoid(),"profession", "professor"], [nanoid(),"phone","696969"], [nanoid(),"email","email@email.com"]],
    };

    render() {
        const { fullName, statement, subfields } =
            this.fakeProps;
        const headerSubFields = subfields.map(subfield => {
            return(
                <div key={subfield[0]} className='flex justify-between py-3 uppercase text-lg tracking-wider font-extrabold'>
                    <p>{subfield[1]}</p>
                    <p>{subfield[2]}</p>
                </div>
            )
        });

        return (
            <div className='Section grid w-full mb-9'>
                <div className='flex flex-col'>
                    <h1 className='font-semibold text-3xl mb-6'>{fullName}</h1>
                    <p className='text-gray-600 mb-6'>{statement}</p>
                    <div className='flex flex-col border-t-2 border-b-2 border-gray-500 divide-y-2 divide-gray-500'>
                        {headerSubFields}
                    </div>
                </div>
            </div>
        );
    }
}

