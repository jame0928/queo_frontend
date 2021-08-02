import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';

//Forms
import { EmployeeModalFormComponent } from './employee-modal-form/employee-modal-form.component';

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: []
})
export class EmployeeFormComponent implements OnInit {

  @Input() id:number = null;
  @Output() success = new EventEmitter<any>();


  /**
   * Creates an instance of EmployeeFormComponent.
   * @param {MatDialog} dialog
   * @memberof EmployeeFormComponent
   */
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    
  }


  /**
   * Open the employee form in a modal window
   *
   * @memberof EmployeeFormComponent
   */
  admEmployee(){ 
    const dialogRef = this.dialog.open(EmployeeModalFormComponent, { data: {
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