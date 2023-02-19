interface Field {
    main: string;
    sub?: string;
    p?: string;
}

export interface Section {
    _sectionName: string;
}

interface HeaderValues extends Section {
    fullName: string;
    statement?: string;
    subfields?: Array<{}>;
    [key: string]: any;
}

interface BlockValues extends Section {
    blockHeading: string;
    blockFields?: Array<Field>;
}

export const HeaderFieldsTemplate: HeaderValues = {
    _sectionName: "headerFields",
    fullName: "Lorem Ipsum",
    statement:
        "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi.",
    subfields: [
        { field1: "profession", field2: "professor" },
        { field1: "phone", field2: "234234" },
        { field1: "email", field2: "email@email.com" },
    ],
};

export const BlockTemplate: BlockValues = {
    _sectionName: "block",
    blockHeading: "Experience",
    blockFields: [
        {
            main: "Horizon Expert",
            sub: "2021-Present",
            p: "Lorem ipsum shitsadfskadjhf",
        },
        {
            main: "Horizon professor",
            sub: "2012-2017",
            p: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
        },
    ] as Array<Field>,
};
