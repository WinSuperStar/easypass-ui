import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

declare var $: any;

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {
    let ok: string;
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => {
            if (event instanceof HttpResponse) {
              if (event.status === 200) {
                ok = 'succeeded';
              } else if (event.status === 302 || event.status === 304) {
                ok = 'failed';
              } else if (event.status === 403 || event.status === 401) {
                ok = 'failed';
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
            if (ok === 'failed') {
              this.router.navigateByUrl('/index');
            }
        })
      );
  }
}


$.ajaxSetup({
  complete : function(xhr, status) {
    if (status === '' || status.indexOf('error') > 0 ) {
      let win = window;
      while (win != win.top) {
        win = win.top;
      }
      win.location.href = '/';
    }
  }
});
