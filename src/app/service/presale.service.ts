import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PresaleService {

  constructor(private httpClient: HttpClient) {
  }

  updatePresaleState(state:any, id:any): Observable<any>{
    let params = new HttpParams().set('state',state).set('saleid',id);
    return this.httpClient.post('/api/updatePresaleState', params);
  }

  delPresale(id:any): Observable<any>{
    let params = new HttpParams()
      .set('saleid', id);
    return this.httpClient.post('/api/delPresale', params);
  }

  createPresale(creator: any): Observable<any> {
    let params = new HttpParams()
      .set('creator', creator);
    return this.httpClient.post('/api/createPresale', params);
  }

  savePresale(presale: any): Observable<any> {
    let params = new HttpParams()
      .set('presale', presale);
    return this.httpClient.post('/api/savePresale', params);
  }

  getPresale(saleid: any): Observable<any> {
    let params = new HttpParams()
      .set('saleid', saleid);
    return this.httpClient.post('/api/getPresale', params);
  }

  getPresales(form: any): Observable<any> {
    let params = new HttpParams()
      .set('caraddr1', form['caraddr1'])
      .set('caraddr2', form['caraddr2'])
      .set('caraddr3', form['caraddr3'])
      .set('carplate1', form['carplate1'])
      .set('carplate2', form['carplate2'])
      .set('cusmode',form['cusmode'])
      .set('cusname', form['cusname'])
      .set('state', form['state'])
      .set('itemlist', this.transfer(form['itemlist']));
    // .set('form', str);
    return this.httpClient.post('/api/getPresales', params);
  }

  getPresalesByState(state:any): Observable<any>{
    let params = new HttpParams()
      .set('caraddr1', '')
      .set('caraddr2', '')
      .set('caraddr3', '')
      .set('carplate1', '')
      .set('carplate2', '')
      .set('cusmode','')
      .set('cusname', '')
      .set('state', state)
      .set('itemlist', 'false,false,false,false,false,false,false,false,false,false');
    // .set('form', str);
    return this.httpClient.post('/api/getPresales', params);
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

export class Presale {

  constructor(public  saleid: number,
              public caraddr:string,
              public carplate:string,
              public cusname:string,
              public cusmode:string,
              public vdrid:number,
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
              public salesum:number,
              public  state: string,
              public createdate: string,
              public  creator: string,
              public  add1: string,
              public  add2: string,
              public  add3: string,) {
  }
}
