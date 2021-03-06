import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {ContentComponent} from './content/content.component';
import {RouterModule, Routes} from '@angular/router';
import {SysmgtComponent} from './sysmgt/sysmgt.component';
import {VdrmgtComponent} from './vdrmgt/vdrmgt.component';
import {CarmgtComponent} from './carmgt/carmgt.component';
import {HomeComponent} from './home/home.component';
import {VdrFormComponent} from './vdrmgt/vdr-form/vdr-form.component';
import {LoggerService} from './shared/logger.service';
import {SystemService} from './sysmgt/system.service';
import {MultiplePipe} from './pipe/multiple.pipe';
import {VdrSearchNameFilterPipe} from './vdrmgt/pipe/vdrSearchNameFilter.pipe';
import {HometestComponent} from './home/hometest/hometest.component';
import {Hometest2Component} from './home/hometest2/hometest2.component';
import {DirectiveDirective} from './home/directive.directive';
import {UsermgtComponent} from './sysmgt/usermgt/usermgt/usermgt.component';
import {PstnmgtComponent} from './sysmgt/pstnmgt/pstnmgt/pstnmgt.component';
import {AuthmgtComponent} from './sysmgt/authmgt/authmgt/authmgt.component';
import {UserformComponent} from './sysmgt/usermgt/userform/userform.component';
import {PstnformComponent} from './sysmgt/pstnmgt/pstnform/pstnform.component';
import {CusmgtComponent} from './cusmgt/cusmgt/cusmgt/cusmgt.component';
import {CusformComponent} from './cusmgt/cusmgt/cusform/cusform.component';
import {PresformComponent} from './presmgt/presform/presform.component';
import {PresmgtComponent} from './presmgt/presmgt/presmgt.component';
import {CarformComponent} from './carmgt/carform/carform.component';
import {OdrmgtComponent} from './order/odrmgt/odrmgt.component';
import {DialogOrderAssign, OrderformComponent} from './order/orderform/orderform.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './shared/guards/auth-guard.service';
import {LoginServiceService} from './shared/services/login-service.service';
import {MainComponent} from './main/main.component';
import {FieldErrorDisplayComponent} from './shared/message/field-error-display/field-error-display.component';
import {ValidationService} from './shared/services/validation.service';
import {HttpClientModule} from '@angular/common/http';
import {UserServiceService} from './service/user-service.service';
import {FileUploaderModule} from 'ng4-file-upload';
import {DateService} from './shared/services/date.service';
import {RoleService} from './service/role.service';
import {CustomerService} from './service/customer.service';
import {AddrSelectService} from './shared/services/addr-select.service';
import {VendorService} from './service/vendor.service';
import {ItemFormComponent} from './vdrmgt/item-form/item-form.component';
import {TipComponent} from './tip/tip.component';
import {AccessLogService} from './service/access-log.service';
import {AccesslogmgtComponent} from './sysmgt/accesslogmgt/accesslogmgt.component';
import {ItemdetailService} from './service/itemdetail.service';
import {PermissionService} from './shared/services/permission.service';
import {CarService} from './service/car.service';
import {PresaleService} from './service/presale.service';
import {httpInterceptorProviders} from './http-interceptors/index';
import {PresapprComponent} from './presmgt/presappr/presappr.component';
import {PaginationComponent} from './shared/components/pagination/pagination.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OrderHomeComponent} from './order/order-home/order-home.component';
import {OrderService} from './service/order.service';
import {VdrLeaveGuardService} from './shared/guards/vdr-leave-guard.service';
import {PresLeaveGuardService} from './shared/guards/pres-leave-guard.service';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule} from '@angular/material';
import {LoadingModule} from 'ngx-loading';
import {OdrLeaveGuardService} from './shared/guards/odr-leave-guard.service';
import { OdrmgtSavedComponent } from './order/odrmgt-saved/odrmgt-saved.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarbrandComponent, DialogCarinfo} from './sysmgt/carbrand/carbrand.component';

