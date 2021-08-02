import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';

//Forms
import { CompanyModalFormComponent } from './company-modal-form/company-modal-form.component';

@Component({
  selector: 'company-form',
  templateUrl: './company-form.component.html',
  styleUrls: []
})
export class CompanyFormComponent implements OnInit {

  @Input() id:number = null;
  @Output() success = new EventEmitter<any>();


  /**
   * Creates an instance of CompanyFormComponent.
   * @param {MatDialog} dialog
   * @memberof CompanyFormComponent
   */
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    
  }


  /**
   * Open the company form in a modal window
   *
   * @memberof CompanyFormComponent
   */
  admCompany(){ 
    const dialogRef = this.dialog.open(CompanyModalFormComponent, { data: {
      id:this.id
    },
    width:'50%',
    disableClose:true });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
      }
      if(this.success){
        this.success.emit(res);
      }
		});

  }

}