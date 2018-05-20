import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/Rx';
import {AddrSelectService, Area, City, Province} from '../shared/services/addr-select.service';
import {Observable} from 'rxjs/Observable';
import {Vendor, VendorService} from '../service/vendor.service';

declare var $: any;

@Component({
  selector: 'app-vdrmgt',
  templateUrl: './vdrmgt.component.html',
  styleUrls: ['./vdrmgt.component.css']
})
export class VdrmgtComponent implements OnInit {
  private vdrs: Vendor[];
  private nameFilter: FormControl = new FormControl();
  private keyWord: string;
  public formGroup: FormGroup;
  public vendors: Observable<Vendor[]>;
  province: Observable<Province[]>;
  city: Observable<City[]>;
  area: Observable<Area[]>;
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

  constructor(public router: Router,
              private vendorService: VendorService,
              private addrService: AddrSelectService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.province = this.addrService.getPros();
    // this.vdrs = this.vendorService.getVendors();
    this.nameFilter.valueChanges
      .debounceTime(500)
      .subscribe(value => this.keyWord = value);
    $('#vdrmgt_form_dp').daterangepicker({
      'locale': {
        format: 'YYYY-MM-DD',
        separator: ' ~ ',
        applyLabel: '应用',
        cancelLabel: '取消',
        resetLabel: '重置',
      }
    });
    this.formGroup = this.fb.group({
      vdraddr1: [''],
      vdraddr2: [''],
      vdraddr3: [''],
      vdrplate1: [''],
      vdrplate2: [''],
      firstdate: [''],
      state: [''],
      contact: [''],
      contactphone: [''],
      itemlist: this.fb.array([])
    });
    this.formGroup.setControl('itemlist', this.initItemList());
    // this.formGroup.get('itemlist').valueChanges.subscribe(values => {
    //   values.forEach((selected: boolean, i: number) => {
    //     if (selected === true) {
    //       this.itemlist[i].state = '1';
    //     } else {
    //       this.itemlist[i].state = '0';
    //     }
    //   });
    // });
  }

  create() {
    // 需要新建代办商并且返回新建代办商的id，作为参数传入初始化form
    let creator = JSON.parse(localStorage.getItem('currentUser'))['username'];
    this.vendorService.createVdr(creator).subscribe(
      res => {
        let id = res;
        console.log(id);
        this.router.navigateByUrl('/home/vdrmgt/' + id);
      },
      err => {

      }
    );
  }

  // update(vdr: Vdr) {
  //   this.router.navigateByUrl('/home/vdrmgt/' + vdr.id);
  // }

  showCity(item) {
    let p = item.target.value;
    console.log(p);
    this.addrService.getProCode(p).subscribe(
      res => {
        this.formGroup.get('vdrplate1').setValue(res);
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
        if (res === '' || res == null) {
        } else {
          this.formGroup.get('vdrplate2').setValue(res);
        }
      }
    );
    this.area = this.addrService.getAreas(c);
  }

  search(form: any) {
    // console.log(form['itemlist']);
    this.vendors = this.vendorService.getVdrs(form);
  }

  showItemDetail(v: Vendor){
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

  edit(id:any){
    this.router.navigateByUrl('/home/vdrmgt/'+id);
  }

  submit(id:any){
    //提交
  }

  view(id:any){
    this.router.navigateByUrl('/home/vdrmgt/'+id);
  }
  delete(id:any){
    //删除
  }
}
