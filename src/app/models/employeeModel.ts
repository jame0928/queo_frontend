import { CompanyModel } from "./companyModel";

export class EmployeeModel {

    id:number = null;
    company_id:number = null;
    first_name:string = null;
    last_name:string = null;
    email:string = null;
    phone:string = null;
    
    full_name:string = null;

    company:CompanyModel = null;
}
