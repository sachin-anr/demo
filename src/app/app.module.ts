import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header.component';
import { LayoutComponent } from './layout/layout.component';
import { PageHeaderComponent } from './layout/page-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuItemComponent } from "./layout/menu-item/menu-item.component";
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SalesComponent } from './sales.component';
import { AuthComponent } from './_auth/auth/auth.component';
import { SignupComponent } from './_auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { Interceptor } from './_auth/auth/auth.intercepter';



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
        path: 'view-data',
        component: ViewDataComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      }
    ]
  }
];


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LayoutComponent,
        PageHeaderComponent,
        MenuItemComponent,
        SalesComponent,
        HomeComponent,
        PageHeaderComponent,
        SignupComponent,
      AuthComponent,
      ViewDataComponent,
      
    ],
    providers: [{
      provide : HTTP_INTERCEPTORS,
      useClass : Interceptor,
      multi : true
     } ],
    bootstrap: [AppComponent],

    schemas:[
      CUSTOM_ELEMENTS_SCHEMA
    ],
    imports: [
        FormsModule,
        
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        RouterModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatExpansionModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
    ]
})
export class AppModule { }
