import { EmployeeModel } from "./employeeModel";

export class CompanyModel {

    id:number = null;
    name:string = null;
    email:string = null;
    logo:string = null;
    website:string = null;

    employees:EmployeeModel[] = null;
}
