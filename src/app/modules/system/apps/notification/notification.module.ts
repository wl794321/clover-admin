import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { HomeComponent } from './home.component'
import { SystemModule } from '../../system.module'
import { ThemeModule } from '../../../../@theme/theme.module';
import {CommonModule} from "../../../common/common.module"


import { HomeTZHIService } from './services/home.services';


const routes: Routes = [
{
  path: 'home',
  component: HomeComponent,
  children: [],
}
];


@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ThemeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,

  ],
  entryComponents: [


  ],
  providers: [
    HomeTZHIService
  ],
  exports: [

  ],
})
export class NotificationModule {
  constructor(
  ) {

  }
}
