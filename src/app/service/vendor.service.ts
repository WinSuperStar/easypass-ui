import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VendorService {

  constructor(private httpClient: HttpClient) {
  }

  smtVdr(id:any): Observable<any>{
    let params = new HttpParams()
      .set('vdrid', id);
    return this.httpClient.post('/api/smtVdr', params);
  }

  delVdr(id:any): Observable<any>{
    let params = new HttpParams()
      .set('vdrid', id);
    return this.httpClient.post('/api/delVdr', params);
  }

  createVdr(creator: any): Observable<any> {
    let params = new HttpParams()
      .set('creator', creator);
    return this.httpClient.post('/api/createVdr', params);
  }

  getAllVdrs(): Observable<any>{
    return this.httpClient.get('/api/getAllVdrs');
  }

  saveVdr(vendor: any): Observable<any> {
    console.log('前台保存vendor：'+vendor);
    let params = new HttpParams()
      .set('vendor', vendor);
    return this.httpClient.post('/api/saveVdr', params);
  }

  getVdr(vdrid: any): Observable<any> {
    let params = new HttpParams()
      .set('vdrid', vdrid);
    return this.httpClient.post('/api/getVdr', params);
  }

  getVdrs(form: any): Observable<any> {
    let params = new HttpParams()
      .set('vdraddr1', form['vdraddr1'])
      .set('vdraddr2', form['vdraddr2'])
      .set('vdraddr3', form['vdraddr3'])
      .set('vdrplate1', form['vdrplate1'])
      .set('vdrplate2', form['vdrplate2'])
      .set('contact', form['contact'])
      .set('contactphone', form['contactphone'])
      .set('firstdate', form['firstdate'])
      .set('state', form['state'])
      .set('itemlist', this.transfer(form['itemlist']));
    // .set('form', str);
    // console.log(form['itemlist'][0]);
    // console.log(form['itemlist'][0]===false);
    console.log('search params are: '+params);
    return this.httpClient.post('/api/getVdrs', params);
  }

  transfer(a: any) {
    let str = '';
    for (let i = 0; i < a.length; i++) {
      if (i < a.length - 1) {
        str = str + (a[i]===false?'false':a[i]) + ',';
      } else {
        str = str + (a[i]===false?'false':a[i]);
      }
    }
    return str;
  }
}

export class Vendor {

  constructor(public  vdrid: number,
              public  vdrname: string,
              public  vdraddr: string,
              public  vdraddrdetail: string,
              public  vdrplate: string,
              public  contact: string,
              public  contactphone: string,
              public  contacts: string,
              // tidang
              public  itemTidang: string,
              public itemTidangTax: number,
              public itemTidangCost: number,
              public itemTidangCompletedate: string,
              public  itemTidangDesc: string,
              public  itemTidangReqId: number,
              // guohu
              public  itemGuohu: string,
              public itemGuohuTax: number,
              public itemGuohuCost: number,
              public itemGuohuCompletedate: string,
              public  itemGuohuDesc: string,
              public  itemGuohuReqId: number,
              //shangpai
              public  itemShangpai: string,
              public itemShangpaiTax: number,
              public itemShangpaiCost: number,
              public itemShangpaiCompletedate: string,
              public  itemShangpaiDesc: string,
              public  itemShangpaiReqId: number,
              //weizhang
              public  itemWeizhang: string,
              public itemWeizhangTax: number,
              public itemWeizhangCost: number,
              public itemWeizhangCost2: number,
              public itemWeizhangCompletedate: string,
              public  itemWeizhangDesc: string,
              public  itemWeizhangReqId: number,
              //diya
              public  itemDiya: string,
              public itemDiyaCost: number,
              public itemDiyaCompletedate: string,
              public  itemDiyaDesc: string,
              public  itemDiyaReqId: number,
              //jiechudiya
              public itemJiechudiya: string,
              public itemJiechudiyaCost: number,
              public itemJiechudiyaCompletedate: string,
              public itemJiechudiyaDesc: string,
              public itemJiechudiyaReqId: number,
              //weituo
              public  itemWeituo: string,
              public itemWeituoTax: number,
              public itemWeituoCost: number,
              public itemWeituoCompletedate: string,
              public  itemWeituoDesc: string,
              public  itemWeituoReqId: number,
              //nianjian
              public  itemNianjian: string,
              public itemNianjianTax: number,
              public itemNianjianCost: number,
              public itemNianjianCompletedate: string,
              public  itemNianjianDesc: string,
              public  itemNianjianReqId: number,
              //buhuan
              public  itemBuhuan: string,
              public itemBuhuanTax: number,
              public itemBuhuanCost: number,
              public itemBuhuanCompletedate: string,
              public  itemBuhuanDesc: string,
              public  itemBuhuanReqId: number,
              //qita
              public  itemQita: string,
              public itemQitaCost: number,
              public itemQitaCompletedate: string,
              public  itemQitaDesc: string,
              public itemQitaReqId:number,
              public  state: string,
              public createdate: string,
              public  creator: string,
              public  add1: string,
              public  add2: string,
              public  add3: string,) {
  }
}
