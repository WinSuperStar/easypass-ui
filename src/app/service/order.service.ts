import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  createOdr(creator: any): Observable<any> {
    let params = new HttpParams()
      .set('creator', creator);
    return this.httpClient.post('/api/createOdr', params);
  }

  updateOdrPreSubmit(orderid: any): Observable<any> {
    let params = new HttpParams()
      .set('orderid', orderid);
    return this.httpClient.post('/api/updateOdrPreSubmit', params);
  }

  orderAssign(orderid: any, userid:any, username: string): Observable<any> {
    let params = new HttpParams()
      .set('orderid', orderid)
      .set('userid',userid)
      .set('username',username);
    return this.httpClient.post('/api/orderAssign', params);
  }

  updateOdrPreBuz(orderid: any): Observable<any> {
    let params = new HttpParams()
      .set('orderid', orderid);
    return this.httpClient.post('/api/updateOdrPreBuz', params);
  }

  updateOdrIng(orderid: any): Observable<any> {
    let params = new HttpParams()
      .set('orderid', orderid);
    return this.httpClient.post('/api/updateOdrIng', params);
  }

  updateOdrDoneBuz(orderid: any): Observable<any> {
    let params = new HttpParams()
      .set('orderid', orderid);
    return this.httpClient.post('/api/updateOdrDoneBuz', params);
  }

  getOdr(id: any): Observable<any> {
    let params = new HttpParams()
      .set('orderid', id);
    return this.httpClient.post('/api/getOdr', params);
  }

  autoGetOdr(id: any): Observable<any> {
    let params = new HttpParams()
      .set('orderid', id);
    return this.httpClient.post('/api/autoGetOdr', params);
  }

  saveOdr(order: any): Observable<any> {
    let params = new HttpParams()
      .set('order', order);
    return this.httpClient.post('/api/saveOdr', params);
  }

  delOdr(id: any): Observable<any> {
    let params = new HttpParams()
      .set('orderid', id);
    return this.httpClient.post('/api/delOdr', params);
  }

  autoDelOdr(id: any): Observable<any> {
    let params = new HttpParams()
      .set('odrid', id);
    return this.httpClient.post('/api/autoDelOdr', params);
  }

  getOdrs(form:any): Observable<any>{
    let params = new HttpParams()
      .set('orderid', form['orderid'])
      .set('carplate1', form['carplate1'])
      .set('carplate2', form['carplate2'])
      .set('carplatenum', form['carplatenum'])
      .set('oriownername', form['oriownername'])
      .set('carbrand', form['carbrand'])
      .set('carset', form['carset'])
      .set('carnum', form['carnum'])
      .set('cusname', form['cusname'])
      .set('kuaidinum', form['kuaidinum'])
      .set('creator', form['creator'])
      .set('itemlist', this.transfer(form['itemlist']));
    // .set('form', str);
    // console.log(form['itemlist'][0]);
    // console.log(form['itemlist'][0]===false);
    console.log('search params are: '+params);
    return this.httpClient.post('/api/getOdrs', params);
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

export class Order {

  constructor(public  orderid: number,
              public  carid: number,
              public carnum: string,
              public carRegDate: string,
              public carbrand: string,
              public carset: string,
              public carRegImgPath: string,
              public carOtherCertPath: string,
              public cusid: number,
              public cusname: string,
              public carAddr: string,
              public carPlateCode: string,
              public carPlateNum: string,
              public vdrid: number,
              public  vdrContact: string,
              public oriOwnerName: string,
              public oriOwnerPhone: string,
              public newOwnerName: string,
              public newOwnerPhone: string,
              public itemDeadline: string,
              public itemPlanDate: string,
              public weizhangStatus: string,
              public weizhangHandle: string,
              public weizhangDesc: string,
              public nianjianStatus: string,
              public nianjianHandle: string,
              public nianjianDesc: string,
              public diyaStatus: string,
              public diyaHandle: string,
              public diyaDesc: string,
              public paizhengStatus: string,
              public paizhengHandle: string,
              public paizhengDesc: string,
              public qitaCost: number,
              public qitaDesc: string,
              public cheliangcailiao: string,
              public cheliangdengjizhengjian: string,
              public xingshizheng: string,
              public gongzhang: string,
              public oriShenfenzheng: string,
              public oriJuzhuzheng: string,
              public yingyezhizhao: string,
              public qitaxinxi: string,
              public kuaidiNum: string,
              public kuaidiCost: number,
              public kuaidiImgPath: string,
              public kuaidiSets: string,
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
              public itemQitaReqId: number,
              public  state: string,
              public financeState: string,
              public financeSum: number,
              public commitdate: string,
              public updatedate: string,
              public createdate: string,
              public  creator: string,
              public assignee:string,
              public assigneeId:number,
              public  add1: string,
              public  add2: string,
              public  add3: string,) {
  }
}
