import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take } from 'rxjs';
import { config } from '../config';
import { Employee } from '../model/employee';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
api = config.API_URL;
  constructor(private http : HttpClient, private auth : AuthService) { }



  saveData(data : any ){
return this.http.post (this.api + '/empData2.json', data)
  }

  fetchData()
  {
      return this.http.get<Employee[]>(this.api +'/empData2.json').pipe(
        map((res:any) =>{
          console.log("response fetch data ", res)
          const userArray  : Employee[] = [];
          for(const key in res ){
           if (res.hasOwnProperty(key)) {
            userArray.push ({userId : key, ...res[key]})
           }
          }
          console.log ("userArray ::",userArray)
          return userArray;
        }))
  }

  fechEmployeeById(id : any )
  {
console.log('fechEmployeeById', id)
    return this.auth.userr.pipe(take(1),
    exhaustMap(user =>{
      console.log("User from auth ==>>", user.token)
      return this.http.get<Employee>(this.api + '/empData2/'+ id +'.json',{
        params : new HttpParams().set('auth', user.token)
      })
    }),map((res:any) =>{  
      console.log("response fetch data ", res)
    return res;
    }))
  }

  deleteEmployeeById(id : number )
  {
    if(confirm('do you want to delete this user ??')){
    return this.http.delete<User>(this.api + '/empData2/'+ id +'.json')
  }
  return ;
}
}
