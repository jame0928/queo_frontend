// Angular
import { Injectable } from '@angular/core';

//Base service
import {BaseApiService} from './base-api.service';

@Injectable({
	providedIn:'root'
})
export class CompanyService extends BaseApiService{
	// Public properties
	public url = 'company';
}
