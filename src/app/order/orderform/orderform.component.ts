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

  public formGroup: FormGroup = this.fb.group({
    carnum:['',],
    carbrand:[''],
    carset:[''],
    firstdate:[''],
    cusname:[''],
    caraddr1:[''],
    caraddr2:[''],
    caraddr3:[''],
    carplate1:[''],
    carplate2:[''],
    carplatenum:[''],
    vdrcontact:[''],
    oriownername:[''],
    oriownerphone:[''],
    newownername:[''],
    newownerphone:[''],
    itemdeadline:[''],
    itemplandate:[''],
    /** 车辆相关信息以及快递信息 **/
    WeizhangStatus:[''],
    WeizhangHandle:[''],
    WeizhangDesc:[''],
    NianjianStatus:[''],
    NianjianHandle:[''],
    NianjianDesc:[''],
    DiyaStatus:[''],
    DiyaHandle:[''],
    DiyaDesc:[''],
    PaizhengStatus:[''],
    PaizhengHandle:[''],
    PaizhengDesc:[''],
    QitaCost:[''],
    QitaDesc:[''],
    Cheliangcailiao:[''],
    Cheliangdengjizhengjian:[''],
    Xingshizheng:[''],
    Gongzhang:[''],
    OriShenfenzheng:[''],
    OriJuzhuzheng:[''],
    Yingyezhizhao:[''],
    Qitaxinxi:[''],
    Kuaididanhao:[''],
    KuaidiCost:[''],
    KuaidiImgPath:[''],
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
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.province = this.addrService.getPros();
    let id = this.routeInfo.snapshot.params['id'];
    /**************** 代入车辆信息 ******************/
    let $inputcar = $("#odr_carnum");
    this.carService.getAllCars().subscribe(
      res=>{
        this.cars = res;
        $inputcar.typeahead({
          source: this.cars,
          displayText: function(item){
            return item.carnum;
          }
        });
      },
      err=>{
        return err;
      }
    );
    $inputcar.change(function(){
      var current = $inputcar.typeahead('getActive');
      if(current){
        if(current.carnum===$inputcar.val()){
          console.log(current);
          $("#odr_carbrand").val(current.carbrand);
          $("#odr_carset").val(current.carset);
          $("#odr_firstdate").val(current.firstdate);
        }
      }
    });
    /**************** 代入车辆信息 ******************/
    /**************** 代入客户信息 ******************/
    let $inputcus = $("#odr_cusname");
    this.customerSerivce.getAllCustomers().subscribe(
      res=>{
        this.cuss = res;
        $inputcus.typeahead({
          source: this.cuss,
          displayText: function(item){
            return item.cusname;
          }
        });
      },
      err=>{
        return err;
      }
    );
    /**************** 代入客户信息 ******************/
    /**************** 代入代办商信息 ******************/
    let $inputvdr = $("#odr_vdrcontact");
    this.vdrService.getAllVdrs().subscribe(
      res=>{
        this.vdrs = res;
        $inputvdr.typeahead({
          source: this.vdrs,
          displayText: function(item){
            return item.contact;
          }
        });
      },
      err=>{
        return err;
      }
    );
    /**************** 代入代办商信息 ******************/
    $('#odrform_dp2').datepicker({
      autoclose: true
    });

    /****************** 获取订单信息 *********************/
    this.orderService.getOdr(id).subscribe(
      res=>{
        this.order = res;
        this.province = this.addrService.getPros();
        this.showCity(res.carAddr.split(' ')[0]);
        this.showArea(res.carAddr.split(' ')[1]);
        this.formGroup.reset({
          carnum: res.carnum,
          carbrand: res.carbrand,
          carset: res.carset,
          firstdate: res.firstdate,
          cusname: res.cusname,
          caraddr1: res.carAddr.split(' ')[0],
          caraddr2: res.carAddr.split(' ')[1],
          caraddr3: res.carAddr.split(' ')[2],
          carplate1: res.carPlateCode.split(' ')[0],
          carplate2:res.carPlateCode.split(' ')[1],
          carplatenum: res.carPlateNum,
          vdrcontact: res.vdrContact,
          oriownername: res.oriOwnerName,
          oriownerphone: res.oriOwnerPhone,
          newownername: res.newOwnerName,
          newownerphone: res.newOwnerPhone,
          itemdeadline:res.itemDeadline,
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
          KuaidiCost:res.kuaidiCost,
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
          itemWeizhangCompletedate:this.dateService.dateFmt(res.itemWeizhangCompletedate),
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
  }

  cancel() {
    this.router.navigateByUrl('/odrmgt');
  }

  createCus(){
    this.router.navigateByUrl('/home/cusform/0')
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
  save(){}
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
}
