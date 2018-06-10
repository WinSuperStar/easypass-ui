import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Car, CarService} from '../../service/car.service';
import {Observable} from 'rxjs/Observable';
import {Customer, CustomerService} from '../../service/customer.service';
import {DateService} from '../../shared/services/date.service';
import {Vendor, VendorService} from '../../service/vendor.service';
import {AddrSelectService, Area, City, Province} from '../../shared/services/addr-select.service';
import {ValidationService} from '../../shared/services/validation.service';
import {Order, OrderService} from '../../service/order.service';
import {ItemdetailService} from '../../service/itemdetail.service';

declare var $: any;

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css']
})
export class OrderformComponent implements OnInit {
  private fb: FormBuilder = new FormBuilder();
  private cars: Car[];
  private cuss: Customer[];
  private vdrs: Vendor[];
  province: Observable<Province[]>;
  city: Observable<City[]>;
  area: Observable<Area[]>;
  public order: Order;
  model;

  public formGroup: FormGroup = this.fb.group({    carnum: ['',],
    carbrand: [''],
    carset: [''],
    firstdate: [''],
    cusname: [''],
    caraddr1: [''],
    caraddr2: [''],
    caraddr3: [''],
    carplate1: [''],
    carplate2: [''],
    carplatenum: [''],
    vdrcontact: [''],
    oriownername: [''],
    oriownerphone: [''],
    newownername: [''],
    newownerphone: [''],
    itemdeadline: [''],
    itemplandate: [''],
    /** 车辆相关信息以及快递信息 **/
    WeizhangStatus: [''],
    WeizhangHandle: [''],
    WeizhangDesc: [''],
    NianjianStatus: [''],
    NianjianHandle: [''],
    NianjianDesc: [''],
    DiyaStatus: [''],
    DiyaHandle: [''],
    DiyaDesc: [''],
    PaizhengStatus: [''],
    PaizhengHandle: [''],
    PaizhengDesc: [''],
    QitaCost: [''],
    QitaDesc: [''],
    Cheliangcailiao: [''],
    Cheliangdengjizhengjian: [''],
    Xingshizheng: [''],
    Gongzhang: [''],
    OriShenfenzheng: [''],
    OriJuzhuzheng: [''],
    Yingyezhizhao: [''],
    Qitaxinxi: [''],
    Kuaididanhao: [''],
    KuaidiCost: [''],
    KuaidiImgPath: [''],

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
    itemWeizhangTax: [''],
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

  constructor(private router: Router,
              private carService: CarService,
              public dateService: DateService,
              private customerSerivce: CustomerService,
              private vdrService: VendorService,
              private addrService: AddrSelectService,
              public validation: ValidationService,
              private routeInfo: ActivatedRoute,
              private orderService: OrderService,
              private idService: ItemdetailService) {
  }

  ngOnInit() {
    this.province = this.addrService.getPros();
    let id = this.routeInfo.snapshot.params['id'];
    /**************** 代入车辆信息 ******************/
    let $inputcar = $('#odr_carnum');
    this.carService.getAllCars().subscribe(
      res => {
        this.cars = res;
        $inputcar.typeahead({
          source: this.cars,
          displayText: function (item) {
            return item.carnum;
          }
        });
      },
      err => {
        return err;
      }
    );
    $inputcar.change(function () {
      var current = $inputcar.typeahead('getActive');
      if (current) {
        if (current.carnum === $inputcar.val()) {
          console.log(current);
          $('#odr_carbrand').val(current.carbrand);
          $('#odr_carset').val(current.carset);
          $('#odr_firstdate').val(current.firstdate.substring(0,10));
        }
      }
    });
    /**************** 代入车辆信息 ******************/
    /**************** 代入客户信息 ******************/
    let $inputcus = $('#odr_cusname');
    this.customerSerivce.getAllCustomers().subscribe(
      res => {
        this.cuss = res;
        $inputcus.typeahead({
          source: this.cuss,
          displayText: function (item) {
            return item.cusname;
          }
        });
      },
      err => {
        return err;
      }
    );
    /**************** 代入客户信息 ******************/
    /**************** 代入代办商信息 ******************/
    let $inputvdr = $('#odr_vdrcontact');
    this.vdrService.getAllVdrs().subscribe(
      res => {
        this.vdrs = res;
        $inputvdr.typeahead({
          source: this.vdrs,
          displayText: function (item) {
            return item.contact;
          }
        });
      },
      err => {
        return err;
      }
    );
    $inputvdr.change(function () {
      var current = $inputvdr.typeahead('getActive');
      if (current) {
        if (current.contact === $inputvdr.val()) {
          console.log('以下是选择的代办商');
          console.dir(current);
          localStorage.removeItem('odr_vdrid');
          localStorage.setItem('odr_vdrid',current.vdrid);
          // $('#odr_carbrand').val(current.carbrand);
          // $('#odr_carset').val(current.carset);
          // $('#odr_firstdate').val(current.firstdate);
        }
      }
    });
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
        if (res.carAddr != null) {
          this.showCity(res.carAddr.split(' ')[0]);
          this.showArea(res.carAddr.split(' ')[1]);
        }
        this.formGroup.reset({
          carnum: res.carnum,
          carbrand: res.carbrand,
          carset: res.carset,
          firstdate: res.firstdate,
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
          itemplandate: res.itemPlanDate,
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
          Cheliangcailiaoi: res.cheliangcailiao,
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
          checkboxTidang: res.itemTidang,
          itemTidangTax: res.itemTidangTax,
          itemTidangCost: res.itemTidangCost,
          itemTidangCompletedate: this.dateService.dateFmt(res.itemTidangCompletedate),
          itemTidangDesc: res.itemTidangDesc,
          checkboxGuohu: res.itemGuohu,
          itemGuohuTax: res.itemGuohuTax,
          itemGuohuCost: res.itemGuohuCost,
          itemGuohuCompletedate: this.dateService.dateFmt(res.itemGuohuCompletedate),
          itemGuohuDesc: res.itemGuohuDesc,
          checkboxShangpai: res.itemShangpai,
          itemShangpaiTax: res.itemShangpaiTax,
          itemShangpaiCost: res.itemShangpaiCost,
          itemShangpaiCompletedate: this.dateService.dateFmt(res.itemShangpaiCompletedate),
          itemShangpaiDesc: res.itemShangpaiDesc,
          checkboxWeizhang: res.itemWeizhang,
          itemWeizhangTax: res.itemWeizhangTax,
          itemWeizhangCost: res.itemWeizhangCost,
          itemWeizhangCost2: res.itemWeizhangCost2,
          itemWeizhangCompletedate: this.dateService.dateFmt(res.itemWeizhangCompletedate),
          itemWeizhangDesc: res.itemWeizhangDesc,
          checkboxDiya: res.itemDiya,
          itemDiyaCost: res.itemDiyaCost,
          itemDiyaCompletedate: this.dateService.dateFmt(res.itemDiyaCompletedate),
          itemDiyaDesc: res.itemDiyaDesc,
          checkboxJiechudiya: res.itemJiechudiya,
          itemJiechudiyaCost: res.itemJiechudiyaCost,
          itemJiechudiyaCompletedate: this.dateService.dateFmt(res.itemJiechudiyaCompletedate),
          itemJiechudiyaDesc: res.itemJiechudiyaDesc,
          checkboxWeituo: res.itemWeituo,
          itemWeituoTax: res.itemWeituoTax,
          itemWeituoCost: res.itemWeituoCost,
          itemWeituoCompletedate: this.dateService.dateFmt(res.itemWeituoCompletedate),
          itemWeituoDesc: res.itemWeituoDesc,
          checkboxNianjian: res.itemNianjian,
          itemNianjianTax: res.itemNianjianTax,
          itemNianjianCost: res.itemNianjianCost,
          itemNianjianCompletedate: this.dateService.dateFmt(res.itemNianjianCompletedate),
          itemNianjianDesc: res.itemNianjianDesc,
          checkboxBuhuan: res.itemBuhuan,
          itemBuhuanTax: res.itemBuhuanTax,
          itemBuhuanCost: res.itemBuhuanCost,
          itemBuhuanCompletedate: this.dateService.dateFmt(res.itemBuhuanCompletedate),
          itemBuhuanDesc: res.itemBuhuanDesc,
          checkboxQita: res.itemQita,
          itemQitaCost: res.itemQitaCost,
          itemQitaCompletedate: this.dateService.dateFmt(res.itemQitaCompletedate),
          itemQitaDesc: res.itemQitaDesc,
        });
      }
    );

    // 选择完代办商后，带入代办商信息
    this.formGroup.get('vdrcontact').valueChanges.subscribe(
      res=>{
        console.log('vdrcontact 变化触发事件');
        console.log('内存中的vdrid为 : '+localStorage.getItem('odr_vdrid'));
      }
    )
    //   res => {
    //     if (this.order.vdrContact != this.formGroup.get('vdrcontact').value) {
    //       this.vendorService.getVdr(this.formGroup.get('contact').value).subscribe(res => {
    //         this.presale.contact = res.contact;
    //         this.presale.vdrname = res.vdrname;
    //         this.presale.vdrid = res.vdrid;
    //         this.formGroup.get('checkboxTidang').setValue(res.itemTidang);
    //         this.formGroup.get('itemTidangDesc').setValue(res.itemTidangDesc);
    //         this.formGroup.get('checkboxGuohu').setValue(res.itemGuohu);
    //         this.formGroup.get('itemGuohuDesc').setValue(res.itemGuohuDesc);
    //         this.formGroup.get('checkboxShangpai').setValue(res.itemShangpai);
    //         this.formGroup.get('itemShangpaiDesc').setValue(res.itemShangpaiDesc);
    //         this.formGroup.get('checkboxWeizhang').setValue(res.itemWeizhang);
    //         this.formGroup.get('itemWeizhangDesc').setValue(res.itemWeizhangDesc);
    //         this.formGroup.get('checkboxDiya').setValue(res.itemDiya);
    //         this.formGroup.get('itemDiyaDesc').setValue(res.itemDiyaDesc);
    //         this.formGroup.get('checkboxJiechudiya').setValue(res.itemJiechudiya);
    //         this.formGroup.get('itemJiechudiyaDesc').setValue(res.itemJiechudiyaDesc);
    //         this.formGroup.get('checkboxWeituo').setValue(res.itemWeituo);
    //         this.formGroup.get('itemWeituoDesc').setValue(res.itemWeituoDesc);
    //         this.formGroup.get('checkboxNianjian').setValue(res.itemNianjian);
    //         this.formGroup.get('itemNianjianDesc').setValue(res.itemNianjianDesc);
    //         this.formGroup.get('checkboxBuhuan').setValue(res.itemBuhuan);
    //         this.formGroup.get('itemBuhuanDesc').setValue(res.itemBuhuanDesc);
    //         this.formGroup.get('checkboxQita').setValue(res.itemQita);
    //         this.formGroup.get('itemQitaDesc').setValue(res.itemQitaDesc);
    //         this.itemTidangCost_vdr = res.itemTidangCost;
    //         this.itemTidangTax_vdr = res.itemTidangTax;
    //         this.itemGuohuCost_vdr = res.itemGuohuCost;
    //         this.itemGuohuTax_vdr = res.itemGuohuTax;
    //         this.itemShangpaiCost_vdr = res.itemShangpaiCost;
    //         this.itemWeizhangCost_vdr = res.itemWeizhangCost;
    //         this.itemWeizhangCost2_vdr = res.itemWeizhangCost2;
    //         this.itemDiyaCost_vdr = res.itemDiyaCost;
    //         this.itemJiechudiyaCost_vdr = res.itemJiechudiyaCost;
    //         this.itemWeituoCost_vdr = res.itemWeituoCost;
    //         this.itemNianjianCost_vdr = res.itemNianjianCost;
    //         this.itemBuhuanCost_vdr = res.itemBuhuanCost;
    //         this.itemQitaCost_vdr = res.itemQitaCost;
    //       });
    //     }
    //     // console.log('触发contact改变，且覆盖了form的值,此时tidang的值为:'+this.formGroup.value['checkboxTidang']);
    //   });
  }

  cancel() {
    this.router.navigateByUrl('/odrmgt');
  }

  createCus() {
    this.router.navigateByUrl('/home/cusform/0');
  }

  showCity(item) {
    let p = item.target.value;
    console.log(p);
    this.addrService.getProCode(p).subscribe(
      res => {
        this.formGroup.get('carplate1').setValue(res);
      }
    );
    this.city = this.addrService.getCities(p);
    // this.formGroup.get('vdraddr3').reset();
    this.area = this.addrService.getAreas('');
  }

  save() {
    // this.router.navigateByUrl('/home/vdrmgt');
    if (this.formGroup.valid) {
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
      this.order.itemPlanDate = this.formGroup.get('itemplandate').value;

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
      this.order.itemWeizhangTax = this.formGroup.get('itemWeizhangTax').value;
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
      this.orderService.saveOdr(JSON.stringify(this.order)).subscribe(
        res => {
          alert('成功保存订单：' + this.order.orderid);
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
    let c = item.target.value;
    this.addrService.getShotCode(c).subscribe(
      res => {
        if (res === '' || res == null) {
        } else {
          this.formGroup.get('carplate2').setValue(res);
        }
      }
    );
    this.area = this.addrService.getAreas(c);
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
