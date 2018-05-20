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
    this.customers = this.cusService.getAllCustomers();
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
          contact: res.contact,
          contactphone: res.contactphone,
          state: res.state,
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
      },
      err => {
        return err;
      }
    );
    this.province = this.addrService.getPros();
    // 选择完代办商后，带入代办商信息
    this.formGroup.get('contact').valueChanges.subscribe(
      res => {
        // let v: Vendor;
        // for (let i = 0; i < this.vendors.length ;i++){
        //   if (this.vendors[i].contact == this.formGroup.get('contact').value){
        //     v = this.vendors[i];
        //     break;
        //   }
        // }
        this.vendorService.getVdr(this.formGroup.get('contact').value).subscribe(res=>{
          this.presale.contact = res.vdrname;
          this.formGroup.reset({
            checkboxTidang: res.itemTidang,
            itemTidangTax: res.itemTidangTax,
            itemTidangCost: res.itemTidangCost,
            itemTidangDesc: res.itemTidangDesc,
            checkboxGuohu: res.itemGuohu,
            itemGuohuTax: res.itemGuohuTax,
            itemGuohuCost: res.itemGuohuCost,
            itemGuohuDesc: res.itemGuohuDesc,
            checkboxShangpai: res.itemShangpai,
            itemShangpaiTax: res.itemShangpaiTax,
            itemShangpaiCost: res.itemShangpaiCost,
            itemShangpaiDesc: res.itemShangpaiDesc,
            checkboxWeizhang: res.itemWeizhang,
            itemWeizhangTax: res.itemWeizhangTax,
            itemWeizhangCost: res.itemWeizhangCost,
            itemWeizhangCost2: res.itemWeizhangCost2,
            itemWeizhangDesc: res.itemWeizhangDesc,
            checkboxDiya: res.itemDiya,
            itemDiyaCost: res.itemDiyaCost,
            itemDiyaDesc: res.itemDiyaDesc,
            checkboxJiechudiya: res.itemJiechudiya,
            itemJiechudiyaCost: res.itemJiechudiyaCost,
            itemJiechudiyaDesc: res.itemJiechudiyaDesc,
            checkboxWeituo: res.itemWeituo,
            itemWeituoTax: res.itemWeituoTax,
            itemWeituoCost: res.itemWeituoCost,
            itemWeituoDesc: res.itemWeituoDesc,
            checkboxNianjian: res.itemNianjian,
            itemNianjianTax: res.itemNianjianTax,
            itemNianjianCost: res.itemNianjianCost,
            itemNianjianDesc: res.itemNianjianDesc,
            checkboxBuhuan: res.itemBuhuan,
            itemBuhuanTax: res.itemBuhuanTax,
            itemBuhuanCost: res.itemBuhuanCost,
            itemBuhuanDesc: res.itemBuhuanDesc,
            checkboxQita: res.itemQita,
            itemQitaCost: res.itemQitaCost,
            itemQitaDesc: res.itemQitaDesc
          });
        });

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
        this.formGroup.get('itemTidangCompletedate').setValidators([Validators.required]);
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
        this.formGroup.get('itemGuohuCompletedate').setValidators([Validators.required]);
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
        this.formGroup.get('itemShangpaiCompletedate').setValidators([Validators.required]);
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
        this.formGroup.get('itemWeizhangCompletedate').setValidators([Validators.required]);
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
        this.formGroup.get('itemDiyaCompletedate').setValidators([Validators.required]);
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
        this.formGroup.get('itemJiechudiyaCompletedate').setValidators([Validators.required]);
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
        this.formGroup.get('itemWeituoCompletedate').setValidators([Validators.required]);
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
        this.formGroup.get('itemNianjianCompletedate').setValidators([Validators.required]);
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
        this.formGroup.get('itemBuhuanCompletedate').setValidators([Validators.required]);
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
        this.formGroup.get('itemQitaCompletedate').setValidators([Validators.required]);
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

  showCity(item) {
    console.log(typeof item);
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
}
