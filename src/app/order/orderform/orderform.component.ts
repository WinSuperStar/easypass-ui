import {Component, Inject, Injectable, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Car, CarService} from '../../service/car.service';
import {Observable} from 'rxjs/Observable';
import {Customer, CustomerService} from '../../service/customer.service';
import {DateService} from '../../shared/services/date.service';
import {Vendor, VendorService} from '../../service/vendor.service';
import {AddrSelectService, Area, City, Province} from '../../shared/services/addr-select.service';
import {ValidationService} from '../../shared/services/validation.service';
import {Order, OrderService} from '../../service/order.service';
import {ItemdetailService} from '../../service/itemdetail.service';
import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {mobileValidator} from '../../shared/validators/Validators';
import {MatOptionSelectionChange, MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User, UserServiceService} from '../../service/user-service.service';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

declare var $: any;

const I18N_VALUES = {
  'zh': {
    weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    months: ['1月', '2月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '13月'],
  }
  // other languages you would support
};

@Injectable()
export class I18n {
  language = 'zh';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class OrderformComponent implements OnInit, OnDestroy {
  navigationSubscription;
  private fb: FormBuilder = new FormBuilder();
  public cars: Car[];
  private car: Car;
  public filteredCars: Observable<any[]>;
  // public filteredCars: Car[];
  public filteredCustomers: Observable<any[]>;
  private cus: Customer;
  public filteredVdr: Observable<any[]>;
  private vdr: Vendor;
  private cuss: Customer[];
  private vdrs: Vendor[];
  private users: User[];
  private user: User;
  province: Observable<Province[]>;
  city: Observable<City[]>;
  area: Observable<Area[]>;
  public order: Order;
  model;
  public loading = false;

  carnumFilter(val: string) {
    // console.dir(this.filteredCars);
    return (val == '' || val == null) ? this.cars : this.cars.filter(
      car => {
        return car.carnum.toLowerCase().indexOf(val.toLowerCase()) !== -1;
      }
    );
  }

  kuaidiButtonDisplay() {
    if(this.order != undefined) {
      let state = this.order.state;
      if (state == '新创建' || state == '待补全') {
        return '确认寄出';
      } else if (state == '待提交') {
        return '确认签收';
      } else {
        return '已经签收';
      }
    }
  }

  smtButtonDisplay(){
    if(this.order != undefined) {
      let state = this.order.state;
      if (state == '新创建' || state == '待补全' || state == '待提交') {
        return '分配订单';
      } else if (state == '待办证') {
        return '确认提交';
      } else {
        return '已经提交';
      }
    }
  }

  cusFilter(val: string) {
    return (val == '' || val == null) ? this.cuss : this.cuss.filter(
      cus => {
        return cus.cusname.toLowerCase().indexOf(val.toLowerCase()) !== -1;
      }
    );
  }

  vdrFilter(val: string) {
    return (val == '' || val == null) ? this.vdrs : this.vdrs.filter(
      vdr => {
        return vdr.contact.toLowerCase().indexOf(val.toLowerCase()) !== -1;
      }
    );
  }

  onSelectedCar(evt: MatOptionSelectionChange, car) {
    if (evt.source.selected) {
      this.formGroup.get('firstdate').setValue(this.dateService.dateFmt(car.firstdate));
      this.formGroup.get('carbrand').setValue(car.carbrand);
      this.formGroup.get('carset').setValue(car.carset);
    }
  }

  onSelectedCus(evt: MatOptionSelectionChange, cus) {
    if (evt.source.selected) {
      this.order.cusid = cus.cusid;
    }
  }

  onSelectedVdr(evt: MatOptionSelectionChange, vdr) {
    //
    if (evt.source.selected) {
      this.formGroup.get('checkboxTidang').setValue(vdr.itemTidang);
      this.formGroup.get('itemTidangCost').setValue(vdr.itemTidangCost);
      this.formGroup.get('itemTidangTax').setValue(vdr.itemTidangTax);
      this.formGroup.get('itemTidangCompletedate').setValue(vdr.itemTidangCompletedate);
      this.formGroup.get('itemTidangDesc').setValue(vdr.itemTidangDesc);
      this.formGroup.get('checkboxGuohu').setValue(vdr.itemGuohu);
      this.formGroup.get('itemGuohuCost').setValue(vdr.itemGuohuCost);
      this.formGroup.get('itemGuohuTax').setValue(vdr.itemGuohuTax);
      this.formGroup.get('itemGuohuCompletedate').setValue(vdr.itemGuohuCompletedate);
      this.formGroup.get('itemGuohuDesc').setValue(vdr.itemGuohuDesc);
      this.formGroup.get('checkboxShangpai').setValue(vdr.itemShangpai);
      this.formGroup.get('itemShangpaiCost').setValue(vdr.itemShangpaiCost);
      this.formGroup.get('itemShangpaiCompletedate').setValue(vdr.itemShangpaiCompletedate);
      this.formGroup.get('itemShangpaiDesc').setValue(vdr.itemShangpaiDesc);
      this.formGroup.get('checkboxWeizhang').setValue(vdr.itemWeizhang);
      this.formGroup.get('itemWeizhangCost').setValue(vdr.itemWeizhangCost);
      this.formGroup.get('itemWeizhangCost2').setValue(vdr.itemWeizhangCost2);
      this.formGroup.get('itemWeizhangCompletedate').setValue(vdr.itemWeizhangCompletedate);
      this.formGroup.get('itemWeizhangDesc').setValue(vdr.itemWeizhangDesc);
      this.formGroup.get('checkboxDiya').setValue(vdr.itemDiya);
      this.formGroup.get('itemDiyaCost').setValue(vdr.itemDiyaCost);
      this.formGroup.get('itemDiyaCompletedate').setValue(vdr.itemDiyaCompletedate);
      this.formGroup.get('itemDiyaDesc').setValue(vdr.itemDiyaDesc);
      this.formGroup.get('checkboxJiechudiya').setValue(vdr.itemJiechudiya);
      this.formGroup.get('itemJiechudiyaCost').setValue(vdr.itemJiechudiyaCost);
      this.formGroup.get('itemJiechudiyaCompletedate').setValue(vdr.itemJiechudiyaCompletedate);
      this.formGroup.get('itemJiechudiyaDesc').setValue(vdr.itemJiechudiyaDesc);
      this.formGroup.get('checkboxWeituo').setValue(vdr.itemWeituo);
      this.formGroup.get('itemWeituoCost').setValue(vdr.itemWeituoCost);
      this.formGroup.get('itemWeituoCompletedate').setValue(vdr.itemWeituoCompletedate);
      this.formGroup.get('itemWeituoDesc').setValue(vdr.itemWeituoDesc);
      this.formGroup.get('checkboxNianjian').setValue(vdr.itemNianjian);
      this.formGroup.get('itemNianjianCost').setValue(vdr.itemNianjianCost);
      this.formGroup.get('itemNianjianCompletedate').setValue(vdr.itemNianjianCompletedate);
      this.formGroup.get('itemNianjianDesc').setValue(vdr.itemNianjianDesc);
      this.formGroup.get('checkboxBuhuan').setValue(vdr.itemBuhuan);
      this.formGroup.get('itemBuhuanCost').setValue(vdr.itemBuhuanCost);
      this.formGroup.get('itemBuhuanCompletedate').setValue(vdr.itemBuhuanCompletedate);
      this.formGroup.get('itemBuhuanDesc').setValue(vdr.itemBuhuanDesc);
      this.formGroup.get('checkboxQita').setValue(vdr.itemQita);
      this.formGroup.get('itemQitaCost').setValue(vdr.itemQitaCost);
      this.formGroup.get('itemQitaCompletedate').setValue(vdr.itemQitaCompletedate);
      this.formGroup.get('itemQitaDesc').setValue(vdr.itemQitaDesc);
      // this.itemTidangCost_vdr = vdr.itemTidangCost;
      // this.itemTidangTax_vdr = vdr.itemTidangTax;
      // this.itemGuohuCost_vdr = vdr.itemGuohuCost;
      // this.itemGuohuTax_vdr = vdr.itemGuohuTax;
      // this.itemShangpaiCost_vdr = vdr.itemShangpaiCost;
      // this.itemWeizhangCost_vdr = vdr.itemWeizhangCost;
      // this.itemWeizhangCost2_vdr = vdr.itemWeizhangCost2;
      // this.itemDiyaCost_vdr = vdr.itemDiyaCost;
      // this.itemJiechudiyaCost_vdr = vdr.itemJiechudiyaCost;
      // this.itemWeituoCost_vdr = vdr.itemWeituoCost;
      // this.itemNianjianCost_vdr = vdr.itemNianjianCost;
      // this.itemBuhuanCost_vdr = vdr.itemBuhuanCost;
      // this.itemQitaCost_vdr = vdr.itemQitaCost;
      // this.refreshFlag();
      // }
      this.order.vdrid = vdr.vdrid;
      this.order.itemTidangReqId = vdr.itemTidangReqId;
      this.order.itemGuohuReqId = vdr.itemGuohuReqId;
      this.order.itemShangpaiReqId = vdr.itemShangpaiReqId;
      this.order.itemWeituoReqId = vdr.itemWeituoReqId;
      this.order.itemWeizhangReqId = vdr.itemWeizhangReqId;
      this.order.itemNianjianReqId = vdr.itemNianjianReqId;
      this.order.itemBuhuanReqId = vdr.itemBuhuanReqId;
      this.order.itemDiyaReqId = vdr.itemDiyaReqId;
      this.order.itemJiechudiyaReqId = vdr.itemJiechudiyaReqId;
      this.order.itemQitaReqId = vdr.itemQitaReqId;

    }
  }

  public formGroup: FormGroup = this.buildGroup();

  buildGroup() {
    return this.fb.group({
      carnum: ['', Validators.required],
      carbrand: [''],
      carset: [''],
      firstdate: [''],
      cusname: ['', Validators.required],
      caraddr1: ['', Validators.required],
      caraddr2: ['', Validators.required],
      caraddr3: [''],
      carplate1: ['', Validators.required],
      carplate2: ['', Validators.required],
      carplatenum: ['', Validators.required],
      vdrcontact: [''],
      oriownername: ['', Validators.required],
      oriownerphone: ['', mobileValidator],
      newownername: ['', Validators.required],
      newownerphone: ['', mobileValidator],
      itemdeadline: [''],
      itemplandate: [''],
      /** 车辆相关信息以及快递信息 **/
      WeizhangStatus: ['', Validators.required],
      WeizhangHandle: [''],
      WeizhangDesc: [''],
      NianjianStatus: ['', Validators.required],
      NianjianHandle: [''],
      NianjianDesc: [''],
      DiyaStatus: ['', Validators.required],
      DiyaHandle: [''],
      DiyaDesc: [''],
      PaizhengStatus: ['', Validators.required],
      PaizhengHandle: [''],
      PaizhengDesc: [''],
      QitaCost: [''],
      QitaDesc: [''],
      Cheliangcailiao: ['', Validators.required],
      Cheliangdengjizhengjian: [''],
      Xingshizheng: [''],
      Gongzhang: [''],
      OriShenfenzheng: [''],
      OriJuzhuzheng: [''],
      Yingyezhizhao: [''],
      Qitaxinxi: [''],
      Kuaididanhao: ['', Validators.required],
      KuaidiCost: ['', Validators.required],
      KuaidiImgPath: [''],
      KuaidiSets: this.fb.array([]),
      /** 办证费用相关 **/
      checkboxShangpai: [''],
      checkboxWeizhang: [''],
      checkboxDiya: [''],
      checkboxJiechudiya: [''],
      checkboxWeituo: [''],
      checkboxNianjian: [''],
      checkboxBuhuan: [''],
      checkboxQita: [''],
      checkboxTidang: [''],
      checkboxGuohu: [''],
      itemTidangTax: [''],
      itemTidangCost: [''],
      itemTidangCompletedate: [''],
      itemTidangDesc: [''],
      itemTidangReqId: [''],
      itemGuohuTax: [''],
      itemGuohuCost: [''],
      itemGuohuCompletedate: [''],
      itemGuohuDesc: [''],
      itemGuohuReqId: [''],
      itemShangpaiTax: [''],
      itemShangpaiCost: [''],
      itemShangpaiCompletedate: [''],
      itemShangpaiDesc: [''],
      itemShangpaiReqId: [''],
      // itemWeizhangTax: [''],
      itemWeizhangCost: [''],
      itemWeizhangCost2: [''],
      itemWeizhangCompletedate: [''],
      itemWeizhangDesc: [''],
      itemWeizhangReqId: [''],
      itemDiyaCost: [''],
      itemDiyaCompletedate: [''],
      itemDiyaDesc: [''],
      itemDiyaReqId: [''],
      itemJiechudiyaCost: [''],
      itemJiechudiyaCompletedate: [''],
      itemJiechudiyaDesc: [''],
      itemJiechudiyaReqId: [''],
      itemWeituoTax: [''],
      itemWeituoCost: [''],
      itemWeituoCompletedate: [''],
      itemWeituoDesc: [''],
      itemWeituoReqId: [''],
      itemNianjianTax: [''],
      itemNianjianCost: [''],
      itemNianjianCompletedate: [''],
      itemNianjianDesc: [''],
      itemNianjianReqId: [''],
      itemBuhuanTax: [''],
      itemBuhuanCost: [''],
      itemBuhuanCompletedate: [''],
      itemBuhuanDesc: [''],
      itemBuhuanReqId: [''],
      itemQitaCost: [''],
      itemQitaCompletedate: [''],
      itemQitaDesc: ['']
    });
  }

  constructor(private router: Router,
              private carService: CarService,
              public dateService: DateService,
              private customerSerivce: CustomerService,
              private vdrService: VendorService,
              private addrService: AddrSelectService,
              public validation: ValidationService,
              private routeInfo: ActivatedRoute,
              private orderService: OrderService,
              private idService: ItemdetailService,
              public dialog: MatDialog,
              private userService: UserServiceService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    this.loading = true;
    this.formGroup.reset();
    this.resetPage();
    this.loading = false;
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.loading = true;
    this.resetPage();
    this.loading = false;
  }

  resetPage() {
    // this.router.reload();
    this.province = this.addrService.getPros();
    let id = this.routeInfo.snapshot.params['id'];
    this.formGroup.get('firstdate').disable();
    this.formGroup.get('carbrand').disable();
    this.formGroup.get('carset').disable();
    this.formGroup.get('itemdeadline').disable();
    this.userService.getAllUsers().subscribe(res=>{
      this.users = res;
    });
    /**************** 代入车辆信息 ******************/
    this.carService.getAllCars().subscribe(
      res => {
        this.cars = res;
        this.filteredCars = this.formGroup.get('carnum').valueChanges.startWith('').map(val => this.carnumFilter(val));
      },
      err => {
        // this.loading = false;
        return err;
      }
    );
    /**************** 代入车辆信息 ******************/
    /**************** 代入客户信息 ******************/
    // let $inputcus = $('#odr_cusname');
    this.customerSerivce.getAllCustomers().subscribe(
      res => {
        this.cuss = res;
        this.filteredCustomers = this.formGroup.get('cusname').valueChanges.startWith('').map(val => this.cusFilter(val));
      },
      err => {
        // this.loading = false;
        return err;
      }
    );
    /**************** 代入客户信息 ******************/
    /**************** 代入代办商信息 ******************/
    // let $inputvdr = $('#odr_vdrcontact');
    this.vdrService.getAllVdrs().subscribe(
      res => {
        this.vdrs = res;
        this.filteredVdr = this.formGroup.get('vdrcontact').valueChanges.startWith('').map(val => this.vdrFilter(val));
      },
      err => {
        // this.loading = false;
        return err;
      }
    );
    /**************** 代入代办商信息 ******************/
    $('#odrform_dp2').datepicker({
      autoclose: true
    });

    /****************** 获取订单信息 *********************/
    this.orderService.getOdr(id).subscribe(
      res => {
        this.order = res;
        this.province = this.addrService.getPros();
        let a1 = res.carAddr != null ? res.carAddr.split(' ')[0] : '';
        let a2 = res.carAddr != null ? res.carAddr.split(' ')[1] : '';
        let a3 = res.carAddr != null ? res.carAddr.split(' ')[2] : '';
        let p1 = res.carPlateCode != null ? res.carPlateCode.split(' ')[0] : '';
        let p2 = res.carPlateCode != null ? res.carPlateCode.split(' ')[1] : '';
        if (res.carAddr != null && res.carAddr != undefined) {
          this.showCity(res.carAddr.split(' ')[0]);
          this.showArea(res.carAddr.split(' ')[1]);
        }
        this.formGroup.reset({
          carnum: res.carnum,
          carbrand: res.carbrand,
          carset: res.carset,
          firstdate: this.dateService.dateFmt(res.carRegDate),
          cusname: res.cusname,
          caraddr1: a1,
          caraddr2: a2,
          caraddr3: a3,
          carplate1: p1,
          carplate2: p2,
          carplatenum: res.carPlateNum,
          vdrcontact: res.vdrContact,
          oriownername: res.oriOwnerName,
          oriownerphone: res.oriOwnerPhone,
          newownername: res.newOwnerName,
          newownerphone: res.newOwnerPhone,
          itemdeadline: this.dateService.dateFmt(res.itemDeadline),
          itemplandate: this.dateService.ngDateFmt(res.itemPlanDate),
          WeizhangStatus: res.weizhangStatus,
          WeizhangHandle: res.weizhangHandle,
          WeizhangDesc: res.weizhangDesc,
          NianjianStatus: res.nianjianStatus,
          NianjianHandle: res.nianjianHandle,
          NianjianDesc: res.nianjianDesc,
          DiyaStatus: res.diyaStatus,
          DiyaHandle: res.diyaHandle,
          DiyaDesc: res.diyaDesc,
          PaizhengStatus: res.paizhengStatus,
          PaizhengHandle: res.paizhengHandle,
          PaizhengDesc: res.paizhengDesc,
          QitaCost: res.qitaCost,
          QitaDesc: res.qitaDesc,
          Cheliangcailiao: res.cheliangcailiao,
          Cheliangdengjizhengjian: res.cheliangdengjizhengjian,
          Xingshizheng: res.xingshizheng,
          Gongzhang: res.gongzhang,
          Orishenfenzheng: res.oriShenfenzheng,
          OriJuzhuzheng: res.oriJuzhuzheng,
          Yingyezhizhao: res.yingyezhizhao,
          Qitaxinxi: res.qitaxinxi,
          Kuaididanhao: res.kuaidiNum,
          KuaidiCost: res.kuaidiCost,
          kuaidiImgPath: res.kuaidiImgPath,
          KuaidiSets: res.KuaidiSets == null ? '' : JSON.parse(res.KuaidiSets),
          checkboxTidang: res.itemTidang,
          itemTidangTax: res.itemTidangTax,
          itemTidangCost: res.itemTidangCost,
          itemTidangCompletedate: res.itemTidangCompletedate,
          itemTidangDesc: res.itemTidangDesc,
          checkboxGuohu: res.itemGuohu,
          itemGuohuTax: res.itemGuohuTax,
          itemGuohuCost: res.itemGuohuCost,
          itemGuohuCompletedate: res.itemGuohuCompletedate,
          itemGuohuDesc: res.itemGuohuDesc,
          checkboxShangpai: res.itemShangpai,
          itemShangpaiTax: res.itemShangpaiTax,
          itemShangpaiCost: res.itemShangpaiCost,
          itemShangpaiCompletedate: res.itemShangpaiCompletedate,
          itemShangpaiDesc: res.itemShangpaiDesc,
          checkboxWeizhang: res.itemWeizhang,
          // itemWeizhangTax: res.itemWeizhangTax,
          itemWeizhangCost: res.itemWeizhangCost,
          itemWeizhangCost2: res.itemWeizhangCost2,
          itemWeizhangCompletedate: res.itemWeizhangCompletedate,
          itemWeizhangDesc: res.itemWeizhangDesc,
          checkboxDiya: res.itemDiya,
          itemDiyaCost: res.itemDiyaCost,
          itemDiyaCompletedate: res.itemDiyaCompletedate,
          itemDiyaDesc: res.itemDiyaDesc,
          checkboxJiechudiya: res.itemJiechudiya,
          itemJiechudiyaCost: res.itemJiechudiyaCost,
          itemJiechudiyaCompletedate: res.itemJiechudiyaCompletedate,
          itemJiechudiyaDesc: res.itemJiechudiyaDesc,
          checkboxWeituo: res.itemWeituo,
          itemWeituoTax: res.itemWeituoTax,
          itemWeituoCost: res.itemWeituoCost,
          itemWeituoCompletedate: res.itemWeituoCompletedate,
          itemWeituoDesc: res.itemWeituoDesc,
          checkboxNianjian: res.itemNianjian,
          itemNianjianTax: res.itemNianjianTax,
          itemNianjianCost: res.itemNianjianCost,
          itemNianjianCompletedate: res.itemNianjianCompletedate,
          itemNianjianDesc: res.itemNianjianDesc,
          checkboxBuhuan: res.itemBuhuan,
          itemBuhuanTax: res.itemBuhuanTax,
          itemBuhuanCost: res.itemBuhuanCost,
          itemBuhuanCompletedate: res.itemBuhuanCompletedate,
          itemBuhuanDesc: res.itemBuhuanDesc,
          checkboxQita: res.itemQita,
          itemQitaCost: res.itemQitaCost,
          itemQitaCompletedate: res.itemQitaCompletedate,
          itemQitaDesc: res.itemQitaDesc,
        });
      }
    );

    /*********************** 动态添加办证项目校验 ********************/
    this.formGroup.get('checkboxTidang').valueChanges.subscribe(value => {
      if (value) {
        this.formGroup.get('itemTidangCost').setValidators([Validators.required]);
        this.formGroup.get('itemTidangCompletedate').setValidators([Validators.required]);
      } else {
        this.formGroup.get('itemTidangCost').setValidators(null);
        this.formGroup.get('itemTidangCompletedate').setValidators(null);
      }
      this.formGroup.get('itemTidangCost').updateValueAndValidity();
      this.formGroup.get('itemTidangCompletedate').updateValueAndValidity();
    });
    // Dynamiclly load validation for Guohu
    this.formGroup.get('checkboxGuohu').valueChanges.subscribe(value => {
      if (value) {
        this.formGroup.get('itemGuohuCost').setValidators([Validators.required]);
        this.formGroup.get('itemGuohuCompletedate').setValidators([Validators.required]);
      } else {
        this.formGroup.get('itemGuohuCost').setValidators(null);
        this.formGroup.get('itemGuohuCompletedate').setValidators(null);
      }
      this.formGroup.get('itemGuohuCost').updateValueAndValidity();
      this.formGroup.get('itemGuohuCompletedate').updateValueAndValidity();
    });
    // Dynamiclly load validation for Shangpai
    this.formGroup.get('checkboxShangpai').valueChanges.subscribe(value => {
      if (value) {
        this.formGroup.get('itemShangpaiCost').setValidators([Validators.required]);
        this.formGroup.get('itemShangpaiCompletedate').setValidators([Validators.required]);
      } else {
        this.formGroup.get('itemShangpaiCost').setValidators(null);
        this.formGroup.get('itemShangpaiCompletedate').setValidators(null);
      }
      this.formGroup.get('itemShangpaiCost').updateValueAndValidity();
      this.formGroup.get('itemShangpaiCompletedate').updateValueAndValidity();
    });
    // Dynamiclly load validation for Weizhang
    this.formGroup.get('checkboxWeizhang').valueChanges.subscribe(value => {
      if (value) {
        this.formGroup.get('itemWeizhangCost').setValidators([Validators.required]);
        this.formGroup.get('itemWeizhangCost2').setValidators([Validators.required]);
        this.formGroup.get('itemWeizhangCompletedate').setValidators([Validators.required]);
      } else {
        this.formGroup.get('itemWeizhangCost').setValidators(null);
        this.formGroup.get('itemWeizhangCost2').setValidators(null);
        this.formGroup.get('itemWeizhangCompletedate').setValidators(null);
      }
      this.formGroup.get('itemWeizhangCost').updateValueAndValidity();
      this.formGroup.get('itemWeizhangCost2').updateValueAndValidity();
      this.formGroup.get('itemWeizhangCompletedate').updateValueAndValidity();
    });
    // Dynamiclly load validation for Diya
    this.formGroup.get('checkboxDiya').valueChanges.subscribe(value => {
      if (value) {
        this.formGroup.get('itemDiyaCost').setValidators([Validators.required]);
        this.formGroup.get('itemDiyaCompletedate').setValidators([Validators.required]);
      } else {
        this.formGroup.get('itemDiyaCost').setValidators(null);
        this.formGroup.get('itemDiyaCompletedate').setValidators(null);
      }
      this.formGroup.get('itemDiyaCost').updateValueAndValidity();
      this.formGroup.get('itemDiyaCompletedate').updateValueAndValidity();
    });
    // Dynamiclly load validation for Jiechudiya
    this.formGroup.get('checkboxJiechudiya').valueChanges.subscribe(value => {
      if (value) {
        this.formGroup.get('itemJiechudiyaCost').setValidators([Validators.required]);
        this.formGroup.get('itemJiechudiyaCompletedate').setValidators([Validators.required]);
      } else {
        this.formGroup.get('itemJiechudiyaCost').setValidators(null);
        this.formGroup.get('itemJiechudiyaCompletedate').setValidators(null);
      }
      this.formGroup.get('itemJiechudiyaCost').updateValueAndValidity();
      this.formGroup.get('itemJiechudiyaCompletedate').updateValueAndValidity();
    });
    // Dynamiclly load validation for Weituo
    this.formGroup.get('checkboxWeituo').valueChanges.subscribe(value => {
      if (value) {
        this.formGroup.get('itemWeituoCost').setValidators([Validators.required]);
        this.formGroup.get('itemWeituoCompletedate').setValidators([Validators.required]);
      } else {
        this.formGroup.get('itemWeituoCost').setValidators(null);
        this.formGroup.get('itemWeituoCompletedate').setValidators(null);
      }
      this.formGroup.get('itemWeituoCost').updateValueAndValidity();
      this.formGroup.get('itemWeituoCompletedate').updateValueAndValidity();
    });
    // Dynamiclly load validation for Nianjian
    this.formGroup.get('checkboxNianjian').valueChanges.subscribe(value => {
      if (value) {
        this.formGroup.get('itemNianjianCost').setValidators([Validators.required]);
        this.formGroup.get('itemNianjianCompletedate').setValidators([Validators.required]);
      } else {
        this.formGroup.get('itemNianjianCost').setValidators(null);
        this.formGroup.get('itemNianjianCompletedate').setValidators(null);
      }
      this.formGroup.get('itemNianjianCost').updateValueAndValidity();
      this.formGroup.get('itemNianjianCompletedate').updateValueAndValidity();
    });
    // Dynamiclly load validation for Buhuan
    this.formGroup.get('checkboxBuhuan').valueChanges.subscribe(value => {
      if (value) {
        this.formGroup.get('itemBuhuanCost').setValidators([Validators.required]);
        this.formGroup.get('itemBuhuanCompletedate').setValidators([Validators.required]);
      } else {
        this.formGroup.get('itemBuhuanCost').setValidators(null);
        this.formGroup.get('itemBuhuanCompletedate').setValidators(null);
      }
      this.formGroup.get('itemBuhuanCost').updateValueAndValidity();
      this.formGroup.get('itemBuhuanCompletedate').updateValueAndValidity();
    });
    // Dynamiclly load validation for Qita
    this.formGroup.get('checkboxQita').valueChanges.subscribe(value => {
      if (value) {
        this.formGroup.get('itemQitaCost').setValidators([Validators.required]);
        this.formGroup.get('itemQitaCompletedate').setValidators([Validators.required]);
      } else {
        this.formGroup.get('itemQitaCost').setValidators(null);
        this.formGroup.get('itemQitaCompletedate').setValidators(null);
      }
      this.formGroup.get('itemQitaCost').updateValueAndValidity();
      this.formGroup.get('itemQitaCompletedate').updateValueAndValidity();
    });
    /*********************** 动态添加办证项目校验 FINISH********************/

    /*********************** 添加车辆户籍地对代办商联系人的限制 ********************/
    this.formGroup.get('caraddr1').valueChanges.subscribe(res => {
      this.updateVdrByAddr();
    });
    this.formGroup.get('caraddr2').valueChanges.subscribe(res => {
      this.updateVdrByAddr();
    });
    this.formGroup.get('caraddr3').valueChanges.subscribe(res => {
      this.updateVdrByAddr();
    });
    /*********************** 添加车辆户籍地对代办商联系人的限制 FINISH********************/
    // this.loading = false;
  }

  checkLeastOneItem() {
    return this.itemStrBoolean(this.formGroup.get('checkboxTidang').value) ||
      this.itemStrBoolean(this.formGroup.get('checkboxGuohu').value) ||
      this.itemStrBoolean(this.formGroup.get('checkboxWeizhang').value) ||
      this.itemStrBoolean(this.formGroup.get('checkboxWeituo').value) ||
      this.itemStrBoolean(this.formGroup.get('checkboxNianjian').value) ||
      this.itemStrBoolean(this.formGroup.get('checkboxBuhuan').value) ||
      this.itemStrBoolean(this.formGroup.get('checkboxDiya').value) ||
      this.itemStrBoolean(this.formGroup.get('checkboxJiechudiya').value) ||
      this.itemStrBoolean(this.formGroup.get('checkboxQita').value) ||
      this.itemStrBoolean(this.formGroup.get('checkboxShangpai').value);
  }

  itemStrBoolean(str: any) {
    if (str == '') {
      return false;
    } else if (str == 'false') {
      return false;
    } else {
      return true;
    }
  }

  updateVdrByAddr() {
    this.vdrService.getVdrsByAddr(this.formGroup.get('caraddr1').value, this.formGroup.get('caraddr2').value, this.formGroup.get('caraddr3').value).subscribe(res => {
      this.vdrs = res;
      this.formGroup.get('vdrcontact').setValue('');
      // this.filteredVdr = this.vdrs;

    }, err => {
      console.log('error:' + err.error.message);
      return err;
    });
  }

  cancel() {
    this.router.navigateByUrl('/odrmgt');
  }

  createCus() {
    this.router.navigateByUrl('/home/cusform/0');
  }

  showCity(item) {
    let p: string;
    if (typeof item == 'string') {
      p = item;
    } else {
      p = item.target.value;
    }
    this.addrService.getProCode(p).subscribe(
      res => {
        this.formGroup.get('carplate1').setValue(res);
      }
    );
    this.formGroup.get('caraddr2').setValue('');
    this.city = this.addrService.getCities(p);
    // this.formGroup.get('vdraddr3').reset();
    this.area = this.addrService.getAreas('');
  }

  store() {
    // this.order.vdrid= this.formGroup.get('').value;
    this.order.carnum = this.formGroup.get('carnum').value;
    this.order.carbrand = this.formGroup.get('carbrand').value;
    this.order.carset = this.formGroup.get('carset').value;
    this.order.carRegDate = this.formGroup.get('firstdate').value;
    this.order.cusname = this.formGroup.get('cusname').value;
    this.order.carAddr = this.formGroup.get('caraddr1').value + ' ' + this.formGroup.get('caraddr2').value + ' ' + this.formGroup.get('caraddr3').value;
    this.order.carPlateCode = this.formGroup.get('carplate1').value + ' ' + this.formGroup.get('carplate2').value;
    this.order.carPlateNum = this.formGroup.get('carplatenum').value;
    this.order.vdrContact = this.formGroup.get('vdrcontact').value;
    this.order.oriOwnerName = this.formGroup.get('oriownername').value;
    this.order.oriOwnerPhone = this.formGroup.get('oriownerphone').value;
    this.order.newOwnerName = this.formGroup.get('newownername').value;
    this.order.newOwnerPhone = this.formGroup.get('newownerphone').value;
    // this.order.itemDeadline = this.formGroup.get('newownerphone').value;
    let model = this.formGroup.get('itemplandate').value;
    this.order.itemPlanDate = model.year + '-' + model.month + '-' + model.day;

    this.order.weizhangStatus = this.formGroup.get('WeizhangStatus').value;
    this.order.weizhangHandle = this.formGroup.get('WeizhangHandle').value;
    this.order.weizhangDesc = this.formGroup.get('WeizhangDesc').value;
    this.order.nianjianStatus = this.formGroup.get('NianjianStatus').value;
    this.order.nianjianHandle = this.formGroup.get('NianjianHandle').value;
    this.order.nianjianDesc = this.formGroup.get('NianjianDesc').value;
    this.order.diyaStatus = this.formGroup.get('DiyaStatus').value;
    this.order.diyaHandle = this.formGroup.get('DiyaHandle').value;
    this.order.diyaDesc = this.formGroup.get('DiyaDesc').value;
    this.order.paizhengStatus = this.formGroup.get('PaizhengStatus').value;
    this.order.paizhengHandle = this.formGroup.get('PaizhengHandle').value;
    this.order.paizhengDesc = this.formGroup.get('PaizhengDesc').value;
    this.order.qitaCost = this.formGroup.get('QitaCost').value;
    this.order.qitaDesc = this.formGroup.get('QitaDesc').value;
    this.order.cheliangcailiao = this.formGroup.get('Cheliangcailiao').value;
    this.order.cheliangdengjizhengjian = this.formGroup.get('Cheliangdengjizhengjian').value;
    this.order.xingshizheng = this.formGroup.get('Xingshizheng').value;
    this.order.gongzhang = this.formGroup.get('Gongzhang').value;
    this.order.oriShenfenzheng = this.formGroup.get('OriShenfenzheng').value;
    this.order.oriJuzhuzheng = this.formGroup.get('OriJuzhuzheng').value;
    this.order.yingyezhizhao = this.formGroup.get('Yingyezhizhao').value;
    this.order.qitaxinxi = this.formGroup.get('Qitaxinxi').value;
    this.order.kuaidiNum = this.formGroup.get('Kuaididanhao').value;
    this.order.kuaidiCost = this.formGroup.get('KuaidiCost').value;
    this.order.kuaidiImgPath = this.formGroup.get('KuaidiImgPath').value;
    this.order.kuaidiSets = JSON.stringify(this.formGroup.value['KuaidiSets']);
    // this.order.contacts = '';
    this.order.itemTidang = this.formGroup.get('checkboxTidang').value;
    this.order.itemTidangTax = this.formGroup.get('itemTidangTax').value;
    this.order.itemTidangCost = this.formGroup.get('itemTidangCost').value;
    this.order.itemTidangCompletedate = this.dateService.comDate(this.formGroup.get('itemTidangCompletedate').value);
    this.order.itemTidangDesc = this.formGroup.get('itemTidangDesc').value;
    // this.order.itemTidangReqId = this.formGroup.get('').value;
    this.order.itemGuohu = this.formGroup.get('checkboxGuohu').value;
    this.order.itemGuohuTax = this.formGroup.get('itemGuohuTax').value;
    this.order.itemGuohuCost = this.formGroup.get('itemGuohuCost').value;
    this.order.itemGuohuCompletedate = this.dateService.comDate(this.formGroup.get('itemGuohuCompletedate').value);
    this.order.itemGuohuDesc = this.formGroup.get('itemGuohuDesc').value;
    // this.order.itemGuohuReqId = this.formGroup.get('').value;
    this.order.itemShangpai = this.formGroup.get('checkboxShangpai').value;
    this.order.itemShangpaiTax = this.formGroup.get('itemShangpaiTax').value;
    this.order.itemShangpaiCost = this.formGroup.get('itemShangpaiCost').value;
    this.order.itemShangpaiCompletedate = this.dateService.comDate(this.formGroup.get('itemShangpaiCompletedate').value);
    this.order.itemShangpaiDesc = this.formGroup.get('itemShangpaiDesc').value;
    // this.order.itemShangpaiReqId = this.formGroup.get('').value;
    this.order.itemWeizhang = this.formGroup.get('checkboxWeizhang').value;
    // this.order.itemWeizhangTax = this.formGroup.get('itemWeizhangTax').value;
    this.order.itemWeizhangCost = this.formGroup.get('itemWeizhangCost').value;
    this.order.itemWeizhangCost2 = this.formGroup.get('itemWeizhangCost2').value;
    this.order.itemWeizhangCompletedate = this.dateService.comDate(this.formGroup.get('itemWeizhangCompletedate').value);
    this.order.itemWeizhangDesc = this.formGroup.get('itemWeizhangDesc').value;
    // this.order.itemWeizhangReqId = this.formGroup.get('').value;
    this.order.itemDiya = this.formGroup.get('checkboxDiya').value;
    this.order.itemDiyaCost = this.formGroup.get('itemDiyaCost').value;
    this.order.itemDiyaCompletedate = this.dateService.comDate(this.formGroup.get('itemDiyaCompletedate').value);
    this.order.itemDiyaDesc = this.formGroup.get('itemDiyaDesc').value;
    // this.order.itemDiyaReqId = this.formGroup.get('').value;
    this.order.itemJiechudiya = this.formGroup.get('checkboxJiechudiya').value;
    this.order.itemJiechudiyaCost = this.formGroup.get('itemJiechudiyaCost').value;
    this.order.itemJiechudiyaCompletedate = this.dateService.comDate(this.formGroup.get('itemJiechudiyaCompletedate').value);
    this.order.itemJiechudiyaDesc = this.formGroup.get('itemJiechudiyaDesc').value;
    // this.order.itemJiechudiyaReqId = this.formGroup.get('').value;
    this.order.itemWeituo = this.formGroup.get('checkboxWeituo').value;
    this.order.itemWeituoTax = this.formGroup.get('itemWeituoTax').value;
    this.order.itemWeituoCost = this.formGroup.get('itemWeituoCost').value;
    this.order.itemWeituoCompletedate = this.dateService.comDate(this.formGroup.get('itemWeituoCompletedate').value);
    this.order.itemWeituoDesc = this.formGroup.get('itemWeituoDesc').value;
    // this.order.itemWeituoReqId = this.formGroup.get('').value;
    this.order.itemNianjian = this.formGroup.get('checkboxNianjian').value;
    this.order.itemNianjianTax = this.formGroup.get('itemNianjianTax').value;
    this.order.itemNianjianCost = this.formGroup.get('itemNianjianCost').value;
    this.order.itemNianjianCompletedate = this.dateService.comDate(this.formGroup.get('itemNianjianCompletedate').value);
    this.order.itemNianjianDesc = this.formGroup.get('itemNianjianDesc').value;
    // this.order.itemNianjianReqId = this.formGroup.get('').value;
    this.order.itemBuhuan = this.formGroup.get('checkboxBuhuan').value;
    this.order.itemBuhuanTax = this.formGroup.get('itemBuhuanTax').value;
    this.order.itemBuhuanCost = this.formGroup.get('itemBuhuanCost').value;
    this.order.itemBuhuanCompletedate = this.dateService.comDate(this.formGroup.get('itemBuhuanCompletedate').value);
    this.order.itemBuhuanDesc = this.formGroup.get('itemBuhuanDesc').value;
    // this.order.itemBuhuanReqId = this.formGroup.get('').value;
    this.order.itemQita = this.formGroup.get('checkboxQita').value;
    this.order.itemQitaCost = this.formGroup.get('itemQitaCost').value;
    this.order.itemQitaCompletedate = this.dateService.comDate(this.formGroup.get('itemQitaCompletedate').value);
    this.order.itemQitaDesc = this.formGroup.get('itemQitaDesc').value;
    // this.order.contacts = JSON.stringify(this.formGroup.value['contacts']);
    // this.order.state = this.formGroup.get('').value;
    // this.order.createdate = this.formGroup.get('').value;
    // this.order.creator = this.formGroup.get('').value;
    // this.order.add1 = this.formGroup.get('').value;
    // this.order.add2 = this.formGroup.get('').value;
    // this.order.add3 = this.formGroup.get('').value;
    console.log(this.order);
  }

  submit() {
    if (this.formGroup.valid) {
      if (this.checkLeastOneItem()) {
        this.store();
        let state = this.order.state;
        if(state=='新创建'){
          alert('请先保存当前订单！');
        }else if(state=='待补全' || state == '待提交'){
          if(this.order.add1 == '已寄出'){
            // 进行分单
            // 状态流转至待提交
            console.log('打开对话框');
            let dialogRef = this.dialog.open(DialogOrderAssign, {
              width:'450px',
              height: '350px',
              data: {
                users : this.users
              }
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
              if(result == undefined){
                alert('未选择业务员');
              }else{
                this.orderService.orderAssign(this.order.orderid, result.userid, result.username).subscribe(res=>{
                  alert('分配成功，业务员为：'+result.username);
                  this.orderService.getOdr(this.order.orderid).subscribe(res => {
                    this.order = res;
                  });
                });
              }
            });
          }else{
            alert('请先将快递寄出！');
          }
        }
        // else if(state=='待提交'){
        //   // 先确认快递签收，确认快递签收后，流转至待办证
        //   if(this.order.add1 == '已签收'){
        //     // 提交，状态流转至待办证
        //   }else{
        //     alert('请先确认快递已经签收！');
        //   }
        // }
        else if(state =='待办证'){
          // 提交后进入办证中
          if(confirm('确认提交订单？')){
            this.orderService.updateOdrIng(this.order.orderid).subscribe(res=>{
              alert('提交成功！');
            });
          }
        }else if(state=='办证中'){
          // 校验输入框费用，需要审批流程
          // 审批通过，照片上传完成，进入办证完成
        }
      } else {
        alert('请至少选择一项办证项目！');
      }
    } else {
      // 触发所有校验
      this.validation.validateAllFormFields(this.formGroup);
    }
  }

  save() {
    // this.router.navigateByUrl('/home/vdrmgt');
    if (this.formGroup.valid) {
      this.store();
      this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
        res => {
          alert('成功保存订单：' + this.order.orderid);
          // this.ngOnInit();
          this.orderService.getOdr(this.order.orderid).subscribe(res => {
            this.order = res;
          });
        },
        err => {
          alert('错误：' + err.message);
        }
      );
    } else {
      // 触发所有校验
      // console.log(JSON.stringify(this.formGroup.value['contacts']));
      this.validation.validateAllFormFields(this.formGroup);
    }
  }

  showArea(item) {
    let c: string;
    if (typeof item == 'string') {
      c = item;
    } else {
      c = item.target.value;
    }
    this.addrService.getShotCode(c).subscribe(
      res => {
        if (res === '' || res == null) {
        } else {
          this.formGroup.get('carplate2').setValue(res);
        }
      }
    );
    this.area = this.addrService.getAreas(c);
    this.formGroup.get('caraddr3').setValue('');
  }

  createKuaidiSets() {
    return this.fb.group({
      kNum: [''],
      kCost: [''],
      kPath: ['']
    });
  }

  removeKuaidiSets(num: number) {
    let kuaidiSets = this.formGroup.get('KuaidiSets') as FormArray;
    kuaidiSets.removeAt(num);
  }

  addKuaidiSets() {
    let kuaidiSets = this.formGroup.get('KuaidiSets') as FormArray;
    kuaidiSets.push(this.createKuaidiSets());
  }

  kuaidiEvt() {
    if (this.formGroup.valid) {
      if (this.order.state == '待补全') {
        if (confirm('确认快递已经寄出？')) {
          this.loading = true;
          this.orderService.updateOdrPreSubmit(this.order.orderid).subscribe(res => {
              alert('状态修改成功！');
              this.orderService.getOdr(this.order.orderid).subscribe(res => {
                this.order = res;
              });
              this.loading = false;
            },
            err => {
              console.log(err.error.message);
            });
        }
      } else if( this.order.state == '待提交'){
        if (confirm('确认快递已经签收？')) {
          this.loading = true;
          this.orderService.updateOdrPreBuz(this.order.orderid).subscribe(res=>{
            alert('状态修改成功！');
            this.orderService.getOdr(this.order.orderid).subscribe(res => {
              this.order = res;
            });
            this.loading = false;
          });
        }
      }
    } else {
      this.validation.validateAllFormFields(this.formGroup);
    }
  }

  itemdetail(event: any) {
    let name = event.target.name;
    console.log(this.order);
    switch (name) {
      case 'tidang':
        if (this.order.itemTidangReqId == null) {
          this.idService.createItemdetail(this.order.orderid, this.order.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'order')
            .subscribe(
              res => {
                this.order.itemTidangReqId = res;
                this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
                  res => {
                    alert('为当前项目创建办证要求');
                  },
                  err => {
                    alert('错误：' + err.message);
                  }
                );
              },
              err => {
                return err;
              }
            );
        } else {
          this.router.navigateByUrl('/home/itemform/' + this.order.itemTidangReqId);
        }
        break;
      case 'guohu':
        if (this.order.itemGuohuReqId == null) {
          this.idService.createItemdetail(this.order.orderid, this.order.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'order')
            .subscribe(
              res => {
                this.order.itemGuohuReqId = res;
                this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
                  res => {
                    alert('为当前项目创建办证要求');
                  },
                  err => {
                    alert('错误：' + err.message);
                  }
                );
              },
              err => {
                return err;
              }
            );
        } else {
          this.router.navigateByUrl('/home/itemform/' + this.order.itemGuohuReqId);
        }
        break;
      case 'shangpai':
        if (this.order.itemShangpaiReqId == null) {
          this.idService.createItemdetail(this.order.orderid, this.order.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'order')
            .subscribe(
              res => {
                this.order.itemShangpaiReqId = res;
                this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
                  res => {
                    alert('为当前项目创建办证要求');
                  },
                  err => {
                    alert('错误：' + err.message);
                  }
                );
              },
              err => {
                return err;
              }
            );
        } else {
          this.router.navigateByUrl('/home/itemform/' + this.order.itemShangpaiReqId);
        }
        break;
      case 'weizhang':
        if (this.order.itemWeizhangReqId == null) {
          this.idService.createItemdetail(this.order.orderid, this.order.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'order')
            .subscribe(
              res => {
                this.order.itemWeizhangReqId = res;
                this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
                  res => {
                    alert('为当前项目创建办证要求');
                  },
                  err => {
                    alert('错误：' + err.message);
                  }
                );
              },
              err => {
                return err;
              }
            );
        } else {
          this.router.navigateByUrl('/home/itemform/' + this.order.itemWeizhangReqId);
        }
        break;
      case 'diya':
        if (this.order.itemDiyaReqId == null) {
          this.idService.createItemdetail(this.order.orderid, this.order.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'order')
            .subscribe(
              res => {
                this.order.itemDiyaReqId = res;
                this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
                  res => {
                    alert('为当前项目创建办证要求');
                  },
                  err => {
                    alert('错误：' + err.message);
                  }
                );
              },
              err => {
                return err;
              }
            );
        } else {
          this.router.navigateByUrl('/home/itemform/' + this.order.itemDiyaReqId);
        }
        break;
      case 'jiechudiya':
        if (this.order.itemJiechudiyaReqId == null) {
          this.idService.createItemdetail(this.order.orderid, this.order.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'order')
            .subscribe(
              res => {
                this.order.itemJiechudiyaReqId = res;
                this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
                  res => {
                    alert('为当前项目创建办证要求');
                  },
                  err => {
                    alert('错误：' + err.message);
                  }
                );
              },
              err => {
                return err;
              }
            );
        } else {
          this.router.navigateByUrl('/home/itemform/' + this.order.itemJiechudiyaReqId);
        }
        break;
      case 'weituo':
        if (this.order.itemWeituoReqId == null) {
          this.idService.createItemdetail(this.order.orderid, this.order.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'order')
            .subscribe(
              res => {
                this.order.itemWeituoReqId = res;
                this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
                  res => {
                    alert('为当前项目创建办证要求');
                  },
                  err => {
                    alert('错误：' + err.message);
                  }
                );
              },
              err => {
                return err;
              }
            );
        } else {
          this.router.navigateByUrl('/home/itemform/' + this.order.itemWeituoReqId);
        }
        break;
      case 'nianjian':
        if (this.order.itemNianjianReqId == null) {
          this.idService.createItemdetail(this.order.orderid, this.order.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'order')
            .subscribe(
              res => {
                this.order.itemNianjianReqId = res;
                this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
                  res => {
                    alert('为当前项目创建办证要求');
                  },
                  err => {
                    alert('错误：' + err.message);
                  }
                );
              },
              err => {
                return err;
              }
            );
        } else {
          this.router.navigateByUrl('/home/itemform/' + this.order.itemNianjianReqId);
        }
        break;
      case 'buhuan':
        if (this.order.itemBuhuanReqId == null) {
          this.idService.createItemdetail(this.order.orderid, this.order.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'order')
            .subscribe(
              res => {
                this.order.itemBuhuanReqId = res;
                this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
                  res => {
                    alert('为当前项目创建办证要求');
                  },
                  err => {
                    alert('错误：' + err.message);
                  }
                );
              },
              err => {
                return err;
              }
            );
        } else {
          this.router.navigateByUrl('/home/itemform/' + this.order.itemBuhuanReqId);
        }
        break;
      case 'qita':
        if (this.order.itemQitaReqId == null) {
          this.idService.createItemdetail(this.order.orderid, this.order.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'order')
            .subscribe(
              res => {
                this.order.itemQitaReqId = res;
                this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
                  res => {
                    alert('为当前项目创建办证要求');
                  },
                  err => {
                    alert('错误：' + err.message);
                  }
                );
              },
              err => {
                return err;
              }
            );
        } else {
          this.router.navigateByUrl('/home/itemform/' + this.order.itemQitaReqId);
        }
        break;
      default:
      //
    }
  }
}

export class KuaidiSets {
  constructor(public kNum: string,
              public kCost: number,
              public kPath: string) {
  }
}

@Component({
  selector: 'dialog-order-assign',
  templateUrl: 'dialog-order-assign.html',
})
export class DialogOrderAssign {
  selectedValue;
  constructor(
    public dialogRef: MatDialogRef<DialogOrderAssign>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
