import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

//Services
import {CompanyService} from '@services/api/company.service';
import { TableDataSourceService } from '@services/table-data-source.service';
import { AlertUtilService } from '@utils/alert.util.service';
import { CompanyModel } from '@models/companyModel';


@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class CompanyComponent implements AfterViewInit,OnInit {


  /**
   * We establish the columns that make up the table of companies
   *
   * @memberof CompanyComponent
   */
  displayedColumns = ['id','name','email','website','logo','actions'];
  dataSource: TableDataSourceService;

 
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;

  /**
   * Filters used by the company search form
   * 
   * @type {*}
   * @memberof CompanyComponent
   */
  filter:any = {    
    name:'',
    email:'',
    website:'',
  };  


  /**
   * Creates an instance of CompanyComponent.
   * @param {AlertUtilService} _alertUtilService
   * @param {CompanyService} companyService
   * @memberof CompanyComponent
   */
  constructor(
    private _alertUtilService:AlertUtilService,
    public companyService: CompanyService,
  ) {
  }


  /**
   * starts the service that manages the table data
   *
   * @memberof CompanyComponent
   */
  ngOnInit() {    
    this.dataSource = new TableDataSourceService(this.companyService,this.paginator,this.sort,this.filter);
  }


    /**
     * We start the paging service
     *
     * @memberof CompanyComponent
     */
    ngAfterViewInit() {
      this.dataSource.initPaginator();
    }


  /**
   * method to display the company logo in a floating window
   *
   * @param {CompanyModel} company
   * @memberof CompanyComponent
   */
  viewLogo(company:CompanyModel){
      this._alertUtilService.view({
        html: `Logo de  ${company?.name}`,
        imageUrl: company?.logo,
      });
    }



    /**
     * It allows us to delete send the slice to delete a company
     *
     * @param {CompanyModel} company
     * @memberof CompanyComponent
     */
    deleteCompany(company:CompanyModel){
    this._alertUtilService.confirm({
      title: 'Confirmar eliminación',
      html: `Esta seguro que quiere eliminar la empresa ${company?.name}?`,
    }).then((result) => {
      console.log(result)
      if(result?.isConfirmed){
        this.companyService.delete(company?.id).subscribe(response => {
          this.dataSource.loadData();
        })
      }
    })
  }
}

