import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from 'angular-web-storage';
import { NbAuthModule } from '../modules/auth/auth.module';
import { CloverAuthProvider } from './clover-auth.provider';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { ResourceService,HttpService } from './utils/resource.service';
import { PubSubService } from './utils/pubsub.service';
import { CommonService } from './utils/common.service';
import { TranslateService } from './utils/translate.service';

import { SettingsService } from './services/settings.service';
import { ThemesService } from './services/themes.service';
import { ScrollService } from './services/scroll.service';
import { ColorsService } from './services/colors.service';
import { MenuService } from './services/menu.service';
import { _HttpClient } from './services/http.client';
import { ACLService } from './acl/acl.service';
import {AuthGuardService} from "./services/auth-guard.service"



const CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
   ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: CloverAuthProvider,
        config: {
          delay: 0,
          redirect:"/apps/home",
          login: {
            rememberMe: true,
          },
        },
      },
    },
  }).providers,
   CloverAuthProvider,
  AnalyticsService,
  HttpService,
  LocalStorageService,
  PubSubService,
  CommonService,
  TranslateService,
  SettingsService,
  ThemesService,
  ScrollService,
  ColorsService,
  MenuService,
  ACLService,
  _HttpClient,
  AuthGuardService
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...CORE_PROVIDERS,
      ],
    };
  }
}
