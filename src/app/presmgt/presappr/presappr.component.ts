import { Component, OnInit } from '@angular/core';
import {Presale, PresaleService} from '../../service/presale.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-presappr',
  templateUrl: './presappr.component.html',
  styleUrls: ['./presappr.component.css']
})
export class PresapprComponent implements OnInit {

  public presales: Observable<Presale[]>;

  constructor(private pService: PresaleService) { }

  ngOnInit() {
    this.presales = this.pService.getPresalesByState('审批中');
  }
  showItemDetail(v: Presale){
    let list:string = '';
    if(v.itemTidang == 'true'){
      list = '提档'+',';
    }else if (v.itemGuohu == 'true'){
      list = list + '过户' +',';
    }else if (v.itemShangpai == 'true'){
      list = list + '上牌' +',';
    }else if (v.itemWeizhang == 'true'){
      list = list + '违章' +',';
    }else if (v.itemDiya == 'true'){
      list = list + '抵押' +',';
    }else if (v.itemJiechudiya == 'true'){
      list = list + '解除抵押' +',';
    }else if (v.itemWeituo == 'true'){
      list = list + '委托' +',';
    }else if (v.itemNianjian == 'true'){
      list = list + '年检' +',';
    }else if (v.itemBuhuan == 'true'){
      list = list + '换补牌证' +',';
    }else if (v.itemQita == 'true'){
      list = list + '其他';
    }
    return list;
  }

  approve(id:any){

  }
}
