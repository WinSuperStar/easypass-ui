import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Presale, PresaleService} from '../../service/presale.service';
import {AddrSelectService, Area, City, Province} from '../../shared/services/addr-select.service';
import {Observable} from 'rxjs/Observable';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Vendor} from '../../service/vendor.service';

@Component({
  selector: 'app-presmgt',
  templateUrl: './presmgt.component.html',
  styleUrls: ['./presmgt.component.css']
})
export class PresmgtComponent implements OnInit {

  public city: Observable<City[]>;
  public area: Observable<Area[]>;
  public province: Observable<Province[]>;
  public formGroup: FormGroup;
  public presales: Observable<Presale[]>;

  itemlist: any[] = [{state: '0', name: '提档'},{state: '0', name: '过户'},{state: '0', name: '上牌'},
    {state: '0', name: '违章'}, {state: '0', name: '抵押'}, {state: '0', name: '解除抵押'},
    {state: '0', name: '委托'}, {state: '0', name: '年检'},
    {state: '0', name: '换补牌证'}, {state: '0', name: '其他'}];

  initItemList(): FormArray {
    return this.fb.array(
      this.itemlist.map(item => {
        return this.fb.control(false);
      })
    );
  }

  constructor(private router: Router,
              private presaleService: PresaleService,
              private addrService: AddrSelectService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.province = this.addrService.getPros();
    this.formGroup = this.fb.group({
      caraddr1:[''],
      caraddr2:[''],
      caraddr3:[''],
      carplate1:[''],
      carplate2:[''],
      cusmode:[''],
      cusname:[''],
      state:[''],
      itemlist: this.fb.array([])
    });
    this.formGroup.setControl('itemlist', this.initItemList());
  }

  create() {
    // 需要新建代办商并且返回新建代办商的id，作为参数传入初始化form
    let creator = JSON.parse(localStorage.getItem('currentUser'))['username'];
    this.presaleService.createPresale(creator).subscribe(
      res => {
        let id = res;
        console.log(id);
        this.router.navigateByUrl('/home/presmgt/' + id);
      },
      err => {

      }
    );
  }

  showCity(item) {
    let p = item.target.value;
    this.addrService.getProCode(p).subscribe(
      res => {
        this.formGroup.get('carplate1').setValue(res);
      }
    );
    this.city = this.addrService.getCities(p);
    // this.formGroup.get('vdraddr3').reset();
    this.area = this.addrService.getAreas('');
  }

  showArea(item) {
    let c = item.target.value;
    this.addrService.getShotCode(c).subscribe(
      res => {
        if (res == '' || res == null) {
        } else {
          this.formGroup.get('carplate2').setValue(res);
        }
      }
    );
    this.area = this.addrService.getAreas(c);
  }

  search(form:any){
    this.presales = this.presaleService.getPresales(form);
  }

  edit(id:any){
    this.router.navigateByUrl('/home/presmgt/'+id);
  }
  delete(){

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
}
