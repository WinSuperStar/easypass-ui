import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ItemdetailService {

  constructor(private httpClient: HttpClient) {
  }

  createItemdetail(billid: any, billname: any, itemname: any, creator: any, billtype:any): Observable<any> {
    let params = new HttpParams()
      .set('billid', billid)
      .set('billname', billname)
      .set('itemname', itemname)
      .set('creator', creator)
      .set('billtype', billtype);
    return this.httpClient.post('/api/createItemdetail', params);
  }

  saveItemdetail(itemdetail: any): Observable<any> {
    let params = new HttpParams()
      .set('itemdetail', itemdetail);
    return this.httpClient.post('/api/saveItemdetail', params);
  }

  getItemdetail(papid: any): Observable<any> {
    let params = new HttpParams()
      .set('papid', papid);
    return this.httpClient.post('/api/getItemdetail', params);
  }

}

export class Itemdetail {
  constructor(public  papid: number,
              public matDengji: string,
              public matXingshi: string,
              public matJiaoqiang: string,
              public matGouzhi: string,
              public matFapiao: string,
              public matQita: string,
              public matQitaDesc: string,
              public  carPresent: string,
              public carPresentCost: number,
              public  carPresentDesc: string,
              public  oriIdType: string,
              public  oriIdDesc: string,
              public oriIdCost: number,
              public  oriOtherCert: string,
              public oriOtherCertCost: number,
              public  oriOtherCertDesc: string,
              public  oriPresent: string,
              public oriPresentCost: number,
              public  oriPresentDesc: string,
              public  oriSampleVideoPath: string,
              public  oriSampleImagePath: string,
              public  oriSampleCertPath: string,
              public  oriComments: string,
              public oriCost: number,
              public oriCompanyOtherCert: string,
              public  oriLisenceType: string,
              public  oriLisenceDesc: string,
              public oriLisenceCost: number,
              public  newIdType: string,
              public  newIdDesc: string,
              public newIdCost: number,
              public  newOtherCert: string,
              public newOtherCertCost: number,
              public  newOtherCertDesc: string,
              public  newPresent: string,
              public newPresentCost: number,
              public  newPresentDesc: string,
              public  newSampleVideoPath: string,
              public  newSampleImagePath: string,
              public  newSampleCertPath: string,
              public  newComments: string,
              public newCost: number,
              public newCompanyOtherCert: string,
              public  newLisenceType: string,
              public  newLisenceDesc: string,
              public newLisenceCost: number,
              public  relatedBillId: number,
              public relatedBillName: string,
              public relatedBillType: string,
              public relatedItemName: string,
              public  createdate: string,
              public  creator: string,
              public  state: string,
              public  add1: string,
              public  add2: string,
              public  add3: string) {
  }
}
