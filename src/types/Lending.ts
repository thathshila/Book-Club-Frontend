export type Lending = {
    _id: string;
    book: {
        _id: string;
        title: string;
        author: string;
        isbn: string;
    };
    reader: {
        _id: string;
        name: string;
        email: string;
    };
    borrowDate: string;
    dueDate: string;
    returnDate?: string;
    status: "borrowed" | "returned";
};
