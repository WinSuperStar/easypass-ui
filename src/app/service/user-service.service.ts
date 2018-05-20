import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserServiceService {

  constructor(public httpClient: HttpClient) {
  }

  getUsers(form): Observable<any> {
    let params = new HttpParams()
      .set('username', form['username'])
      .set('phone', form['phone'])
      .set('roleid', form['roleid'])
      .set('state', form['state']);
    return this.httpClient.post('/api/users', params).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    );
  }

  addUser(user: User): Observable<any> {
    console.log('url：' + user.certpath);

    let params = new HttpParams()
      .set('username', user.username)
      .set('phone', user.phone)
      .set('password', user.password)
      .set('roleid', user.roleid)
      .set('gender', user.gender)
      .set('state', user.state)
      .set('creator', user.creator)
      .set('certpath', user.certpath)
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('creator', user.creator);
    return this.httpClient.post('/api/addUser', params, {headers}).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    );
  }

  updateUser(user: User) {
    let params = new HttpParams()
      .set('userid', user.userid + '')
      .set('username', user.username)
      .set('phone', user.phone)
      .set('password', user.password)
      .set('roleid', user.roleid)
      .set('gender', user.gender)
      .set('state', user.state)
      .set('createdate', user.createdate)
      .set('creator', user.creator)
      .set('certpath', user.certpath)
      .set('creator', user.creator);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.httpClient.put('/api/user', params, {headers}).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    );
  }

  getUser(userid: number): Observable<any> {
    // let params = new HttpParams().set('userid',userid+'');
    return this.httpClient.get('/api/user/' + userid).map(
      res => {
        return res;
      }
    );
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get('/api/allUsers');
  }
}

export class User {
  constructor(public userid: number,
              public  username: string,
              public  password: string,
              public  gender: string,
              public  state: string,
              public  phone: string,
              public  certpath: string,
              public  certnum: number,
              public  createdate: string,
              public  creator: string,
              public  add1: string,
              public  add2: string,
              public  add3: string,
              public roleid: string) {

  }
}
