import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { SalesComponent } from './sales.component';
import { AuthComponent } from './_auth/auth/auth.component';
import { SignupComponent } from './_auth/signup/signup.component';

const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'signin'
  },
  {
    path : 'signin',
    component : AuthComponent
  },
  {
    path : 'signup',
    component : SignupComponent
  },

  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  { 
   path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
