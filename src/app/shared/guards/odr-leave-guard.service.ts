import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {VendorService} from '../../service/vendor.service';
import {OrderService} from '../../service/order.service';

@Injectable()
export class OdrLeaveGuardService implements CanDeactivate<any>{

  constructor(private odrService: OrderService) { }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let odrid = currentRoute.params['id'];
    this.odrService.autoGetOdr(odrid).subscribe(res=>{
      if(res.state == '新创建'){
        this.odrService.autoDelOdr(odrid).subscribe(res=>{return res;});
      }
    });
    return true;
  }

}
