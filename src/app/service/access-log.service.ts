import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AccessLogService {

  constructor(private httpClient: HttpClient) { }

  getAccessLog(currentPageIndex: string, pageSize: string): Observable<any> {
    console.log('currentPageIndex:' + currentPageIndex + '---------------------pageSize:' + pageSize);
    const params = new HttpParams()
      .set('currentPageIndex', currentPageIndex)
      .set('pageSize', pageSize);
    return this.httpClient.post('/api/accessLogs', params).map(
      res => {
        console.log('===========================' + res);
        return res;
      }, err => {
        console.log('===========================' + err);
        return err;
      }
    );
  }
}



export class AccessLog {
  constructor(public id: number,
              public url: string,
              public method: string,
              public ip: string,
              public classMethod: string,
              public args: string,
              public operatorId: string,
              public operatorTime: string,
              public username: string) {
  }
}
