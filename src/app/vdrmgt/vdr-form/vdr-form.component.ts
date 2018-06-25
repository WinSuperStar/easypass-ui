import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AddrSelectService, Area, City, Province} from '../../shared/services/addr-select.service';
import {Observable} from 'rxjs/Observable';
import {Vendor, VendorService} from '../../service/vendor.service';
import {ItemdetailService} from '../../service/itemdetail.service';
import {ValidationService} from '../../shared/services/validation.service';
import {arrayMobileValidator, mobileValidator} from '../../shared/validators/Validators';
import {DateService} from '../../shared/services/date.service';

@Component({
  selector: 'app-vdr-form',
  templateUrl: './vdr-form.component.html',
  styleUrls: ['./vdr-form.component.css']
})
export class VdrFormComponent implements OnInit {
  vdr: Vendor;
  private fb: FormBuilder = new FormBuilder();
  public city: Observable<City[]>;
  public area: Observable<Area[]>;
  public province: Observable<Province[]>;

  public formGroup: FormGroup;

  constructor(private routeInfo: ActivatedRoute,
              private vendorService: VendorService,
              private router: Router,
              private addrService: AddrSelectService,
              private idService: ItemdetailService,
              public validation: ValidationService,
              public dateService: DateService) {
  }

  ngOnInit() {
    // this.vdr = new Vendor();
    let id = this.routeInfo.snapshot.params['id'];
    let aim = this.routeInfo.snapshot.params['aim'];
    this.formGroup = this.fb.group({
      vdrname: ['', Validators.required],
      vdraddr1: ['', Validators.required],
      vdraddr2: ['', Validators.required],
      vdraddr3: ['', Validators.required],
      vdraddrdetail: ['', Validators.required],
      vdrplate1: ['', Validators.required],
      vdrplate2: ['', Validators.required],
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
      contacts: this.fb.array([]),
      contact: ['', Validators.required],
      contactphone: ['', [Validators.required, mobileValidator]]
    });
    if(aim=='view'){
      this.formGroup.disable();
    }
    this.vendorService.getVdr(id).subscribe(
      res => {
        this.vdr = res;
        console.log('当前vdr为');
        console.dir(res);
        this.province = this.addrService.getPros();
        this.showCity(res.vdraddr.split(' ')[0]);
        this.showArea(res.vdraddr.split(' ')[1]);
        this.formGroup.reset({
          vdrname: res.vdrname,
          vdraddrdetail: res.vdraddrdetail,
          vdraddr1: res.vdraddr.split(' ')[0],
          vdraddr2: res.vdraddr.split(' ')[1],
          vdraddr3: res.vdraddr.split(' ')[2],
          vdrplate1: res.vdrplate.split(' ')[0],
          vdrplate2: res.vdrplate.split(' ')[1],
          contact: res.contact,
          contactphone: res.contactphone,
          commitdate: res.commitdate,
          state: res.state,
          checkboxTidang: this.itemStrBoolean(res.itemTidang),
          itemTidangTax: res.itemTidangTax,
          itemTidangCost: res.itemTidangCost,
          itemTidangCompletedate: res.itemTidangCompletedate,
          itemTidangDesc: res.itemTidangDesc,
          checkboxGuohu: this.itemStrBoolean(res.itemGuohu),
          itemGuohuTax: res.itemGuohuTax,
          itemGuohuCost: res.itemGuohuCost,
          itemGuohuCompletedate: res.itemGuohuCompletedate,
          itemGuohuDesc: res.itemGuohuDesc,
          checkboxShangpai: this.itemStrBoolean(res.itemShangpai),
          itemShangpaiTax: res.itemShangpaiTax,
          itemShangpaiCost: res.itemShangpaiCost,
          itemShangpaiCompletedate: res.itemShangpaiCompletedate,
          itemShangpaiDesc: res.itemShangpaiDesc,
          checkboxWeizhang: this.itemStrBoolean(res.itemWeizhang),
          itemWeizhangTax: res.itemWeizhangTax,
          itemWeizhangCost: res.itemWeizhangCost,
          itemWeizhangCost2: res.itemWeizhangCost2,
          itemWeizhangCompletedate: res.itemWeizhangCompletedate,
          itemWeizhangDesc: res.itemWeizhangDesc,
          checkboxDiya: this.itemStrBoolean(res.itemDiya),
          itemDiyaCost: res.itemDiyaCost,
          itemDiyaCompletedate: res.itemDiyaCompletedate,
          itemDiyaDesc: res.itemDiyaDesc,
          checkboxJiechudiya: this.itemStrBoolean(res.itemJiechudiya),
          itemJiechudiyaCost: res.itemJiechudiyaCost,
          itemJiechudiyaCompletedate: res.itemJiechudiyaCompletedate,
          itemJiechudiyaDesc: res.itemJiechudiyaDesc,
          checkboxWeituo: this.itemStrBoolean(res.itemWeituo),
          itemWeituoTax: res.itemWeituoTax,
          itemWeituoCost: res.itemWeituoCost,
          itemWeituoCompletedate: res.itemWeituoCompletedate,
          itemWeituoDesc: res.itemWeituoDesc,
          checkboxNianjian: this.itemStrBoolean(res.itemNianjian),
          itemNianjianTax: res.itemNianjianTax,
          itemNianjianCost: res.itemNianjianCost,
          itemNianjianCompletedate: res.itemNianjianCompletedate,
          itemNianjianDesc: res.itemNianjianDesc,
          checkboxBuhuan: this.itemStrBoolean(res.itemBuhuan),
          itemBuhuanTax: res.itemBuhuanTax,
          itemBuhuanCost: res.itemBuhuanCost,
          itemBuhuanCompletedate: res.itemBuhuanCompletedate,
          itemBuhuanDesc: res.itemBuhuanDesc,
          checkboxQita: this.itemStrBoolean(res.itemQita),
          itemQitaCost: res.itemQitaCost,
          itemQitaCompletedate: res.itemQitaCompletedate,
          itemQitaDesc: res.itemQitaDesc,
          // contacts: this.loadContacts(res.contacts)
          contacts: res.contacts == null ? '' : JSON.parse(res.contacts)
        });
      }
    );
    // this.vdr = new Vdr(1, '车王', 13390988765, '上海浦东门店', [{id: 1, name: '办证', desc: '办理牌照证件', price: 9000}]);
    this.province = this.addrService.getPros();
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
      this.router.navigateByUrl('/home/vdrmgt');
    }
  }

  itemStrBoolean(str:any){
    if(str==''){
      return false;
    }else if(str == 'false'){
      return false
    }else{
      return true;
    }
  }

  loadContacts(contacts: any) {
    console.log(contacts);
    let cts = JSON.parse(contacts);
    console.log(cts);
    let array = this.fb.array([]);
    cts.map(contact => {
      array.push(this.fb.group({
        cname: [contact.cname],
        cphone: [contact.cphone]
      }));
    });
    console.log(array);
    return array;
  }

  save() {
    // this.router.navigateByUrl('/home/vdrmgt');
    if (this.checkLeastOneItem()) {
      if (this.formGroup.valid) {
        this.saveItem();
        this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
          res => {
            alert('成功保存代办商：' + this.vdr.vdrname);
          },
          err => {
            if (err.error.message.indexOf('contactphone_UNIQUE') != -1) {
              alert('保存失败，手机号码已存在');
              // this.odr = null;
            }
          }
        );
      } else {
        // 触发所有校验
        console.log(JSON.stringify(this.formGroup.value['contacts']));
        this.validation.validateAllFormFields(this.formGroup);
      }
    }else{
      alert('请至少选择一项办证项目!');
    }
  }

  checkLeastOneItem() {
    return this.itemStrBoolean(this.formGroup.get('checkboxTidang').value)||
    this.itemStrBoolean(this.formGroup.get('checkboxGuohu').value)||
    this.itemStrBoolean(this.formGroup.get('checkboxWeizhang').value)||
    this.itemStrBoolean(this.formGroup.get('checkboxWeituo').value)||
    this.itemStrBoolean(this.formGroup.get('checkboxNianjian').value)||
    this.itemStrBoolean(this.formGroup.get('checkboxBuhuan').value)||
    this.itemStrBoolean(this.formGroup.get('checkboxDiya').value)||
    this.itemStrBoolean(this.formGroup.get('checkboxJiechudiya').value)||
    this.itemStrBoolean(this.formGroup.get('checkboxQita').value)||
    this.itemStrBoolean(this.formGroup.get('checkboxShangpai').value);
  }

  submit() {
    let id = this.vdr.vdrid;
    if (this.checkLeastOneItem()) {
      if (this.formGroup.valid) {
        if (confirm('确定提交？')) {
          if(this.vdr.state == '已提交'){
            alert('请勿重复提交！');
          }else {
            this.saveItem();
            this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
              res => {
                this.vendorService.smtVdr(id).subscribe(
                  res => {
                    alert('提交成功！');
                    this.router.navigateByUrl('/home/vdrmgt');
                  },
                  err => {
                    alert('提交失败：' + err.error.message);
                  }
                );
              },
              err => {
                if (err.error.message.indexOf('contactphone_UNIQUE') != -1) {
                  alert('提交失败，手机号码已存在');
                  // this.odr = null;
                } else{
                  alert('提交失败，错误信息：'+err.error.message);
                }
              }
            );
          }
        }
      } else {
        // 触发所有校验
        console.log(JSON.stringify(this.formGroup.value['contacts']));
        this.validation.validateAllFormFields(this.formGroup);
      }
    }else{
      alert('请至少选择一项办证项目!');
    }
  }

  saveItem(){
    // this.vdr.vdrid= this.formGroup.get('').value;
    this.vdr.vdrname = this.formGroup.get('vdrname').value;
    this.vdr.vdraddr = this.formGroup.get('vdraddr1').value + ' ' + this.formGroup.get('vdraddr2').value + ' ' + this.formGroup.get('vdraddr3').value;
    this.vdr.vdraddrdetail = this.formGroup.get('vdraddrdetail').value;
    this.vdr.vdrplate = this.formGroup.get('vdrplate1').value + ' ' + this.formGroup.get('vdrplate2').value;
    this.vdr.contact = this.formGroup.get('contact').value;
    this.vdr.contactphone = this.formGroup.get('contactphone').value;
    // this.vdr.contacts = '';
    this.vdr.itemTidang = this.formGroup.get('checkboxTidang').value;
    this.vdr.itemTidangTax = this.formGroup.get('itemTidangTax').value;
    this.vdr.itemTidangCost = this.formGroup.get('itemTidangCost').value;
    this.vdr.itemTidangCompletedate = this.dateService.comDate(this.formGroup.get('itemTidangCompletedate').value);
    this.vdr.itemTidangDesc = this.formGroup.get('itemTidangDesc').value;
    // this.vdr.itemTidangReqId = this.formGroup.get('').value;
    this.vdr.itemGuohu = this.formGroup.get('checkboxGuohu').value;
    this.vdr.itemGuohuTax = this.formGroup.get('itemGuohuTax').value;
    this.vdr.itemGuohuCost = this.formGroup.get('itemGuohuCost').value;
    this.vdr.itemGuohuCompletedate = this.dateService.comDate(this.formGroup.get('itemGuohuCompletedate').value);
    this.vdr.itemGuohuDesc = this.formGroup.get('itemGuohuDesc').value;
    // this.vdr.itemGuohuReqId = this.formGroup.get('').value;
    this.vdr.itemShangpai = this.formGroup.get('checkboxShangpai').value;
    this.vdr.itemShangpaiTax = this.formGroup.get('itemShangpaiTax').value;
    this.vdr.itemShangpaiCost = this.formGroup.get('itemShangpaiCost').value;
    this.vdr.itemShangpaiCompletedate = this.dateService.comDate(this.formGroup.get('itemShangpaiCompletedate').value);
    this.vdr.itemShangpaiDesc = this.formGroup.get('itemShangpaiDesc').value;
    // this.vdr.itemShangpaiReqId = this.formGroup.get('').value;
    this.vdr.itemWeizhang = this.formGroup.get('checkboxWeizhang').value;
    this.vdr.itemWeizhangTax = this.formGroup.get('itemWeizhangTax').value;
    this.vdr.itemWeizhangCost = this.formGroup.get('itemWeizhangCost').value;
    this.vdr.itemWeizhangCost2 = this.formGroup.get('itemWeizhangCost2').value;
    this.vdr.itemWeizhangCompletedate = this.dateService.comDate(this.formGroup.get('itemWeizhangCompletedate').value);
    this.vdr.itemWeizhangDesc = this.formGroup.get('itemWeizhangDesc').value;
    // this.vdr.itemWeizhangReqId = this.formGroup.get('').value;
    this.vdr.itemDiya = this.formGroup.get('checkboxDiya').value;
    this.vdr.itemDiyaCost = this.formGroup.get('itemDiyaCost').value;
    this.vdr.itemDiyaCompletedate = this.dateService.comDate(this.formGroup.get('itemDiyaCompletedate').value);
    this.vdr.itemDiyaDesc = this.formGroup.get('itemDiyaDesc').value;
    // this.vdr.itemDiyaReqId = this.formGroup.get('').value;
    this.vdr.itemJiechudiya = this.formGroup.get('checkboxJiechudiya').value;
    this.vdr.itemJiechudiyaCost = this.formGroup.get('itemJiechudiyaCost').value;
    this.vdr.itemJiechudiyaCompletedate = this.dateService.comDate(this.formGroup.get('itemJiechudiyaCompletedate').value);
    this.vdr.itemJiechudiyaDesc = this.formGroup.get('itemJiechudiyaDesc').value;
    // this.vdr.itemJiechudiyaReqId = this.formGroup.get('').value;
    this.vdr.itemWeituo = this.formGroup.get('checkboxWeituo').value;
    this.vdr.itemWeituoTax = this.formGroup.get('itemWeituoTax').value;
    this.vdr.itemWeituoCost = this.formGroup.get('itemWeituoCost').value;
    this.vdr.itemWeituoCompletedate = this.dateService.comDate(this.formGroup.get('itemWeituoCompletedate').value);
    this.vdr.itemWeituoDesc = this.formGroup.get('itemWeituoDesc').value;
    // this.vdr.itemWeituoReqId = this.formGroup.get('').value;
    this.vdr.itemNianjian = this.formGroup.get('checkboxNianjian').value;
    this.vdr.itemNianjianTax = this.formGroup.get('itemNianjianTax').value;
    this.vdr.itemNianjianCost = this.formGroup.get('itemNianjianCost').value;
    this.vdr.itemNianjianCompletedate = this.dateService.comDate(this.formGroup.get('itemNianjianCompletedate').value);
    this.vdr.itemNianjianDesc = this.formGroup.get('itemNianjianDesc').value;
    // this.vdr.itemNianjianReqId = this.formGroup.get('').value;
    this.vdr.itemBuhuan = this.formGroup.get('checkboxBuhuan').value;
    this.vdr.itemBuhuanTax = this.formGroup.get('itemBuhuanTax').value;
    this.vdr.itemBuhuanCost = this.formGroup.get('itemBuhuanCost').value;
    this.vdr.itemBuhuanCompletedate = this.dateService.comDate(this.formGroup.get('itemBuhuanCompletedate').value);
    this.vdr.itemBuhuanDesc = this.formGroup.get('itemBuhuanDesc').value;
    // this.vdr.itemBuhuanReqId = this.formGroup.get('').value;
    this.vdr.itemQita = this.formGroup.get('checkboxQita').value;
    this.vdr.itemQitaCost = this.formGroup.get('itemQitaCost').value;
    this.vdr.itemQitaCompletedate = this.dateService.comDate(this.formGroup.get('itemQitaCompletedate').value);
    this.vdr.itemQitaDesc = this.formGroup.get('itemQitaDesc').value;
    this.vdr.contacts = JSON.stringify(this.formGroup.value['contacts']);
    // this.vdr.state = this.formGroup.get('').value;
    // this.vdr.createdate = this.formGroup.get('').value;
    // this.vdr.creator = this.formGroup.get('').value;
    // this.vdr.add1 = this.formGroup.get('').value;
    // this.vdr.add2 = this.formGroup.get('').value;
    // this.vdr.add3 = this.formGroup.get('').value;
    console.log(this.vdr);
  }

  addContact() {
    let contacts = this.formGroup.get('contacts') as FormArray;
    contacts.push(this.createContact());
  }

  removeContact(num: number) {
    let contacts = this.formGroup.get('contacts') as FormArray;
    contacts.removeAt(num);
  }

  test() {
    console.log(this.formGroup.get('checkboxShangpai'));
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
        this.formGroup.get('vdrplate1').setValue(res);
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
          this.formGroup.get('vdrplate2').setValue(res);
        }
      }
    );
    this.area = this.addrService.getAreas(c);
  }

  createContact(): FormGroup {
    return this.fb.group({
      cname: [''],
      cphone: ['']
    });
  }

  itemdetail(event: any) {
    let name = event.target.name;
    console.log(this.vdr);
    switch (name) {
      case 'tidang':
        if (this.vdr.itemTidangReqId == null) {
          this.idService.createItemdetail(this.vdr.vdrid, this.vdr.vdrname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'vendor')
            .subscribe(
              res => {
                this.vdr.itemTidangReqId = res;
                this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.vdr.itemTidangReqId);
        }
        break;
      case 'guohu':
        if (this.vdr.itemGuohuReqId == null) {
          this.idService.createItemdetail(this.vdr.vdrid, this.vdr.vdrname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'vendor')
            .subscribe(
              res => {
                this.vdr.itemGuohuReqId = res;
                this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.vdr.itemGuohuReqId);
        }
        break;
      case 'shangpai':
        if (this.vdr.itemShangpaiReqId == null) {
          this.idService.createItemdetail(this.vdr.vdrid, this.vdr.vdrname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'vendor')
            .subscribe(
              res => {
                this.vdr.itemShangpaiReqId = res;
                this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.vdr.itemShangpaiReqId);
        }
        break;
      case 'weizhang':
        if (this.vdr.itemWeizhangReqId == null) {
          this.idService.createItemdetail(this.vdr.vdrid, this.vdr.vdrname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'vendor')
            .subscribe(
              res => {
                this.vdr.itemWeizhangReqId = res;
                this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.vdr.itemWeizhangReqId);
        }
        break;
      case 'diya':
        if (this.vdr.itemDiyaReqId == null) {
          this.idService.createItemdetail(this.vdr.vdrid, this.vdr.vdrname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'vendor')
            .subscribe(
              res => {
                this.vdr.itemDiyaReqId = res;
                this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.vdr.itemDiyaReqId);
        }
        break;
      case 'jiechudiya':
        if (this.vdr.itemJiechudiyaReqId == null) {
          this.idService.createItemdetail(this.vdr.vdrid, this.vdr.vdrname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'vendor')
            .subscribe(
              res => {
                this.vdr.itemJiechudiyaReqId = res;
                this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.vdr.itemJiechudiyaReqId);
        }
        break;
      case 'weituo':
        if (this.vdr.itemWeituoReqId == null) {
          this.idService.createItemdetail(this.vdr.vdrid, this.vdr.vdrname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'vendor')
            .subscribe(
              res => {
                this.vdr.itemWeituoReqId = res;
                this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.vdr.itemWeituoReqId);
        }
        break;
      case 'nianjian':
        if (this.vdr.itemNianjianReqId == null) {
          this.idService.createItemdetail(this.vdr.vdrid, this.vdr.vdrname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'vendor')
            .subscribe(
              res => {
                this.vdr.itemNianjianReqId = res;
                this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.vdr.itemNianjianReqId);
        }
        break;
      case 'buhuan':
        if (this.vdr.itemBuhuanReqId == null) {
          this.idService.createItemdetail(this.vdr.vdrid, this.vdr.vdrname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'vendor')
            .subscribe(
              res => {
                this.vdr.itemBuhuanReqId = res;
                this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.vdr.itemBuhuanReqId);
        }
        break;
      case 'qita':
        if (this.vdr.itemQitaReqId == null) {
          this.idService.createItemdetail(this.vdr.vdrid, this.vdr.vdrname, name, JSON.parse(localStorage.getItem('currentUser'))['username'], 'vendor')
            .subscribe(
              res => {
                this.vdr.itemQitaReqId = res;
                this.vendorService.saveVdr(JSON.stringify(this.vdr)).subscribe(
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
          this.router.navigateByUrl('/home/itemform/' + this.vdr.itemQitaReqId);
        }
        break;
      default:
      //
    }

  }

}

export class Contact {
  constructor(public cname: string,
              public cphone: number) {
  }
}
