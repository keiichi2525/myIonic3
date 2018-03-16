export interface IData {
    id: number;
    name?: string;
}

export class Person {
    fname: string;
    lname: string;
    fullname: string;

    constructor() {

    }

    setFullname(fname: string, lname: string) {
        this.fname = fname;
        this.lname = lname;
    }

    getFullname() {
        let fullname = this.fname + ' ';
        fullname += this.lname;
        alert(fullname);
    }
}