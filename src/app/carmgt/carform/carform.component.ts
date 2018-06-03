import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Car, CarService} from "../../service/car.service";
import {carnumValidator, mobileValidator} from "../../shared/validators/Validators";
import {ValidationService} from "../../shared/services/validation.service";
import {DateService} from '../../shared/services/date.service';
import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-carform',
  templateUrl: './carform.component.html',
  styleUrls: ['./carform.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class CarformComponent implements OnInit {
  private fb: FormBuilder = new FormBuilder();
  public formGroup: FormGroup;
  carid: number;
  car: Car;
  brand: Observable<string>;
  set: Observable<string>;
  model;

  constructor(private router: Router,
              private carService: CarService,
              public validation: ValidationService,
              private routeInfo: ActivatedRoute,
              private dateService: DateService) {
  }

  ngOnInit() {
    this.brand = this.carService.getBrand();
    this.carid = this.routeInfo.snapshot.params['id'];
    this.formGroup = this.fb.group({
      carnum: ['', [Validators.required, carnumValidator]],
      carbrand: ['', Validators.required],
      carset: ['', Validators.required],
      firstdate: ['', Validators.required]
    });
    this.formGroup.get('firstdate').valueChanges.subscribe(res=>{
      console.dir(res);
    });

    if (this.carid != 0) {
      this.carService.getCar(this.carid).subscribe(
        data => {
          this.car = data;
          console.log(data);
          this.showSet(data.carbrand);
          this.set = this.carService.getSubBrand(data.carbrand);
          this.formGroup.reset({
            carnum: data.carnum,
            carbrand: data.carbrand,
            carset: data.carset,
            firstdate: this.dateService.ngDateFmt(data.firstdate)
          });
        },
        err => {
          console.log(err);
          return err;
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/home/carmgt');
  }

  save() {
    if (this.formGroup.valid) {
      let model = this.formGroup.value['firstdate'];
      if (this.car == null) {
        this.car = new Car(null,
          this.formGroup.value['carnum'],
          this.formGroup.value['carbrand'],
          this.formGroup.value['carset'],
          model.year+'-'+model.month+model.day,
          new Date().toLocaleString(),
          JSON.parse(localStorage.getItem('currentUser'))['username'],
          null,
          null,
          null
        );
        console.log('新建车辆：');
        console.log(this.car);
        this.carService.saveCar(JSON.stringify(this.car)).subscribe(
          res => {
            // console.log(res);
            alert('车辆创建成功： '+this.car.carnum);
            this.router.navigateByUrl('/home/carmgt');
          },
          err => {
            console.log('错误信息：'+err.message);
            if(err.message.indexOf('carnum_UNIQUE')!= -1){
              alert('创建失败，车架号已存在');
              this.car = null;
            }
          }
        );
      } else{
        // update user
        this.car.carnum = this.formGroup.value['carnum'];
        this.car.carbrand = this.formGroup.value['carbrand'];
        this.car.carset = this.formGroup.value['carset'];
        this.car.firstdate = model.year+'-'+model.month+model.day;
        console.log('更新车辆：'+this.car.carnum);
        this.carService.saveCar(JSON.stringify(this.car)).subscribe(
          res => {
            console.log(res);
            alert('车辆更新成功： '+this.car.carnum);
            this.router.navigateByUrl('/home/carmgt');
          },
          err => {
            console.log(err);
            if(err.message.indexOf('carnum_UNIQUE')!=-1){
              alert('更新失败，车架号已存在');
              this.car = null;
            }
          }
        );
      }
    } else {
      this.validation.validateAllFormFields(this.formGroup);
    }
  }

  showSet(item: any) {
    let p:string;
    if(typeof item == 'string' ){
      p = item
    }else{
      p = item.target.value;
    }
    this.set = this.carService.getSubBrand(p);
  }
}
