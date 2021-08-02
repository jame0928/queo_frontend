import { Component, OnInit, Inject, OnDestroy, Input } from '@angular/core';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//services
import {EmployeeService} from '@services/api/employee.service';
//Models
import { EmployeeModel } from '@models/employeeModel';
import { Observable } from 'rxjs';
import { CompanyModel } from '@models/companyModel';
import { CompanyService } from '@services/api/company.service';



@Component({
  selector: 'employee-modal-form',
  templateUrl: './employee-modal-form.component.html',
  styleUrls: []
})
export class EmployeeModalFormComponent implements OnInit,OnDestroy {

  companies:CompanyModel[];

  // Public properties
  id:number; 
  employee:EmployeeModel;
  employeeForm: FormGroup;
  hasFormErrors: boolean = false;
  is_new:boolean = true;
  viewLoading: boolean = false;

  
  @Input() childMessage: string;


  /**
   * Creates an instance of EmployeeModalFormComponent.
   * @param {MatDialogRef<EmployeeModalFormComponent>} dialogRef
   * @param {*} data
   * @param {FormBuilder} fb
   * @param {EmployeeService} employeeService
   * @param {CompanyService} companyService
   * @memberof EmployeeModalFormComponent
   */
  constructor(
    public dialogRef: MatDialogRef<EmployeeModalFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public employeeService: EmployeeService,
    public companyService: CompanyService,
  ) { }



  /**
   * Create the form and load the employee data if it is an edition
   *
   * @memberof EmployeeModalFormComponent
   */
  ngOnInit() {    
    this.id = this.data?.id || null;    
    this.createForm();

    if(this.id){
      this.employeeService.getDataById(this.id).subscribe((response:any) => {
        this.employee = response;
        this.setValues();
      });
    }

    /** 
     * Load company list
    */
    this.companyService.getData().subscribe(response => {
      this.companies = response.data;
    }); 

  } 


  /**
   * Create the form fields with their respective validations
   *
   * @memberof EmployeeModalFormComponent
   */
  createForm() {
		this.employeeForm = this.fb.group({    
      company_id: [null, Validators.compose([Validators.required])], 
      first_name: [null, Validators.compose([Validators.required])], 
      last_name: [null, Validators.compose([Validators.required])], 
      email: [null, Validators.compose([Validators.email])],
      phone: [null],      
    });
    
    
  }


  /**
   * Assign the employee data to the form
   *
   * @memberof EmployeeModalFormComponent
   */
  setValues(){
    this.employeeForm.patchValue(this.employee);
  }



  /**
   * Run the form validation and send the data to the backend
   *
   * @param {*} employeeFormValues
   * @return {*} 
   * @memberof EmployeeModalFormComponent
   */
  onSubmit(employeeFormValues:any) {
    if(this.hasFormErrors = this.employeeService.validateFormErrors(this.employeeForm)){
      return;
    }    

    if(this.employee?.id){
      employeeFormValues.id = this.employee.id;
    }
    

    this.employeeService.save(employeeFormValues)
    .subscribe(response => {
        this.dialogRef.close({ response:response});       
    });

	}
  

	getTitle(): string {
		if (this.id) {
			return `Editando Empleado`;
		}

		return 'Creando Empleado';
  }
  

  ngOnDestroy() {

	}

}
