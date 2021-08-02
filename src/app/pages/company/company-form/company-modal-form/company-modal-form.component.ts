import { Component, OnInit, Inject, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//services
import {CompanyService} from '@services/api/company.service';
//Models
import { CompanyModel } from '@models/companyModel';
import { Observable } from 'rxjs';
import { serialize } from 'object-to-formdata';


@Component({
  selector: 'company-modal-form',
  templateUrl: './company-modal-form.component.html',
  styleUrls: []
})
export class CompanyModalFormComponent implements OnInit,OnDestroy {

  autoCity: Observable<any[]>;

  // Public properties
  id:number; 
  company:CompanyModel;
  companyForm: FormGroup;
  hasFormErrors: boolean = false;
  is_new:boolean = true;
  viewLoading: boolean = false;

  
  @Input() childMessage: string;

  @ViewChild('inputFile', {static: false}) inputFile: ElementRef;


  /**
   * Creates an instance of CompanyModalFormComponent.
   * @param {MatDialogRef<CompanyModalFormComponent>} dialogRef
   * @param {*} data
   * @param {FormBuilder} fb
   * @param {CompanyService} companyService
   * @memberof CompanyModalFormComponent
   */
  constructor(
    public dialogRef: MatDialogRef<CompanyModalFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public companyService: CompanyService,
  ) { }



  /**
   * Create the form and load the company data if it is an edition
   *
   * @memberof CompanyModalFormComponent
   */
  ngOnInit() {    
    this.id = this.data?.id || null;    
    this.createForm();

    if(this.id){
      this.companyService.getDataById(this.id).subscribe((response:any) => {
        this.company = response;
        this.setValues();
      });
    }

  } 


  /**
   * Create the form fields with their respective validations
   *
   * @memberof CompanyModalFormComponent
   */
  createForm() {
		this.companyForm = this.fb.group({    
      name: [null, Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(150)])], 
      email: [null, Validators.compose([Validators.email])],
      website: [null], 
      file: [],     
    });
    
    
  }


  /**
   * Assign the company data to the form
   *
   * @memberof CompanyModalFormComponent
   */
  setValues(){
    this.companyForm.patchValue(this.company);
  }



  /**
   * It is triggered when selecting a file, and assigns the data to the form field
  *
  * @param {FileList} files
  * @memberof GeneratePqrComponent
  */
   handleFileInput(files: FileList) {
    const fileToUpload = files.item(0);
    this.companyForm.get('file').setValue(fileToUpload);
  }



  /**
   * Run the form validation and send the data to the backend
   *
   * @param {*} companyFormValues
   * @return {*} 
   * @memberof CompanyModalFormComponent
   */
  onSubmit(companyFormValues:any) {
    if(this.hasFormErrors = this.companyService.validateFormErrors(this.companyForm)){
      return;
    }    

    if(this.company?.id){
      companyFormValues.id = this.company.id;
    }

    companyFormValues = serialize(
      companyFormValues,
      {indices:true,booleansAsIntegers:true}
    );
    

    this.companyService.save(companyFormValues,'formData')
    .subscribe(response => {
        this.dialogRef.close({ response:response});       
    });

	}
  

	getTitle(): string {
		if (this.id) {
			return `Editando Empresa`;
		}

		return 'Creando Empresa';
  }
  

  ngOnDestroy() {

	}

}
