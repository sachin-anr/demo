import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../app-service/auth.service';
import { UtilService } from '../app-service/util.service';
import { Employee } from '../model/employee';
export interface IEnterprise {
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {
  public empData:Observable<Employee[]> | undefined
  form: any;
  constructor(private auth: AuthService, private readonly fb: FormBuilder,
   private utils: UtilService) {
    this.empData = this.utils.fetchData();
    console.log('this.empData', this.empData)
  }
 
  ngOnInit(): void {
  this.form = this.fb.group({
    name: ['', Validators.required],
    designation: ['', Validators.required],
    department : ['', Validators.required],
    status : [false, Validators.requiredTrue]
  });
  }
  onGetUsers(): any {
     this.utils.fetchData().subscribe(res => {
      console.log ( "response ",  res)
      // this.empData = res;
     })

  }

  displayStyle = "none";
  onClick() 
  {
    console.log('auth :', this.form.value);
  }
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
