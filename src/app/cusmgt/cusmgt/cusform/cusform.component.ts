import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer, CustomerService} from "../../../service/customer.service";
import {ValidationService} from "../../../shared/services/validation.service";
import {mobileUniqueValidator, mobileValidator} from "../../../shared/validators/Validators";
import {AddrSelectService, Area, City, Province} from "../../../shared/services/addr-select.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-cusform',
  templateUrl: './cusform.component.html',
  styleUrls: ['./cusform.component.css']
})
export class CusformComponent implements OnInit {
  private fb: FormBuilder = new FormBuilder();
  public formGroup: FormGroup;
  public cusid;
  public cus: Customer;
  public city: Observable<City[]>;
  public area: Observable<Area[]>;
  public province: Observable<Province[]>;

  constructor(private router: Router,
              private routeInfo: ActivatedRoute,
              private cusService: CustomerService,
              public validation: ValidationService,
              private addrService: AddrSelectService) {
  }

  ngOnInit() {
    this.province = this.addrService.getPros();
    this.cusid = this.routeInfo.snapshot.params['id'];
    this.formGroup = this.fb.group({
      cusname: ['', Validators.required],
      contact: ['', Validators.required],
      contactPhone: ['', [Validators.required, mobileValidator]],
      cusmode: ['', Validators.required],
      province: [''],
      state: ['正常',Validators.required],
      city: [''],
      area: [''],
      add1:['']
    });
    if (this.cusid != 0) {
      this.cusService.getCustomer(this.cusid).subscribe(
        data => {
          this.cus = data;
          let u = this.cus.address.split(' ');
          this.showCity(u[0]);
          this.showArea(u[1]);
          this.formGroup.reset({
            cusname: data.cusname,
            cusmode: data.cusmode,
            contact: data.contact,
            contactPhone: data.contactPhone,
            province: u[0],
            city: u[1],
            area: u[2],
            add1: data.add1,
            state:data.state
          })
        }
      );
    }
  }

  // addContact() {
  //   let contacts = this.formGroup.get('contacts') as FormArray;
  //   contacts.push(new FormControl());
  // }

  cancel() {
    this.router.navigateByUrl('/home/cusmgt');
  }

  save() {
    if (this.formGroup.valid) {
      //新建
      if (this.cus == null) {
        this.cus = new Customer(
          null,
          this.formGroup.value['cusname'],
          this.formGroup.value['contact'],
          this.formGroup.value['contactPhone'],
          this.formGroup.value['cusmode'],
          this.formGroup.value['province'] + ' ' + this.formGroup.value['city'] + ' ' + this.formGroup.value['area'],
          this.formGroup.value['state'],
          null,
          JSON.parse(localStorage.getItem('currentUser'))['username'],
          this.formGroup.value['add1'],
          null,
          null
        )
        this.cusService.addCus(this.cus).subscribe(
          res => {
            alert('客户创建成功： ' + this.cus.cusname);
            this.router.navigateByUrl('/home/cusmgt');
          },
          err => {
            // console.log('错误信息是：'+err.error.message);
            if(err.error.message.indexOf('contact_phone_UNIQUE')!=-1){
              alert('创建失败，手机号码已存在');
            } else {
              alert('创建失败: ' + err.message)
            }
            this.cus = null;
          }
        )
      } else {
        this.cus.cusname = this.formGroup.value['cusname'];
        this.cus.contact = this.formGroup.value['contact'];
        this.cus.contactPhone = this.formGroup.value['contactPhone'];
        this.cus.cusmode = this.formGroup.value['cusmode'];
        this.cus.add1 = this.formGroup.value['add1'];
        this.cus.address = this.formGroup.value['province'] + ' ' + this.formGroup.value['city'] + ' ' + this.formGroup.value['area'];
        this.cus.state = this.formGroup.value['state'];
        console.log(this.cus);
        this.cusService.updateCustomer(this.cus).subscribe(
          res => {
            // 告诉岗位创建成功或者失败
            alert('客户更新成功： ' + this.cus.cusname);
            this.router.navigateByUrl('/home/cusmgt');
          },
          err => {
            alert('更新失败: ' + err.message)
            this.cus = null;
          }
        )
      }
    } else {
      this.validation.validateAllFormFields(this.formGroup);
    }
  }

  showCity(item) {
    let p:string;
    if(typeof item == 'string' ){
      p = item
    }else{
      p = item.target.value;
    }
    console.log(p);
    // this.addrService.getProCode(p).subscribe(
    //   res => {
    //     this.formGroup.get('vdrplate1').setValue(res);
    //   }
    // );
    this.city = this.addrService.getCities(p);
    // this.formGroup.get('vdraddr3').reset();
    this.area = this.addrService.getAreas('');
  }

  showArea(item) {
    let c:string;
    if(typeof item == 'string' ){
      c = item
    }else{
      c = item.target.value;
    }
    // this.addrService.getShotCode(c).subscribe(
    //   res => {
    //     if (res == '' || res == null) {
    //       // this.formGroup.get('vdrplate2').enable();
    //     } else {
    //       // this.formGroup.get('vdrplate2').disable();
    //       this.formGroup.get('vdrplate2').setValue(res);
    //     }
    //   }
    // );
    this.area = this.addrService.getAreas(c);
  }
}
