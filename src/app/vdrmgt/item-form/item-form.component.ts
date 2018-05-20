import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Itemdetail, ItemdetailService} from '../../service/itemdetail.service';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  public itemdetail: Itemdetail;
  public formGroup: FormGroup;

  constructor(private routeInfo: ActivatedRoute,
              private idService: ItemdetailService,
              private fb: FormBuilder,
              public validation: ValidationService,
              private router: Router) {
  }

  ngOnInit() {
    let id = this.routeInfo.snapshot.params['id'];
    this.formGroup = this.fb.group({
      matDengji: [''],
      matXingshi: [''],
      matJiaoqiang: [''],
      matGouzhi: [''],
      matFapiao: [''],
      matQita: [''],
      matQitaDesc: [''],
      carPresent: [''],
      carPresentCost: [''],
      carPresentDesc: [''],
      oriIdType: [''],
      oriIdDesc: [''],
      oriIdCost: [''],
      oriOtherCert: [''],
      oriOtherCertCost: [''],
      oriPresent: [''],
      oriPresentDesc: [''],
      oriPresentCost: [''],
      oriLisenceType: [''],
      oriLisenceDesc: [''],
      oriLisenceCost: [''],
      oriComments: [''],
      oriCost: [''],
      newIdType: [''],
      newIdDesc: [''],
      newIdCost: [''],
      newOtherCert: [''],
      newOtherCertCost: [''],
      newPresent: [''],
      newPresentDesc: [''],
      newPresentCost: [''],
      newLisenceType: [''],
      newLisenceDesc: [''],
      newLisenceCost: [''],
      newComments: [''],
      newCost: ['']
    });
    this.idService.getItemdetail(id).subscribe(
      res => {
        this.itemdetail = res;
        this.formGroup.reset({
          matDengji: this.itemdetail.matDengji,
          matXingshi: this.itemdetail.matXingshi,
          matJiaoqiang: this.itemdetail.matJiaoqiang,
          matGouzhi: this.itemdetail.matGouzhi,
          matFapiao: this.itemdetail.matFapiao,
          matQita: this.itemdetail.matQita,
          matQitaDesc: this.itemdetail.matQitaDesc,
          carPresent: this.itemdetail.carPresent,
          carPresentCost: this.itemdetail.carPresentCost,
          carPresentDesc: this.itemdetail.carPresentDesc,
          oriIdType: this.itemdetail.oriIdType,
          oriIdDesc: this.itemdetail.oriIdDesc,
          oriIdCost: this.itemdetail.oriIdCost,
          oriOtherCert: this.itemdetail.oriOtherCert,
          oriOtherCertCost: this.itemdetail.oriOtherCertCost,
          oriPresent: this.itemdetail.oriPresent,
          oriPresentDesc: this.itemdetail.oriPresentDesc,
          oriPresentCost: this.itemdetail.oriPresentCost,
          oriLisenceType: this.itemdetail.oriLisenceType,
          oriLisenceDesc: this.itemdetail.oriLisenceDesc,
          oriLisenceCost: this.itemdetail.oriLisenceCost,
          oriComments: this.itemdetail.oriComments,
          oriCost: this.itemdetail.oriCost,
          newIdType: this.itemdetail.newIdType,
          newIdDesc: this.itemdetail.newIdDesc,
          newIdCost: this.itemdetail.newIdCost,
          newOtherCert: this.itemdetail.newOtherCert,
          newOtherCertCost: this.itemdetail.newOtherCertCost,
          newPresent: this.itemdetail.newPresent,
          newPresentDesc: this.itemdetail.newPresentDesc,
          newPresentCost: this.itemdetail.newPresentCost,
          newLisenceType: this.itemdetail.newLisenceType,
          newLisenceDesc: this.itemdetail.newLisenceDesc,
          newLisenceCost: this.itemdetail.newLisenceCost,
          newComments: this.itemdetail.newComments,
          newCost: this.itemdetail.newCost
        });
      },
      err => {
        return err;
      });

  }

  save() {
    if (this.formGroup.valid) {
      this.itemdetail.matDengji = this.formGroup.get('matDengji').value;
      this.itemdetail.matXingshi = this.formGroup.get('matXingshi').value;
      this.itemdetail.matJiaoqiang = this.formGroup.get('matJiaoqiang').value;
      this.itemdetail.matGouzhi = this.formGroup.get('matGouzhi').value;
      this.itemdetail.matFapiao = this.formGroup.get('matFapiao').value;
      this.itemdetail.matQita = this.formGroup.get('matQita').value;
      this.itemdetail.matQitaDesc = this.formGroup.get('matQitaDesc').value;
      this.itemdetail.carPresent = this.formGroup.get('carPresent').value;
      this.itemdetail.carPresentCost = this.formGroup.get('carPresentCost').value;
      this.itemdetail.carPresentDesc = this.formGroup.get('carPresentDesc').value;
      this.itemdetail.oriIdType = this.formGroup.get('oriIdType').value;
      this.itemdetail.oriIdDesc = this.formGroup.get('oriIdDesc').value;
      this.itemdetail.oriIdCost = this.formGroup.get('oriIdCost').value;
      this.itemdetail.oriOtherCert = this.formGroup.get('oriOtherCert').value;
      this.itemdetail.oriOtherCertCost = this.formGroup.get('oriOtherCertCost').value;
      this.itemdetail.oriPresent = this.formGroup.get('oriPresent').value;
      this.itemdetail.oriPresentDesc = this.formGroup.get('oriPresentDesc').value;
      this.itemdetail.oriPresentCost = this.formGroup.get('oriPresentCost').value;
      this.itemdetail.oriLisenceType = this.formGroup.get('oriLisenceType').value;
      this.itemdetail.oriLisenceDesc = this.formGroup.get('oriLisenceDesc').value;
      this.itemdetail.oriLisenceCost = this.formGroup.get('oriLisenceCost').value;
      this.itemdetail.oriComments = this.formGroup.get('oriComments').value;
      this.itemdetail.oriCost = this.formGroup.get('oriCost').value;
      this.itemdetail.newIdType = this.formGroup.get('newIdType').value;
      this.itemdetail.newIdDesc = this.formGroup.get('newIdDesc').value;
      this.itemdetail.newIdCost = this.formGroup.get('newIdCost').value;
      this.itemdetail.newOtherCert = this.formGroup.get('newOtherCert').value;
      this.itemdetail.newOtherCertCost = this.formGroup.get('newOtherCertCost').value;
      this.itemdetail.newPresent = this.formGroup.get('newPresent').value;
      this.itemdetail.newPresentDesc = this.formGroup.get('newPresentDesc').value;
      this.itemdetail.newPresentCost = this.formGroup.get('newPresentCost').value;
      this.itemdetail.newLisenceType = this.formGroup.get('newLisenceType').value;
      this.itemdetail.newLisenceDesc = this.formGroup.get('newLisenceDesc').value;
      this.itemdetail.newLisenceCost = this.formGroup.get('newLisenceCost').value;
      this.itemdetail.newComments = this.formGroup.get('newComments').value;
      this.itemdetail.newCost = this.formGroup.get('newCost').value;
      console.log(this.itemdetail);
      this.idService.saveItemdetail(JSON.stringify(this.itemdetail)).subscribe(
        res => {
          alert('成功保存项目需求！');
          this.returnPre();
        },
        err => {
          alert('错误：' + err.message);
        }
      );
    } else {
      this.validation.validateAllFormFields(this.formGroup);
    }
  }

  cancel(){
    if(confirm('确定要返回？')) {
      this.returnPre();
    }
  }

  returnPre(){
    let path = this.itemdetail.relatedBillType;
    let id = this.itemdetail.relatedBillId;
    if (path === 'presale') {
      this.router.navigateByUrl('/home/presmgt/' + id);
    } else {
      this.router.navigateByUrl('/home/vdrmgt/' + id);
    }
  }
}
