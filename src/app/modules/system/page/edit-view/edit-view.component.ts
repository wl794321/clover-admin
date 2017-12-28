import { Component, OnInit,ViewChild,Injector } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs'
import { Router, NavigationEnd } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {parseRouteMap} from '../../../common/utils/route.utils'
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit {
  module= "";
  app= "";
  config;
  params = {};
  @ViewChild(FormViewComponent) formView:FormViewComponent;
  queryParams;
  routeChangeSub:Subscription


  constructor(public route: ActivatedRoute,
    public appService:AppService,
    public injector: Injector,
    public toasterService:ToasterService,
    public router: Router,) {

    let routeMap = parseRouteMap(this.router.url)
    this.module = routeMap["module"];
    this.app = routeMap["app"];
    this.config = this.appService.getAppModuleConfig(this.app,this.module)

    this.route.params.subscribe(params => {
      this.params = params;
    });

    this.route.queryParams.subscribe(params=> {
      this.queryParams = params;
    })

    this.routeChangeSub = this.router.events.subscribe((event)=>{
      let routeMap = parseRouteMap(this.router.url)
      this.module = routeMap["module"];
      this.app = routeMap["app"];
      this.config = this.appService.getAppModuleConfig(this.app,this.module)
    })

  }

  ngOnInit() {

  }

  back(){
    //this.navigateToList()
    window.history.go(-1)
  }

  navigateToList(){
    let routeMap = parseRouteMap(this.router.url)
    this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/"],{queryParams: this.queryParams})
  }

  save(){
    // console.log(this.formView.form.value)
    let apiName = `${this.config.app}.${this.config.module}DataApi`;
    let resource = this.injector.get(apiName).resource 
    if(this.formView.validata()){
        if(this.params["id"]){
            resource.put(this.params["id"],this.formView.form.value).subscribe((res)=>{
              this.navigateToList()
              this.toasterService.pop('success', '修改成功');
           })
        }
        else{
          let postData = Object.assign(this.formView.form.value,this.queryParams)
          resource.post(postData).subscribe((res)=>{
              this.navigateToList()
              this.toasterService.pop('success', '保存成功');
           })
        }
    }

  }

   ngOnDestroy(){
    if(this.routeChangeSub){
      this.routeChangeSub.unsubscribe()
      this.routeChangeSub = null;
    }

  }

}
