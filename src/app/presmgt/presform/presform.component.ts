import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer, CustomerService} from '../../service/customer.service';
import {Observable} from 'rxjs/Observable';
import {Vendor, VendorService} from '../../service/vendor.service';
import {AddrSelectService, Area, City, Province} from '../../shared/services/addr-select.service';
import {Presale, PresaleService} from '../../service/presale.service';
import {ItemdetailService} from '../../service/itemdetail.service';
import {ValidationService} from '../../shared/services/validation.service';
import {DateService} from '../../shared/services/date.service';

declare var $: any;

@Component({
  selector: 'app-presform',
  templateUrl: './presform.component.html',
  styleUrls: ['./presform.component.css']
})
export class PresformComponent implements OnInit {
  presale: Presale;
  public customers: Observable<Customer[]>;
  public vendors: Observable<Vendor[]>;
  // private checkboxShangpai:any;
  public city: Observable<City[]>;
  public area: Observable<Area[]>;
  public province: Observable<Province[]>;
  public formGroup: FormGroup;
  // for cost beyond indication
  public itemTidangCost_vdr: string;
  public itemTidangTax_vdr: string;
  public itemGuohuCost_vdr: string;
  public itemGuohuTax_vdr: string;
  public itemShangpaiCost_vdr: string;
  public itemWeizhangCost_vdr: string;
  public itemWeizhangCost2_vdr: string;
  public itemDiyaCost_vdr: string;
  public itemJiechudiyaCost_vdr: string;
  public itemWeituoCost_vdr: string;
  public itemNianjianCost_vdr: string;
  public itemBuhuanCost_vdr: string;
  public itemQitaCost_vdr: string;

  public itemTidangCost_flag: boolean;
  public itemTidangTax_flag: boolean;
  public itemGuohuCost_flag: boolean;
  public itemGuohuTax_flag: boolean;
  public itemShangpaiCost_flag: boolean;
  public itemWeizhangCost_flag: boolean;
  public itemWeizhangCost2_flag: boolean;
  public itemDiyaCost_flag: boolean;
  public itemJiechudiyaCost_flag: boolean;
  public itemWeituoCost_flag: boolean;
  public itemNianjianCost_flag: boolean;
  public itemBuhuanCost_flag: boolean;
  public itemQitaCost_flag: boolean;
  public validNumStatus: boolean;

  constructor(private router: Router,
              private routeInfo: ActivatedRoute,
              private cusService: CustomerService,
              private vendorService: VendorService,
              private fb: FormBuilder,
              private addrService: AddrSelectService,
              public validation: ValidationService,
              private presaleService: PresaleService,
              private idService: ItemdetailService,
              private dateService: DateService) {
  }

