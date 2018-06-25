import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AddrSelectService, Area, City, Province} from '../../shared/services/addr-select.service';
import {Vendor, VendorService} from '../../service/vendor.service';
import {Order, OrderService} from '../../service/order.service';
import {Customer, CustomerService} from '../../service/customer.service';
import {DateService} from '../../shared/services/date.service';
import {Router} from '@angular/router';
import {CarService} from '../../service/car.service';
import {DialogOrderAssign} from '../orderform/orderform.component';
import {User, UserServiceService} from '../../service/user-service.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-odrmgt-saved',
  templateUrl: './odrmgt-saved.component.html',
  styleUrls: ['./odrmgt-saved.component.css']
})
export class OdrmgtSavedComponent implements OnInit {
  public odrs: Order[];
  // private nameFilter: FormControl = new FormControl();
  // private keyWord: string;
  public formGroup: FormGroup;
  public customers: Observable<Customer[]>;
  brand: Observable<string>;
  set: Observable<string>;
  public users: User[];
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
              private odrService: OrderService,
              private addrService: AddrSelectService,
              private date: DateService,
              private fb: FormBuilder,
              private carService: CarService,
              private cusService: CustomerService,
              private orderService: OrderService,
              public dialog: MatDialog,
              private userService: UserServiceService) {
    this.formGroup = this.fb.group({
      orderid: [''],
      carplate1: [''],
      carplate2: [''],
      carplatenum: [''],
      oriownername: [''],
      carbrand: [''],
      carset: [''],
      carnum: [''],
      cusname: [''],
      cusmode: [''],
      kuaidinum: [''],
      creator: [''],
      assignee:[''],
      itemlist: this.fb.array([])
    });
  }

  ngOnInit() {
    this.brand = this.carService.getBrand();
    this.userService.getAllUsers().subscribe(res=>{
      this.users = res;
    });
    this.formGroup.get('cusmode').valueChanges.subscribe(
      res => {
        this.customers = this.cusService.getCusByMode(res);
      }
    );
    this.formGroup.setControl('itemlist', this.initItemList());
    this.search();
  }

  search() {
    console.dir(this.formGroup.value);
    this.odrService.getOdrs(this.formGroup.value).subscribe(
      res => {
        console.dir(res);
        if (res == null) {
          this.odrs.length = 0;
        } else {
          this.odrs = res;
        }
      },
      err => {
        alert('错误:' + err.message);
      });
  }

  showSet(item: any) {
    let p: string;
    if (typeof item == 'string') {
      p = item;
    } else {
      p = item.target.value;
    }
    this.set = this.carService.getSubBrand(p);
  }

  edit(id:any){
    this.router.navigateByUrl('/home/orderform/'+id);
  }

  receive(v:any){
    if(v.add1 == '已寄出'){
      if(confirm('确认签收？')){
        this.orderService.updateOdrPreBuz(v.orderid).subscribe(res=>{
          alert('状态修改成功！');
          this.orderService.getOdr(v.orderid).subscribe(res => {
            // this.order = res;
          });
        });
      }
    }else{
      alert('未达到签收条件或者已经签收！');
    }
  }

  assign(v:any){
    if(v.state=='待补全' || v.state == '待提交') {
      if (v.add1 == '已寄出') {
        // 进行分单
        // 状态流转至待提交
        let dialogRef = this.dialog.open(DialogOrderAssign, {
          width: '450px',
          height: '350px',
          data: {
            users: this.users
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if (result == undefined) {
            alert('未选择业务员');
          } else {
            this.orderService.orderAssign(v.orderid, result.userid, result.username).subscribe(res => {
              alert('分配成功，业务员为：' + result.username);
              this.orderService.getOdr(v.orderid).subscribe(res => {
              });
            });
          }
        });
      } else {
        alert('请先将快递寄出！');
      }
    }
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
}
