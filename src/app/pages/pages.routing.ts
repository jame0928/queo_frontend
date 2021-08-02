import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//Guards
import { AuthGuard } from '../guards/auth.guard';

//Components
import { PagesComponent } from './pages.component';
import { CompanyComponent } from './company/company.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
    { 
        path: 'home', 
        component: PagesComponent,
        canActivate:[AuthGuard],
        children: [
            { path: 'company', component: CompanyComponent },
            { path: 'employee', component: EmployeeComponent },
            { path: '', redirectTo: 'company', pathMatch: 'full'},
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


