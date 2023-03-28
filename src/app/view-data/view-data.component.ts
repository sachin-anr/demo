import { Component, OnInit } from '@angular/core';
import { UtilService } from '../app-service/util.service';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {
viewdetails: any;
details: any;

  constructor(private _util : UtilService) { }

  ngOnInit(): void {
    this.viewdetails = history.state.data;
 
this._util.fechEmployeeById(this.viewdetails).subscribe((res)=>{

  if (res)
      localStorage.setItem('viewdetails', JSON.stringify(res));
      res = JSON.parse(localStorage.getItem('viewdetails') || '{}');
     this.details =res;
  
})

  }

}
