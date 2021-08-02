// Angular
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

//Environment
import { environment } from '@environments/environment';

//Base service
import {BaseApiService} from '@services/api/base-api.service';

//Models
import { User } from '@models/user.model';

@Injectable({
  providedIn:'root'
})
export class AuthService extends BaseApiService{
	// Public properties
  public url = 'auth/login';		

	login(email: string, password: string): Observable<User> {

    return this.getPostData({
      email:email,
      password:password,
    }).pipe(tap(response => {

      if(response?.access_token){
        
        this.setToken(response?.access_token);
        this.router.navigateByUrl('home');
      }
    }));

  }

  logout(){
    
    localStorage.removeItem(environment.authTokenKey);
    //this.router.navigateByUrl('/auth/login');
  }

  private setToken(access_token){
    localStorage.setItem(environment.authTokenKey,access_token);
  }

  getToken(){
    return localStorage.getItem(environment.authTokenKey);
  }

  isLogged(){
    if(this.getToken()){    
      return true;
    }

    return false;
  }
}
