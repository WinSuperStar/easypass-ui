import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginServiceService} from '../shared/services/login-service.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;
  public message: string;
  post: any;
  // private returnUrl: string;
  // loginAlert:string;
  // loginError:boolean=false;
  constructor(private router: Router,
              private fb: FormBuilder,
              private loginService: LoginServiceService,
              private httpClient: HttpClient) {
    this.formGroup = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    // if( localStorage.getItem("currentUser")){
    //   this.router.navigate(['./home']);
    // }
  }

  login(post) {
    this.loginService.login(post)
      .subscribe(
        res => {
          console.log('登陆结果：' + res);
          if (res != null) {
            let roleid = res.roleid;
            let params = new HttpParams()
              .set('roleid', roleid);
            this.httpClient.post('/api/permission', params, {responseType: 'text'}).subscribe(
              res => {
                console.log('获取权限：' + res);
                localStorage.setItem('permission', res);
                let redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : 'home';
                let navigationExtras: NavigationExtras = {
                  queryParamsHandling: 'preserve',
                  preserveFragment: true
                };
                this.router.navigate([redirect], navigationExtras);
              },
              err => {
                console.log(err.message);
                return err;
              }
            );

          } else {
            this.message = '用户名或者密码不正确';
          }
        },
        err => {
          console.log('Error');
        }
      );
  }

  logout() {
    this.loginService.logout();
    this.message = '';
  }
}
