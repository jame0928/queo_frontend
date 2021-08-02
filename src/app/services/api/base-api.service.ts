// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { catchError, finalize, map } from 'rxjs/operators';

//environment
import { environment } from '@environments/environment';

// CRUD
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})
export class BaseApiService {

    // Public properties
    //private access_token = localStorage.getItem(environment.authTokenKey);
    public BACKEND_URL = environment.backendUrl;    
    
    public loading = false;   
    public url = '';
    public newMsg = 'Registro creado con exito';
    public editMsg = 'Registro actualizado con exito';
    public msg_time = 5000;

    public formErrorMsg = 'Oops! Cambia algunas cosas e intenta nuevamente.';


    
    
    public tableConfig:any = {
        'pageSize':5,
        'sizeOptions':[5,10,20],
        'showFirstLastButtons':true
    }

	/**
	 * Service constructor
	 */    
	constructor(
        public http:HttpClient ,
        public snackBar:MatSnackBar,
        public router:Router 
    ) {
		  
    }

    getDataById(id:number,parameters:any = []):  Observable<any[]> {    
        this.loading = true;  
         
        return this.http.get<any[]>(this.BACKEND_URL+'/'+this.url+'/'+id, {
            params: new HttpParams({ fromObject : parameters})                
        }).pipe(   
            catchError((error) => {
                return this.error(error);
            }),         
            finalize(() => {
                this.loading = false;
                
            })
        );
	}
    
	getData(parameters:any = []):  Observable<any> {  
        this.loading = true;  
             
        
        return this.http.get<any>(this.BACKEND_URL+'/'+this.url, {
            params: new HttpParams({ fromObject : parameters})                
        }).pipe(    
            catchError((error) => {
                return this.error(error);                                
            }),         
            finalize(() => {
                
                this.loading = false;
                
            })
        );
  }
  

  getPostData(parameters:any = []):  Observable<any> { 
      
    this.loading = true;      
    return this.http.post<any>(this.BACKEND_URL+'/'+this.url, parameters).pipe(    
        catchError((error) => {
            console.log(error)
            return this.error(error);                                
        }),         
        finalize(() => {            
            this.loading = false;            
        })
    );
}
	

	save(model:any,type:string = 'object'):  Observable<any> {

        let put_method = 'put';
        let id = 0;

        if(type == 'formData'){            
            id = model.get('id');
            //in edition change the method
            if(id){
                model.append('_method','PUT');
            }            
            put_method = 'post';
        }else if(model.id){
            id = model.id;
        }

      
        this.loading = true;       
		if(!id){     
            var msgSuccess = this.newMsg;
			var request = this.http['post']<any>(this.BACKEND_URL+'/'+this.url, model);
        }else{
            var msgSuccess = this.editMsg;
            var request =  this.http[put_method]<any>(this.BACKEND_URL+'/'+this.url+'/'+id, model);
        }		

        

        return request.pipe( 
            catchError((response) => {
                console.log(response.error)
                if(response?.error?.errors){
                    console.log(response?.error?.errors)

                    var i = 0;
                    var time = 1700;
                    for(const error in response.error.errors) {
                        setTimeout(() => {              
                            this.snackBar.open(response.error.errors[error][0], 'X', {
                                duration: time,
                                panelClass: ['error']
                            });            
                        }, i * (time+1000));                        
                      i++;
                    }
                    
                }
                return this.error(response);
            }),  
            map((response) => {
                this.snackBar.open(msgSuccess, 'X', {
                    duration: this.msg_time,
                    panelClass: []
                });

                return response;
            }),    
            finalize(() => {
                this.loading = false;  
              
            })
        );
    }


    delete(id:number,withSuccessMsg:boolean = true):  Observable<any> {
        this.loading = true;

        return this.http['delete']<any>(this.BACKEND_URL+'/'+this.url+'/'+id).pipe( 
            catchError((response) => {                
                return this.error(response);
            }),  
            map((response) => {
                if(withSuccessMsg){
                    this.snackBar.open('El registro se eliminó exitosamente!', 'X', {
                        duration: this.msg_time,
                        panelClass: []
                    });
                }                

                return response;
            }),    
            finalize(() => {              
                this.loading = false;  
                //this.ktDialog.hide();                
            })
        );
    }
 

    validateFormErrors(formGroup: FormGroup) {
        //const controls = formGroup.controls;
        let hasFormErrors = false;
		/** check form */
		if (formGroup.invalid) {
            
            Object.keys(formGroup.controls).forEach(field => {
                const control = formGroup.get(field);
                if (control instanceof FormArray) {
                for (const control1 of control.controls) {
                    if (control1 instanceof FormControl) {
                    control1.markAsTouched({
                        onlySelf: true
                    });
                    }
                    if (control1 instanceof FormGroup) {
                        this.validateFormErrors(control1);
                    }
                }
                // control.markAsTouched();
                }
                if (control instanceof FormControl) {
                control.markAsTouched({
                    onlySelf: true
                });
                } else if (control instanceof FormGroup) {
                    this.validateFormErrors(control);
                }
            });

			hasFormErrors = true;
        }
        return hasFormErrors;        
    }

    private error(error:HttpErrorResponse){   

        if(typeof(error?.error?.error) == 'string'){
            this.snackBar.open(error?.error?.error, 'X', {
                duration: this.msg_time,
                panelClass: ['error']
            });
        }
        else if(error?.error?.messages){
            error?.error?.messages.forEach(msg => {
                this.snackBar.open(msg.message, 'X', {
                    duration: this.msg_time,
                    panelClass: [msg.type]
                });
            })
        }else if(error?.status == 403){
            this.snackBar.open('El usuario no tiene privilegios para realizar esta acción. Comuniquese con el administrador', 'X', {
                duration: this.msg_time,
                panelClass: ['error']
            });
        }
        else{
            this.snackBar.open('Ha ocurrido un error, intente de nuevo, si el problema persiste comuniquese con el administrador', 'X', {
                duration: this.msg_time,
                panelClass: ['error']
            });
        }
        
        return throwError(error);
    }    

}
