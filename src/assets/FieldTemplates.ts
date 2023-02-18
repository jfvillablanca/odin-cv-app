export interface Section {
    _sectionName: string;
}

interface HeaderValues extends Section {
    fullName: string;
    statement?: string;
    subfields?: Array<{}>;
    [key: string]: any;
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
