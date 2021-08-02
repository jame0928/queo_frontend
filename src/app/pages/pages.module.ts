import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

//Routing module
import { PagesRoutingModule } from './pages.routing';

// Application modules
import { SharedModule } from '../shared/shared.module';


//Components
import { PagesComponent } from './pages.component';

//COMPANIES COMPONENTS
import { CompanyComponent } from './company/company.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { CompanyModalFormComponent } from './company/company-form/company-modal-form/company-modal-form.component';

//COMPANIES COMPONENTS
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { EmployeeModalFormComponent } from './employee/employee-form/employee-modal-form/employee-modal-form.component';








@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    SharedModule,
    PagesRoutingModule,  
    FormsModule,    
    ReactiveFormsModule,  
        
    MatTableModule,
    MatPaginatorModule,
		MatSortModule,
    MatCheckboxModule,    
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  declarations: [
    PagesComponent,
    CompanyComponent,
    CompanyFormComponent,
    CompanyModalFormComponent,
    EmployeeComponent,
    EmployeeFormComponent,
    EmployeeModalFormComponent,
  ],
  exports: [
    PagesComponent,
  ],
  
})
export class PagesModule { }
