import { Component, OnInit,Inject,Injector,ViewChild } from '@angular/core';
import { Routes, Router,RouterModule,ActivatedRoute,NavigationEnd } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {parseRouteMap} from '../../../common/utils/route.utils'
import {UserService} from '../../../../@core/data/users.service'
import { DialogService } from "../../../common/component/dialog/dialog.service"
import { TableViewComponent } from "../../../common/component/table-view/table-view.component"
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';
import {Subscription} from 'rxjs'
import * as _ from 'lodash';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  //当前所在模块
  module= "";
  //当前所在app
  app="";
  config;
  routeMap;
  routeChangeSub:Subscription
  selectedObjs = [];
  addable = true;
  deleteable = true;
  exportable = true;

  @ViewChild(TableViewComponent) tableView:TableViewComponent;
  constructor( public userService:UserService,public messageService:NzMessageService,public dialogService:DialogService , public router: Router, public route: ActivatedRoute,public appService:AppService,public injector: Injector, ) {
    // console.log(this.router.url)
    this.routeChangeSub = this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
          //let routeMap = parseRouteMap(this.router.url)
          this.routeMap = this.route.snapshot.params
          console.log(this.routeMap)
          this.module = this.routeMap["module"];
          this.app = this.routeMap["app"];
          if(this.routeMap["submodule"]){
              this.module = this.routeMap["submodule"]
          }
          let apiName = `${this.app}.${this.module}DataApi`;
          this.config = this.injector.get(apiName).config
      }

    })
  }

  ngOnInit() {
  }

  add() {
    if(this.routeMap["submodule"])
      this.router.navigate(["apps/"+this.routeMap.app+"/"+this.routeMap.module+"/"+this.routeMap["id"]+"/"+this.routeMap["submodule"],"add"]);
    else
      this.router.navigate(["apps/"+this.routeMap.app+"/"+this.routeMap.module,"add"]);
  }

  delete() {
    if (this.selectedObjs.length == 0) {
      this.messageService.error("没有选择任何选项")
    }
    else {
      this.dialogService.confirm("确认删除吗?").then((res) => {
        let deleteCount = this.selectedObjs.length;
        let resource = this.injector.get(`${this.app}.${this.module}DataApi`).resource
        _.each(this.selectedObjs, (row) => {
          resource.delete(row._id).subscribe((res) => {
            deleteCount--;
            if (deleteCount <= 0) {
              this.tableView.refresh()
            }
          })
        })
        this.messageService.success('删除成功');
      }, (reason) => {
        console.log(reason)
      })
    }

  }


  onSelectedChange(event){
    this.selectedObjs = event
    console.log(this.selectedObjs)
  }

  export(){
    let routeMap =  this.route.snapshot.params
    if(routeMap["submodule"])
      this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/"+routeMap["id"]+"/"+routeMap["submodule"],"export"]);
    else
      this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module,"export"]);
  }

  onDataLoadComplete(totalDataNum){
    let defaultOptions = {
      addable:true,
      exportable:true,
      deleteable:true
    }
    let config = Object.assign(defaultOptions,this.config)
    console.error(config)
    let {addable,deleteable,exportable} = config
    if(this.config.treeable){
      deleteable = false;
      if(totalDataNum>0)
        addable = false;
    }
    this.addable = addable && this.userService.checkNodeIsAuth(`${this.app}.${this.module}.post`)
    this.deleteable = deleteable && this.userService.checkNodeIsAuth(`${this.app}.${this.module}.delete`)
    this.exportable = exportable && this.userService.checkNodeIsAuth(`${this.app}.${this.module}.export`)



  }

  ngOnDestroy(){
    if(this.routeChangeSub){
      this.routeChangeSub.unsubscribe()
      this.routeChangeSub = null;
    }

  }

}
