import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {PresaleService} from '../../service/presale.service';

@Injectable()
export class PresLeaveGuardService implements CanDeactivate<any> {

  constructor(private presService: PresaleService) { }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let saleid = currentRoute.params['id'];
    this.presService.getPresale(saleid).subscribe(res=>{
      if(res.state == '新创建'){
        this.presService.delPresale(saleid).subscribe(res=>{return res;});
      }
    });
    return true;
  }

}