  ngOnInit() {
    // this.customers = this.cusService.getAllCustomers();
    this.vendors = this.vendorService.getAllVdrs();
    let id = this.routeInfo.snapshot.params['id'];
    this.formGroup = this.fb.group({
      cusname: ['', Validators.required],
      cusmode: ['', Validators.required],
      contact: [''],
      caraddr1: ['', Validators.required],
      caraddr2: ['', Validators.required],
      caraddr3: ['', Validators.required],
      carplate1: ['', Validators.required],
      carplate2: ['', Validators.required],
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
      itemQitaDesc: [''],
      // contacts: this.fb.array([this.createContact()])
      contactphone: ['']
    });
    /************************ 销售限价金额校验 ******************************/
    this.formGroup.get('itemTidangCost').valueChanges.subscribe(value => {
      this.itemTidangCost_flag = this.compareNum(this.itemTidangCost_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemTidangTax').valueChanges.subscribe(value => {
      this.itemTidangTax_flag = this.compareNum(this.itemTidangTax_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemGuohuCost').valueChanges.subscribe(value => {
      this.itemGuohuCost_flag = this.compareNum(this.itemGuohuCost_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemGuohuTax').valueChanges.subscribe(value => {
      this.itemGuohuTax_flag = this.compareNum(this.itemGuohuTax_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemShangpaiCost').valueChanges.subscribe(value => {
      this.itemShangpaiCost_flag = this.compareNum(this.itemShangpaiCost_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemWeizhangCost').valueChanges.subscribe(value => {
      this.itemWeizhangCost_flag = this.compareNum(this.itemWeizhangCost_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemWeizhangCost2').valueChanges.subscribe(value => {
      this.itemWeizhangCost2_flag = this.compareNum(this.itemWeizhangCost2_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemDiyaCost').valueChanges.subscribe(value => {
      this.itemDiyaCost_flag = this.compareNum(this.itemDiyaCost_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemJiechudiyaCost').valueChanges.subscribe(value => {
      this.itemJiechudiyaCost_flag = this.compareNum(this.itemJiechudiyaCost_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemWeituoCost').valueChanges.subscribe(value => {
      this.itemWeituoCost_flag = this.compareNum(this.itemWeituoCost_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemNianjianCost').valueChanges.subscribe(value => {
      this.itemNianjianCost_flag = this.compareNum(this.itemNianjianCost_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemBuhuanCost').valueChanges.subscribe(value => {
      this.itemBuhuanCost_flag = this.compareNum(this.itemBuhuanCost_vdr, value);
      this.checkValidNumStatus();
    });
    this.formGroup.get('itemQitaCost').valueChanges.subscribe(value => {
      this.itemQitaCost_flag = this.compareNum(this.itemQitaCost_vdr, value);
      this.checkValidNumStatus();
    });

    this.presaleService.getPresale(id).subscribe(
      res => {
        this.presale = res;
        // this.province = this.addrService.getPros();
        this.showCity(res.caraddr.split(' ')[0]);
        this.showArea(res.caraddr.split(' ')[1]);
        this.formGroup.reset({
          cusname: res.cusname,
          cusmode: res.cusmode,
          caraddr1: res.caraddr.split(' ')[0],
          caraddr2: res.caraddr.split(' ')[1],
          caraddr3: res.caraddr.split(' ')[2],
          carplate1: res.carplate.split(' ')[0],
          carplate2: res.carplate.split(' ')[1],
          contact: res.vdrid,
          contactphone: res.contactphone,
          state: res.state,
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
          itemWeizhangTax: res.itemWeizhangTax,
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
          itemQitaDesc: res.itemQitaDesc
        });
        console.log('重置formgroup, 此时tidang的值为:'+this.formGroup.value['checkboxTidang']);
        if (this.presale.vdrid != null) {
          this.vendorService.getVdr(this.presale.vdrid).subscribe(
            res => {
              this.itemTidangCost_vdr = res.itemTidangCost;
              this.itemTidangTax_vdr = res.itemTidangTax;
              this.itemGuohuCost_vdr = res.itemGuohuCost;
              this.itemGuohuTax_vdr = res.itemGuohuTax;
              this.itemShangpaiCost_vdr = res.itemShangpaiCost;
              this.itemWeizhangCost_vdr = res.itemWeizhangCost;
              this.itemWeizhangCost2_vdr = res.itemWeizhangCost2;
              this.itemDiyaCost_vdr = res.itemDiyaCost;
              this.itemJiechudiyaCost_vdr = res.itemJiechudiyaCost;
              this.itemWeituoCost_vdr = res.itemWeituoCost;
              this.itemNianjianCost_vdr = res.itemNianjianCost;
              this.itemBuhuanCost_vdr = res.itemBuhuanCost;
              this.itemQitaCost_vdr = res.itemQitaCost;
              this.itemTidangCost_flag = this.compareNum(res.itemTidangCost, this.presale.itemTidangCost);
              this.itemTidangTax_flag = this.compareNum(res.itemTidangTax, this.presale.itemTidangTax);
              this.itemGuohuCost_flag= this.compareNum(res.itemGuohuCost, this.presale.itemGuohuCost);
              this.itemGuohuTax_flag= this.compareNum(res.itemGuohuTax, this.presale.itemGuohuTax);
              this.itemShangpaiCost_flag= this.compareNum(res.itemShangpaiCost, this.presale.itemShangpaiCost);
              this.itemWeizhangCost_flag= this.compareNum(res.itemWeizhangCost,this.presale.itemWeizhangCost);
              this.itemWeizhangCost2_flag= this.compareNum(res.itemWeizhangCost2, this.presale.itemWeizhangCost2);
              this.itemDiyaCost_flag= this.compareNum(res.itemDiyaCost, this.presale.itemDiyaCost);
              this.itemJiechudiyaCost_flag= this.compareNum(res.itemJiechudiyaCost, this.presale.itemJiechudiyaCost);
              this.itemWeituoCost_flag= this.compareNum(res.itemWeituoCost, this.presale.itemWeituoCost);
              this.itemNianjianCost_flag= this.compareNum(res.itemNianjianCost, this.presale.itemNianjianCost);
              this.itemBuhuanCost_flag= this.compareNum(res.itemBuhuanCost, this.presale.itemBuhuanCost);
              this.itemQitaCost_flag= this.compareNum(res.itemQitaCost, this.presale.itemQitaCost);
              this.checkValidNumStatus();
            }
          );
        }

      },
      err => {
        return err;
      }
    );
    this.province = this.addrService.getPros();
    // 根据客户模式带入客户名称
    this.formGroup.get('cusmode').valueChanges.subscribe(
      res => {
        this.customers = this.cusService.getCusByMode(res);
      }
    );
    // 选择完代办商后，带入代办商信息
    this.formGroup.get('contact').valueChanges.subscribe(
      res => {
        if(this.presale.vdrid != this.formGroup.get('contact').value) {
          this.vendorService.getVdr(this.formGroup.get('contact').value).subscribe(res => {
            this.presale.contact = res.contact;
            this.presale.vdrname = res.vdrname;
            this.presale.vdrid = res.vdrid;
            this.formGroup.get('checkboxTidang').setValue(res.itemTidang);
            this.formGroup.get('itemTidangCost').setValue(res.itemTidangCost);
            this.formGroup.get('itemTidangTax').setValue(res.itemTidangTax);
            this.formGroup.get('itemTidangCompletedate').setValue(res.itemTidangCompletedate);
            this.formGroup.get('itemTidangDesc').setValue(res.itemTidangDesc);
            this.formGroup.get('checkboxGuohu').setValue(res.itemGuohu);
            this.formGroup.get('itemGuohuCost').setValue(res.itemGuohuCost);
            this.formGroup.get('itemGuohuTax').setValue(res.itemGuohuTax);
            this.formGroup.get('itemGuohuCompletedate').setValue(res.itemGuohuCompletedate);
            this.formGroup.get('itemGuohuDesc').setValue(res.itemGuohuDesc);
            this.formGroup.get('checkboxShangpai').setValue(res.itemShangpai);
            this.formGroup.get('itemShangpaiCost').setValue(res.itemShangpaiCost);
            this.formGroup.get('itemShangpaiCompletedate').setValue(res.itemShangpaiCompletedate);
            this.formGroup.get('itemShangpaiDesc').setValue(res.itemShangpaiDesc);
            this.formGroup.get('checkboxWeizhang').setValue(res.itemWeizhang);
            this.formGroup.get('itemWeizhangCost').setValue(res.itemWeizhangCost);
            this.formGroup.get('itemWeizhangCost2').setValue(res.itemWeizhangCost2);
            this.formGroup.get('itemWeizhangCompletedate').setValue(res.itemWeizhangCompletedate);
            this.formGroup.get('itemWeizhangDesc').setValue(res.itemWeizhangDesc);
            this.formGroup.get('checkboxDiya').setValue(res.itemDiya);
            this.formGroup.get('itemDiyaCost').setValue(res.itemDiyaCost);
            this.formGroup.get('itemDiyaCompletedate').setValue(res.itemDiyaCompletedate);
            this.formGroup.get('itemDiyaDesc').setValue(res.itemDiyaDesc);
            this.formGroup.get('checkboxJiechudiya').setValue(res.itemJiechudiya);
            this.formGroup.get('itemJiechudiyaCost').setValue(res.itemJiechudiyaCost);
            this.formGroup.get('itemJiechudiyaCompletedate').setValue(res.itemJiechudiyaCompletedate);
            this.formGroup.get('itemJiechudiyaDesc').setValue(res.itemJiechudiyaDesc);
            this.formGroup.get('checkboxWeituo').setValue(res.itemWeituo);
            this.formGroup.get('itemWeituoCost').setValue(res.itemWeituoCost);
            this.formGroup.get('itemWeituoCompletedate').setValue(res.itemWeituoCompletedate);
            this.formGroup.get('itemWeituoDesc').setValue(res.itemWeituoDesc);
            this.formGroup.get('checkboxNianjian').setValue(res.itemNianjian);
            this.formGroup.get('itemNianjianCost').setValue(res.itemNianjianCost);
            this.formGroup.get('itemNianjianCompletedate').setValue(res.itemNianjianCompletedate);
            this.formGroup.get('itemNianjianDesc').setValue(res.itemNianjianDesc);
            this.formGroup.get('checkboxBuhuan').setValue(res.itemBuhuan);
            this.formGroup.get('itemBuhuanCost').setValue(res.itemBuhuanCost);
            this.formGroup.get('itemBuhuanCompletedate').setValue(res.itemBuhuanCompletedate);
            this.formGroup.get('itemBuhuanDesc').setValue(res.itemBuhuanDesc);
            this.formGroup.get('checkboxQita').setValue(res.itemQita);
            this.formGroup.get('itemQitaCost').setValue(res.itemQitaCost);
            this.formGroup.get('itemQitaCompletedate').setValue(res.itemQitaCompletedate);
            this.formGroup.get('itemQitaDesc').setValue(res.itemQitaDesc);
            this.itemTidangCost_vdr = res.itemTidangCost;
            this.itemTidangTax_vdr = res.itemTidangTax;
            this.itemGuohuCost_vdr = res.itemGuohuCost;
            this.itemGuohuTax_vdr = res.itemGuohuTax;
            this.itemShangpaiCost_vdr = res.itemShangpaiCost;
            this.itemWeizhangCost_vdr = res.itemWeizhangCost;
            this.itemWeizhangCost2_vdr = res.itemWeizhangCost2;
            this.itemDiyaCost_vdr = res.itemDiyaCost;
            this.itemJiechudiyaCost_vdr = res.itemJiechudiyaCost;
            this.itemWeituoCost_vdr = res.itemWeituoCost;
            this.itemNianjianCost_vdr = res.itemNianjianCost;
            this.itemBuhuanCost_vdr = res.itemBuhuanCost;
            this.itemQitaCost_vdr = res.itemQitaCost;
            this.refreshFlag();
          });
        }
        // console.log('触发contact改变，且覆盖了form的值,此时tidang的值为:'+this.formGroup.value['checkboxTidang']);
      });

    $('#fileUpload').fileinput({
      theme: 'fa',
      language: 'zh',
      allowedPreviewTypes: ['image'],
      allowedFileExtensions: ['jpg', 'png', 'gif'],
      uploadUrl: '/api/upload',
      uploadAsync: false,
      uploadExtraData: {
        moduleName: 'customer'
      }
    }).on('filebatchselected', function (event, files) {
      $('#fileUpload').fileinput('upload');
    }).on('fileuploaded', function (event, data, previewId, index) {
    });

    // Dynamiclly load validation for Tidang
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
  }

  cancel() {
    if (confirm('确定要返回？')) {
      this.router.navigateByUrl('/home/presmgt');
    }
  }

  refreshFlag(){
    this.itemTidangCost_flag = this.compareNum(this.itemTidangCost_vdr, this.formGroup.get('itemTidangCost').value);
    this.itemTidangTax_flag = this.compareNum(this.itemTidangTax_vdr, this.formGroup.get('itemTidangTax').value);
    this.itemGuohuCost_flag= this.compareNum(this.itemGuohuCost_vdr, this.formGroup.get('itemGuohuCost').value);
    this.itemGuohuTax_flag= this.compareNum(this.itemGuohuTax_vdr, this.formGroup.get('itemGuohuTax').value);
    this.itemShangpaiCost_flag= this.compareNum(this.itemShangpaiCost_vdr, this.formGroup.get('itemShangpaiCost').value);
    this.itemWeizhangCost_flag= this.compareNum(this.itemWeizhangCost_vdr,this.formGroup.get('itemWeizhangCost').value);
    this.itemWeizhangCost2_flag= this.compareNum(this.itemWeizhangCost2_vdr, this.formGroup.get('itemWeizhangCost2').value);
    this.itemDiyaCost_flag= this.compareNum(this.itemDiyaCost_vdr, this.formGroup.get('itemDiyaCost').value);
    this.itemJiechudiyaCost_flag= this.compareNum(this.itemJiechudiyaCost_vdr, this.formGroup.get('itemJiechudiyaCost').value);
    this.itemWeituoCost_flag= this.compareNum(this.itemWeituoCost_vdr, this.formGroup.get('itemWeituoCost').value);
    this.itemNianjianCost_flag= this.compareNum(this.itemNianjianCost_vdr, this.formGroup.get('itemNianjianCost').value);
    this.itemBuhuanCost_flag= this.compareNum(this.itemBuhuanCost_vdr, this.formGroup.get('itemBuhuanCost').value);
    this.itemQitaCost_flag= this.compareNum(this.itemQitaCost_vdr,  this.formGroup.get('itemQitaCost').value);
    this.checkValidNumStatus();
  }

  compareNum(vdr: any, pres: any) {
    return (vdr >= pres);
  }

  save() {
    if (this.formGroup.valid) {
      // this.presale.presaleid= this.formGroup.get('').value;
      this.presale.cusname = this.formGroup.get('cusname').value;
      this.presale.cusmode = this.formGroup.get('cusmode').value;
      this.presale.caraddr = this.formGroup.get('caraddr1').value + ' ' + this.formGroup.get('caraddr2').value + ' ' + this.formGroup.get('caraddr3').value;
      this.presale.carplate = this.formGroup.get('carplate1').value + ' ' + this.formGroup.get('carplate2').value;
      // this.presale.contact = this.formGroup.get('contact').value;
      this.presale.contactphone = this.formGroup.get('contactphone').value;
      // this.presale.contacts = '';
      this.presale.itemTidang = this.formGroup.get('checkboxTidang').value;
      this.presale.itemTidangTax = this.formGroup.get('itemTidangTax').value;
      this.presale.itemTidangCost = this.formGroup.get('itemTidangCost').value;
      this.presale.itemTidangCompletedate = this.formGroup.get('itemTidangCompletedate').value;
      this.presale.itemTidangDesc = this.formGroup.get('itemTidangDesc').value;
      // this.presale.itemTidangReqId = this.formGroup.get('').value;
      this.presale.itemGuohu = this.formGroup.get('checkboxGuohu').value;
      this.presale.itemGuohuTax = this.formGroup.get('itemGuohuTax').value;
      this.presale.itemGuohuCost = this.formGroup.get('itemGuohuCost').value;
      this.presale.itemGuohuCompletedate = this.formGroup.get('itemGuohuCompletedate').value;
      this.presale.itemGuohuDesc = this.formGroup.get('itemGuohuDesc').value;
      // this.presale.itemGuohuReqId = this.formGroup.get('').value;
      this.presale.itemShangpai = this.formGroup.get('checkboxShangpai').value;
      this.presale.itemShangpaiTax = this.formGroup.get('itemShangpaiTax').value;
      this.presale.itemShangpaiCost = this.formGroup.get('itemShangpaiCost').value;
      this.presale.itemShangpaiCompletedate = this.formGroup.get('itemShangpaiCompletedate').value;
      this.presale.itemShangpaiDesc = this.formGroup.get('itemShangpaiDesc').value;
      // this.presale.itemShangpaiReqId = this.formGroup.get('').value;
      this.presale.itemWeizhang = this.formGroup.get('checkboxWeizhang').value;
      this.presale.itemWeizhangTax = this.formGroup.get('itemWeizhangTax').value;
      this.presale.itemWeizhangCost = this.formGroup.get('itemWeizhangCost').value;
      this.presale.itemWeizhangCost2 = this.formGroup.get('itemWeizhangCost2').value;
      this.presale.itemWeizhangCompletedate = this.formGroup.get('itemWeizhangCompletedate').value;
      this.presale.itemWeizhangDesc = this.formGroup.get('itemWeizhangDesc').value;
      // this.presale.itemWeizhangReqId = this.formGroup.get('').value;
      this.presale.itemDiya = this.formGroup.get('checkboxDiya').value;
      this.presale.itemDiyaCost = this.formGroup.get('itemDiyaCost').value;
      this.presale.itemDiyaCompletedate = this.formGroup.get('itemDiyaCompletedate').value;
      this.presale.itemDiyaDesc = this.formGroup.get('itemDiyaDesc').value;
      // this.presale.itemDiyaReqId = this.formGroup.get('').value;
      this.presale.itemJiechudiya = this.formGroup.get('checkboxJiechudiya').value;
      this.presale.itemJiechudiyaCost = this.formGroup.get('itemJiechudiyaCost').value;
      this.presale.itemJiechudiyaCompletedate = this.formGroup.get('itemJiechudiyaCompletedate').value;
      this.presale.itemJiechudiyaDesc = this.formGroup.get('itemJiechudiyaDesc').value;
      // this.presale.itemJiechudiyaReqId = this.formGroup.get('').value;
      this.presale.itemWeituo = this.formGroup.get('checkboxWeituo').value;
      this.presale.itemWeituoTax = this.formGroup.get('itemWeituoTax').value;
      this.presale.itemWeituoCost = this.formGroup.get('itemWeituoCost').value;
      this.presale.itemWeituoCompletedate = this.formGroup.get('itemWeituoCompletedate').value;
      this.presale.itemWeituoDesc = this.formGroup.get('itemWeituoDesc').value;
      // this.presale.itemWeituoReqId = this.formGroup.get('').value;
      this.presale.itemNianjian = this.formGroup.get('checkboxNianjian').value;
      this.presale.itemNianjianTax = this.formGroup.get('itemNianjianTax').value;
      this.presale.itemNianjianCost = this.formGroup.get('itemNianjianCost').value;
      this.presale.itemNianjianCompletedate = this.formGroup.get('itemNianjianCompletedate').value;
      this.presale.itemNianjianDesc = this.formGroup.get('itemNianjianDesc').value;
      // this.presale.itemNianjianReqId = this.formGroup.get('').value;
      this.presale.itemBuhuan = this.formGroup.get('checkboxBuhuan').value;
      this.presale.itemBuhuanTax = this.formGroup.get('itemBuhuanTax').value;
      this.presale.itemBuhuanCost = this.formGroup.get('itemBuhuanCost').value;
      this.presale.itemBuhuanCompletedate = this.formGroup.get('itemBuhuanCompletedate').value;
      this.presale.itemBuhuanDesc = this.formGroup.get('itemBuhuanDesc').value;
      // this.presale.itemBuhuanReqId = this.formGroup.get('').value;
      this.presale.itemQita = this.formGroup.get('checkboxQita').value;
      this.presale.itemQitaCost = this.formGroup.get('itemQitaCost').value;
      this.presale.itemQitaCompletedate = this.formGroup.get('itemQitaCompletedate').value;
      this.presale.itemQitaDesc = this.formGroup.get('itemQitaDesc').value;
      // this.presale.state = this.formGroup.get('').value;
      // this.presale.createdate = this.formGroup.get('').value;
      // this.presale.creator = this.formGroup.get('').value;
      // this.presale.add1 = this.formGroup.get('').value;
      // this.presale.add2 = this.formGroup.get('').value;
      // this.presale.add3 = this.formGroup.get('').value;
      console.log(this.presale);
      this.presaleService.savePresale(JSON.stringify(this.presale)).subscribe(
        res => {
          alert('成功保存销售预录：' + this.presale.cusname);
        },
        err => {
          alert('错误：' + err.message);
        }
      );

    } else {
      // 触发所有校验
      this.validation.validateAllFormFields(this.formGroup);
    }
  }

  checkValidNumStatus() {
    // let flag: boolean = true;
    this.validNumStatus = (this.formGroup.get('checkboxTidang').value == ('true') ? (this.itemTidangTax_flag && this.itemTidangCost_flag) : true) &&
      (this.formGroup.get('checkboxGuohu').value == ('true') ? (this.itemGuohuTax_flag && this.itemGuohuCost_flag) : true) &&
        (this.formGroup.get('checkboxShangpai').value == ('true') ?  this.itemShangpaiCost_flag : true) &&
          (this.formGroup.get('checkboxWeizhang').value == ('true') ?  (this.itemWeizhangCost_flag && this.itemWeizhangCost2_flag) : true) &&
            (this.formGroup.get('checkboxDiya').value == ('true') ?  this.itemDiyaCost_flag : true) &&
              (this.formGroup.get('checkboxJiechudiya').value == ('true') ?  this.itemJiechudiyaCost_flag : true) &&
                (this.formGroup.get('checkboxWeituo').value == ('true') ?  this.itemWeituoCost_flag : true) &&
                  (this.formGroup.get('checkboxNianjian').value == ('true') ?  this.itemNianjianCost_flag : true) &&
                    (this.formGroup.get('checkboxBuhuan').value == ('true') ?  this.itemBuhuanCost_flag : true) &&
                      (this.formGroup.get('checkboxQita').value == ('true') ?  this.itemQitaCost_flag : true);
    // return flag;
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
    this.city = this.addrService.getCities(p);
    // this.formGroup.get('vdraddr3').reset();
    this.area = this.addrService.getAreas('');
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
        if (res == '' || res == null) {
          // this.formGroup.get('vdrplate2').enable();
        } else {
          // this.formGroup.get('vdrplate2').disable();
          this.formGroup.get('carplate2').setValue(res);
        }
      }
    );
    this.area = this.addrService.getAreas(c);
  }

  itemdetail(event: any) {
    let name = event.target.name;
    console.log(this.presale);
    switch (name) {
      case 'tidang':
        if (this.presale.itemTidangReqId == null) {
          this.idService.createItemdetail(this.presale.saleid, this.presale.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'presale')
            .subscribe(
              res => {
                this.presale.itemTidangReqId = res;
                this.presaleService.savePresale(JSON.stringify(this.presale)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.presale.itemTidangReqId);
        }
        break;
      case 'guohu':
        if (this.presale.itemGuohuReqId == null) {
          this.idService.createItemdetail(this.presale.saleid, this.presale.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'presale')
            .subscribe(
              res => {
                this.presale.itemGuohuReqId = res;
                this.presaleService.savePresale(JSON.stringify(this.presale)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.presale.itemGuohuReqId);
        }
        break;
      case 'shangpai':
        if (this.presale.itemShangpaiReqId == null) {
          this.idService.createItemdetail(this.presale.saleid, this.presale.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'presale')
            .subscribe(
              res => {
                this.presale.itemShangpaiReqId = res;
                this.presaleService.savePresale(JSON.stringify(this.presale)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.presale.itemShangpaiReqId);
        }
        break;
      case 'weizhang':
        if (this.presale.itemWeizhangReqId == null) {
          this.idService.createItemdetail(this.presale.saleid, this.presale.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'presale')
            .subscribe(
              res => {
                this.presale.itemWeizhangReqId = res;
                this.presaleService.savePresale(JSON.stringify(this.presale)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.presale.itemWeizhangReqId);
        }
        break;
      case 'diya':
        if (this.presale.itemDiyaReqId == null) {
          this.idService.createItemdetail(this.presale.saleid, this.presale.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'presale')
            .subscribe(
              res => {
                this.presale.itemDiyaReqId = res;
                this.presaleService.savePresale(JSON.stringify(this.presale)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.presale.itemDiyaReqId);
        }
        break;
      case 'jiechudiya':
        if (this.presale.itemJiechudiyaReqId == null) {
          this.idService.createItemdetail(this.presale.saleid, this.presale.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'presale')
            .subscribe(
              res => {
                this.presale.itemJiechudiyaReqId = res;
                this.presaleService.savePresale(JSON.stringify(this.presale)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.presale.itemJiechudiyaReqId);
        }
        break;
      case 'weituo':
        if (this.presale.itemWeituoReqId == null) {
          this.idService.createItemdetail(this.presale.saleid, this.presale.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'presale')
            .subscribe(
              res => {
                this.presale.itemWeituoReqId = res;
                this.presaleService.savePresale(JSON.stringify(this.presale)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.presale.itemWeituoReqId);
        }
        break;
      case 'nianjian':
        if (this.presale.itemNianjianReqId == null) {
          this.idService.createItemdetail(this.presale.saleid, this.presale.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'presale')
            .subscribe(
              res => {
                this.presale.itemNianjianReqId = res;
                this.presaleService.savePresale(JSON.stringify(this.presale)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.presale.itemNianjianReqId);
        }
        break;
      case 'buhuan':
        if (this.presale.itemBuhuanReqId == null) {
          this.idService.createItemdetail(this.presale.saleid, this.presale.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'presale')
            .subscribe(
              res => {
                this.presale.itemBuhuanReqId = res;
                this.presaleService.savePresale(JSON.stringify(this.presale)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.presale.itemBuhuanReqId);
        }
        break;
      case 'qita':
        if (this.presale.itemQitaReqId == null) {
          this.idService.createItemdetail(this.presale.saleid, this.presale.cusname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'presale')
            .subscribe(
              res => {
                this.presale.itemQitaReqId = res;
                this.presaleService.savePresale(JSON.stringify(this.presale)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.presale.itemQitaReqId);
        }
        break;
      default:
      //
    }

  }

  // submit() {
  //   if (this.validNumStatus) {
  //     if (this.presale.state == '审批中') {
  //       alert('正在审批，请稍后再试！');
  //     } else {
  //       if (confirm('确认录入销售信息吗？')) {
  //         this.presaleService.updatePresaleState('已录入', this.presale.saleid).subscribe(
  //           res => {
  //             alert('销售预录信息录入成功！');
  //           },
  //           err => {
  //             alert('录入失败：' + err.message);
  //           }
  //         );
  //       }
  //     }
  //   } else {
  //     if (this.presale.state == '审批中') {
  //       alert('正在审批，请稍后再试！');
  //     } else {
  //       if (confirm('确认提交审批吗？')) {
  //         this.presaleService.updatePresaleState('审批中', this.presale.saleid).subscribe(
  //           res => {
  //             alert('提交审批成功！');
  //             this.presale.state = '审批中';
  //           },
  //           err => {
  //             alert('提交失败：' + err.message);
  //           }
  //         );
  //       }
  //     }
  //   }
  // }

  submit(){
    if (confirm('确认录入销售信息吗？')) {
      if(this.presale.state == '已录入'){
        alert('请勿重复提交！');
      }else {
        this.presaleService.updatePresaleState('已录入', this.presale.saleid).subscribe(
          res => {
            alert('销售预录信息录入成功！');
          },
          err => {
            alert('录入失败：' + err.message);
          }
        );
      }
    }
  }
}
