import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//material
import { MatInputModule } from '@angular/material/input';

//Rounting Module
import { AuthRoutingModule } from './auth.routing';

//App Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,    
    FormsModule,
    MatInputModule,
		ReactiveFormsModule,
  ]
})
export class AuthModule { }
