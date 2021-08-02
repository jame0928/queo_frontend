import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [{
    title:'Empresas',
    icon:'mdi mdi-store',
    url:'company'   
  },
  {
    title:'Empleados',
    icon:'mdi mdi-human',
    url:'employee'   
  }];

  constructor() { }
}
