import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/Rx';
import {AddrSelectService, Area, City, Province} from '../shared/services/addr-select.service';
import {Observable} from 'rxjs/Observable';
import {Vendor, VendorService} from '../service/vendor.service';
import {DateService} from '../shared/services/date.service';

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
  public vendors: Vendor[];
  province: Observable<Province[]>;
  city: Observable<City[]>;
  area: Observable<Area[]>;
  itemlist: any[] = [{state: '0', name: '提档'}, {state: '0', name: '过户'}, {state: '0', name: '上牌'},
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
              private date: DateService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    $('#vdrmgt_form_dp').daterangepicker({
      'locale': {
        format: 'YYYY-MM-DD',
        separator: ' ~ ',
        applyLabel: '应用',
        cancelLabel: '取消',
        resetLabel: '重置',
      }
    }, function(start, end, label) {
      localStorage.removeItem('vdrmgt_date');
      localStorage.setItem('vdrmgt_date',start.format('YYYY-MM-DD') + '~' + end.format('YYYY-MM-DD'));
    }).on('cancel.daterangepicker', function(ev, picker) {
      localStorage.removeItem('vdrmgt_date');
      $(this).val('');
    });;

    const date = this.date;
    // sid = this.showItemDetail(Vendor);
    this.province = this.addrService.getPros();
    // this.vdrs = this.vendorService.getVendors();
    this.nameFilter.valueChanges
      .debounceTime(500)
      .subscribe(value => this.keyWord = value);
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
    this.formGroup.get('firstdate').valueChanges.subscribe(res=>{
      console.log(res);
    });
  }

  create() {
    // 需要新建代办商并且返回新建代办商的id，作为参数传入初始化form
    let creator = JSON.parse(localStorage.getItem('currentUser'))['username'];
    this.vendorService.createVdr(creator).subscribe(
      res => {
        let id = res;
        // console.log(id);
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
    // console.log(p);
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

  search() {
    // console.log(form['itemlist']);
    this.formGroup.get('firstdate').setValue(localStorage.getItem('vdrmgt_date'));
    // console.log(this.formGroup.value['firstdate']);
    this.vendorService.getVdrs(this.formGroup.value).subscribe(res => {
        this.vendors = res;
      },
      err => {
        alert('错误:' + err.message);
      });
    console.dir(this.vendors);
  }

  showItemDetail(v: Vendor) {
    let list: string = '';
    if (v.itemTidang == 'true') {
      list = '提档' + ',';
    }
    if (v.itemGuohu == 'true') {
      list = list + '过户' + ',';
    }
    if (v.itemShangpai == 'true') {
      list = list + '上牌' + ',';
    }
    if (v.itemWeizhang == 'true') {
      list = list + '违章' + ',';
    }
    if (v.itemDiya == 'true') {
      list = list + '抵押' + ',';
    }
    if (v.itemJiechudiya == 'true') {
      list = list + '解除抵押' + ',';
    }
    if (v.itemWeituo == 'true') {
      list = list + '委托' + ',';
    }
    if (v.itemNianjian == 'true') {
      list = list + '年检' + ',';
    }
    if (v.itemBuhuan == 'true') {
      list = list + '换补牌证' + ',';
    }
    if (v.itemQita == 'true') {
      list = list + '其他';
    }
    return list;
  }

  edit(id: any) {
    this.router.navigateByUrl('/home/vdrmgt/' + id);
  }

  submit(id: any) {
    //提交
    if (confirm('确定提交？')) {
      this.vendorService.smtVdr(id).subscribe(
        res => {
          alert('提交成功！');
          this.router.navigateByUrl('/home/vdrmgt');
        },
        err => {
          alert('提交失败：' + err.message);
        }
      );
    }
  }

  view(id: any) {
    this.router.navigateByUrl('/home/vdrmgt/' + id);
  }

  delete(id: any) {
    if (confirm('确定删除？')) {
      this.vendorService.delVdr(id).subscribe(
        res => {
          alert('删除成功！');
          this.router.navigateByUrl('/home/vdrmgt');
        },
        err => {
          alert('删除失败：' + err.message);
        }
      );
    }
  }
}
