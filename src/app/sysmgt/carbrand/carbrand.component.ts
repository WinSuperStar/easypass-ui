import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Carinfo, CarService} from '../../service/car.service';
import {ValidationService} from '../../shared/services/validation.service';
import {Observable} from 'rxjs/Observable';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogOrderAssign} from '../../order/orderform/orderform.component';

@Component({
  selector: 'app-carbrand',
  templateUrl: './carbrand.component.html',
  styleUrls: ['./carbrand.component.css']
})
export class CarbrandComponent implements OnInit {
  public formGroup: FormGroup;
  public formGroup2: FormGroup;
  public carinfos: Carinfo[];
  public carinfo: Carinfo;

  constructor(private carService: CarService,
              private fb: FormBuilder,
              public validation: ValidationService,
              public dialog: MatDialog,) {
    this.formGroup = this.fb.group({
      brand: ['', Validators.required],
      set: ['', Validators.required]
    });
    this.formGroup2 = this.fb.group({
      carbrand: [''],
      carset: ['']
    });
  }

  ngOnInit() {
  }

  search() {
    this.carService.getCarinfos(this.formGroup2.value['carbrand'], this.formGroup2.value['carset']).subscribe(res => {
      if (res == null) {
        this.carinfos.length = 0;
      } else {
        this.carinfos = res;
      }
    });
  }

  edit(carinfo: any) {
    this.carService.getCarinfo(carinfo.infoid).subscribe(res=>{
      this.carinfo = res;
      let dialogRef = this.dialog.open(DialogCarinfo, {
        width: '450px',
        height: '350px',
        data: {
          carinfo: this.carinfo
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == undefined) {
          // console.dir(result);
        } else {
          console.dir(result);
          this.carService.updateCarinfo(result.infoid, result.brand, result.subbrand).subscribe(res=>{
            alert('保存成功！');
            this.search();
          });
        }
      });
    });
  }

  delete(id: any) {
  }


  create() {
    this.carService.addBrandInfo(this.formGroup.get('brand').value, this.formGroup.get('set').value).subscribe(
      res => {
        alert('信息保存成功！');
      }, err => {
        alert('错误：' + err.error.message);
      }
    );
  }
}

@Component({
  selector: 'dialog-carinfo',
  templateUrl: 'dialog-carinfo.html',
})
export class DialogCarinfo {
  carinfo: Carinfo;

  constructor(public dialogRef: MatDialogRef<DialogCarinfo>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
