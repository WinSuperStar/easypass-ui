import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Role, RoleService} from "../../../service/role.service";
import {Observable} from "rxjs/Observable";
import {DateService} from "../../../shared/services/date.service";

@Component({
  selector: 'app-pstnmgt',
  templateUrl: './pstnmgt.component.html',
  styleUrls: ['./pstnmgt.component.css']
})
export class PstnmgtComponent implements OnInit {

  public roles: Observable<Role[]>;
  constructor(private router: Router,
              private roleService: RoleService,
              public date: DateService) {
  }

  ngOnInit() {
    this.roles = this.roleService.getRoles();
  }

  create() {
    this.router.navigateByUrl('/home/pstnform/0');
  }

  edit(role: Role) {
    this.router.navigateByUrl('/home/pstnform/' + role.roleid);
  }

  delete(role: Role) {

    this.roleService.delRole(role.roleid).subscribe(
      res => {
        this.roles = this.roleService.getRoles();
        this.router.navigateByUrl('/home/pstnmgt');
      },
      err => {
        this.roles = this.roleService.getRoles();
        this.router.navigateByUrl('/home/pstnmgt');
      }
    )
  }
}
