import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {VendorService} from '../../service/vendor.service';

@Injectable()
export class VdrLeaveGuardService implements CanDeactivate<any>{

  constructor(private vdrService: VendorService) { }


  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let vdrid = currentRoute.params['id'];
    this.vdrService.getVdr(vdrid).subscribe(res=>{
      if(res.state == '新创建'){
        this.vdrService.delVdr(vdrid).subscribe(res=>{return res;});
      }
    });
    return true;
  }

}
