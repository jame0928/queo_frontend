import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

//Services
import {EmployeeService} from '@services/api/employee.service';
import { TableDataSourceService } from '@services/table-data-source.service';
import { AlertUtilService } from '@utils/alert.util.service';
import { EmployeeModel } from '@models/employeeModel';


@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class EmployeeComponent implements AfterViewInit,OnInit {


  /**
   * We establish the columns that make up the table of companies
   *
   * @memberof EmployeeComponent
   */
  displayedColumns = ['id','first_name','last_name','email','phone','company','actions'];
  dataSource: TableDataSourceService;

 
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;

  /**
   * Filters used by the employee search form
   * 
   * @type {*}
   * @memberof EmployeeComponent
   */
  filter:any = {    
    first_name:'',
    last_name:'',
    email:'',
    phone:'',
    company:'',
  };  


  /**
   * Creates an instance of EmployeeComponent.
   * @param {AlertUtilService} _alertUtilService
   * @param {EmployeeService} employeeService
   * @memberof EmployeeComponent
   */
  constructor(
    private _alertUtilService:AlertUtilService,
    public employeeService: EmployeeService,
  ) {
  }


  /**
   * starts the service that manages the table data
   *
   * @memberof EmployeeComponent
   */
  ngOnInit() {    
    this.dataSource = new TableDataSourceService(this.employeeService,this.paginator,this.sort,this.filter);
  }


    /**
     * We start the paging service
     *
     * @memberof EmployeeComponent
     */
    ngAfterViewInit() {
      this.dataSource.initPaginator();
    }

    /**
     * It allows us to delete send the slice to delete a employee
     *
     * @param {EmployeeModel} employee
     * @memberof EmployeeComponent
     */
    deleteEmployee(employee:EmployeeModel){
    this._alertUtilService.confirm({
      title: 'Confirmar eliminación',
      html: `Esta seguro que quiere eliminar el empleado ${employee?.full_name}?`,
    }).then((result) => {
      if(result?.isConfirmed){
        this.employeeService.delete(employee?.id).subscribe(response => {
          this.dataSource.loadData();
        })
      }
    })
  }
}

