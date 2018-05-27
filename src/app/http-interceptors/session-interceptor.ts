import {finalize, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

declare var $: any;

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ok: string;
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => {
            if (event instanceof HttpResponse) {
              if (event.status === 200) {
                ok = 'succeeded';
                const data = event.body;
                if (data !== null) {
                  if (data.code !== undefined && data.code === 403) {
                    ok = 'no_function_auth';
                  } else if (data.code === 401) {
                    ok = 'no_login_auth';
                  }
                }
              } else if (event.status === 403) {
                ok = 'no_function_auth';
              } else if (event.status === 401) {
                ok = 'no_login_auth';
              } else {
                ok = '';
              }
            }
          },
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          if (ok === 'no_function_auth') {
            alert('此功能您没有权限访问！');
            return;
          } else if (ok === 'no_login_auth') {
            alert('此账号在其他地方登陆，若要继续访问，请重新登陆！');
            this.router.navigateByUrl('/index');
          } else {
          }
        })
      );
  }
}


$.ajaxSetup({
  complete: function (xhr, status) {
    if (status === '' || status.indexOf('error') > 0) {
      let win = window;
      while (win != win.top) {
        win = win.top;
      }
      win.location.href = '/';
    }
  }
});
