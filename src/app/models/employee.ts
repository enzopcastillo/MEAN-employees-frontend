export class Employee {
    _id?: string;
    name: string;
    office: string;
    position: string;
    salary: number;

    constructor(_id="", name="", office="", position="", salary=0){
        this._id = _id;
        this.name = name;
        this.office = office;
        this.position = position;
        this.salary = salary;
    }
}