const routeConfig: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: LoginComponent},
  {
    path: 'home', component: HomeComponent, children: [{
      path: '',
      canActivateChild: [AuthGuardService],
      children: [
        {path: '', component: HometestComponent},
        {path: 'tip', component: TipComponent},
        {path: 'usermgt', component: UsermgtComponent},
        {path: 'accessLogmgt', component: AccesslogmgtComponent},
        {path: 'userform', component: UserformComponent},
        {path: 'userform/:id', component: UserformComponent},
        {path: 'carbmgt', component: CarbrandComponent},
        {path: 'pstnmgt', component: PstnmgtComponent},
        {path: 'pstnform/:id', component: PstnformComponent},
        {path: 'cusmgt', component: CusmgtComponent},
        {path: 'cusform', component: CusformComponent},
        {path: 'cusform/:id', component: CusformComponent},
        {path: 'presmgt', component: PresmgtComponent},
        {path: 'presform/:id', component: PresformComponent},
        {path: 'authmgt', component: AuthmgtComponent},
        {path: 'vdrmgt', component: VdrmgtComponent},
        {path: 'vdrmgt/:id/:aim', component: VdrFormComponent, canDeactivate: [VdrLeaveGuardService]},
        {path: 'carmgt', component: CarmgtComponent},
        {path: 'carform/:id', component: CarformComponent},
        {path: 'odrmgt', component: OdrmgtComponent},
        {path: 'orderform/:id', component: OrderformComponent, canDeactivate:[OdrLeaveGuardService],runGuardsAndResolvers:'always'},
        {path: 'odrmgt_saved', component: OdrmgtSavedComponent},
        {path: 'presmgt', component: PresmgtComponent},
        {path: 'presmgt/:id', component: PresformComponent, canDeactivate:[PresLeaveGuardService]},
        {path: 'itemform', component: ItemFormComponent},
        {path: 'itemform/:id', component: ItemFormComponent},
        {path: 'presappr', component: PresapprComponent}],
    }], canActivate: [AuthGuardService]
  },
  // {path: '**', redirectTo: '/login', pathMatch: 'full'}
  // {path: 'usermgt', component: UsermgtComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    OdrmgtComponent,
    SysmgtComponent,
    VdrmgtComponent,
    CarmgtComponent,
    HomeComponent,
    VdrFormComponent,
    MultiplePipe,
    VdrSearchNameFilterPipe,
    HometestComponent,
    Hometest2Component,
    DirectiveDirective,
    UsermgtComponent,
    PstnmgtComponent,
    AuthmgtComponent,
    UserformComponent,
    PstnformComponent,
    CusmgtComponent,
    CusformComponent,
    PresmgtComponent,
    PresformComponent,
    CarformComponent,
    OrderformComponent,
    LoginComponent,
    MainComponent,
    FieldErrorDisplayComponent,
    ItemFormComponent,
    TipComponent,
    AccesslogmgtComponent,
    PresapprComponent,
    PaginationComponent,
    OrderHomeComponent,
    OdrmgtSavedComponent,
    DialogOrderAssign,
    DialogCarinfo,
    CarbrandComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routeConfig, {useHash: true, onSameUrlNavigation: "reload"}),
    ReactiveFormsModule,
    ReactiveFormsModule,
    FileUploaderModule,
    NgxPaginationModule,
    NgbModule,
    NgbModule.forRoot(),
    MatAutocompleteModule,
    LoadingModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  exports: [RouterModule,MatDialogModule,MatInputModule],
  entryComponents: [DialogOrderAssign, DialogCarinfo],
  providers: [
    httpInterceptorProviders,
    LoggerService,
    SystemService,
    AuthGuardService,
    LoginServiceService,
    ValidationService,
    UserServiceService,
    DateService,
    RoleService,
    CustomerService,
    AddrSelectService,
    VendorService,
    ItemdetailService,
    PermissionService,
    CarService,
    AccessLogService,
    PresaleService,
    OrderService,
    VdrLeaveGuardService,
    PresLeaveGuardService,
    OdrLeaveGuardService], // used to mention what service to provide in this module
  bootstrap: [AppComponent] // main component
})
export class AppModule {
  constructor() {
    // setTheme('bs3');
  }
}
