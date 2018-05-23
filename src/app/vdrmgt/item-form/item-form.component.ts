import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Itemdetail, ItemdetailService} from '../../service/itemdetail.service';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';


declare var $: any;

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
    const initialPreview = new Array();
    const initialPreviewConfig  = new Array();
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
      newCost: [''],
      oriSampleVideoPath: [''],
      oriSampleImagePath: [''],
      oriSampleCertPath: [''],
      newSampleVideoPath: [''],
      newSampleImagePath: [''],
      newSampleCertPath: ['']
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
          newCost: this.itemdetail.newCost,
          oriSampleVideoPath: this.itemdetail.oriSampleVideoPath,
          oriSampleImagePath: this.itemdetail.oriSampleImagePath,
          oriSampleCertPath: this.itemdetail.oriSampleCertPath,
          newSampleVideoPath: this.itemdetail.newSampleVideoPath,
          newSampleImagePath: this.itemdetail.newSampleImagePath,
          newSampleCertPath: this.itemdetail.newSampleCertPath
        });
        let paths ;
        if (this.itemdetail.oriSampleVideoPath != null) {
          paths = this.itemdetail.oriSampleVideoPath.split(',');
          paths.forEach(function(path, i) {
            console.log(path);
            const realDomainPath =  path;
            console.log(realDomainPath);
            initialPreview.push(realDomainPath);
            const showName = path.substring(path.lastIndexOf('/') + 1);
            console.log(showName);
            initialPreviewConfig.push({caption: '样板视频', downloadUrl: realDomainPath ,  key: i });
          });
        }
        this.initVideoFileUpload('oriSampleVideoPath', initialPreview, initialPreviewConfig);


        if ( this.itemdetail.oriSampleImagePath !=null ) {
          paths = this.itemdetail.oriSampleImagePath.split(',');
          paths.forEach(function(path, i) {
            console.log(path);
            const realDomainPath =  path;
            console.log(realDomainPath);
            initialPreview.push(realDomainPath);
            const showName = path.substring(path.lastIndexOf('/') + 1);
            console.log(showName);
            initialPreviewConfig.push({caption: '样板图片', downloadUrl: realDomainPath ,  key: i });
          });
        }
        this.initImageFileUpload('oriSampleImagePath', initialPreview, initialPreviewConfig);

        if ( this.itemdetail.oriSampleCertPath != null) {
          paths = this.itemdetail.oriSampleCertPath.split(',');
          paths.forEach(function(path, i) {
            console.log(path);
            const realDomainPath =  path;
            console.log(realDomainPath);
            initialPreview.push(realDomainPath);
            const showName = path.substring(path.lastIndexOf('/') + 1);
            console.log(showName);
            initialPreviewConfig.push({caption: '样板公证书', downloadUrl: realDomainPath ,  key: i });
          });
        }
        this.initImageFileUpload('oriSampleCertPath', initialPreview, initialPreviewConfig);

        if ( this.itemdetail.newSampleVideoPath != null) {
          paths = this.itemdetail.newSampleVideoPath.split(',');
          paths.forEach(function(path, i) {
            console.log(path);
            const realDomainPath =  path;
            console.log(realDomainPath);
            initialPreview.push(realDomainPath);
            const showName = path.substring(path.lastIndexOf('/') + 1);
            console.log(showName);
            initialPreviewConfig.push({caption: '样板视频', downloadUrl: realDomainPath ,  key: i });
          });
        }
        this.initVideoFileUpload('newSampleVideoPath', initialPreview, initialPreviewConfig);

        if ( this.itemdetail.newSampleImagePath != null ) {
          paths = this.itemdetail.newSampleImagePath.split(',');
          paths.forEach(function(path, i) {
            console.log(path);
            const realDomainPath =  path;
            console.log(realDomainPath);
            initialPreview.push(realDomainPath);
            const showName = path.substring(path.lastIndexOf('/') + 1);
            console.log(showName);
            initialPreviewConfig.push({caption: '样板图片', downloadUrl: realDomainPath ,  key: i });
          });
        }
        this.initImageFileUpload('newSampleImagePath', initialPreview, initialPreviewConfig);

        if ( this.itemdetail.newSampleCertPath != null  ){
          paths = this.itemdetail.newSampleCertPath.split(',');
          paths.forEach(function(path, i) {
            console.log(path);
            const realDomainPath =  path;
            console.log(realDomainPath);
            initialPreview.push(realDomainPath);
            const showName = path.substring(path.lastIndexOf('/') + 1);
            console.log(showName);
            initialPreviewConfig.push({caption: '样板公证书', downloadUrl: realDomainPath ,  key: i });
          });
        }
        this.initImageFileUpload('newSampleCertPath', initialPreview, initialPreviewConfig);
      },
      err => {
        return err;
      });
      this.initVideoFileUpload('oriSampleVideoPath', initialPreview, initialPreviewConfig);
      this.initImageFileUpload('oriSampleImagePath', initialPreview, initialPreviewConfig);
      this.initImageFileUpload('oriSampleCertPath', initialPreview, initialPreviewConfig);
      this.initVideoFileUpload('newSampleVideoPath', initialPreview, initialPreviewConfig);
      this.initImageFileUpload('newSampleImagePath', initialPreview, initialPreviewConfig);
      this.initImageFileUpload('newSampleCertPath', initialPreview, initialPreviewConfig);
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
      this.itemdetail.oriSampleVideoPath = this.formGroup.get('oriSampleVideoPath').value;
      this.itemdetail.oriSampleImagePath = this.formGroup.get('oriSampleVideoPath').value;
      this.itemdetail.oriSampleCertPath = this.formGroup.get('oriSampleVideoPath').value;
      this.itemdetail.newSampleVideoPath = this.formGroup.get('oriSampleVideoPath').value;
      this.itemdetail.newSampleImagePath = this.formGroup.get('oriSampleVideoPath').value;
      this.itemdetail.newSampleCertPath = this.formGroup.get('oriSampleVideoPath').value;
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

  initVideoFileUpload(id , initialPreview, initialPreviewConfig) {
    const _formModel = this.formGroup;
    const fileUpload = $('#' + id + 'Upload').fileinput({
      theme: 'fa',
      language: 'zh',
      allowedPreviewTypes : [ 'video' ],
      allowedFileExtensions : ['mp4', 'avi', 'mov', 'wmv', 'asf', 'navi', '3gp', 'mkv', 'f4v', 'rmvb', 'webm'],
      uploadUrl: '/api/upload',
      uploadAsync: false,
      initialPreviewAsData: true,
      initialPreviewFileType: 'image',
      initialPreview: initialPreview ,
      initialPreviewConfig: initialPreviewConfig ,
      uploadExtraData: {
        moduleName: 'user'
      }
    }).on('filebatchselected', function(event, files) {
      fileUpload.fileinput('upload');
    }).on('filebatchuploadsuccess', function(event, data, previewId, index) {
      console.log(data.response);
      this.result = data.response;
      if (this.result.code == 0) {
        const relativeStorePath =  $('#' + id).val() ;
        console.log(relativeStorePath);
        if (relativeStorePath != '' ) {
          _formModel.get(id).setValue(relativeStorePath + ',' + this.result.data.relativeStorePath);
        } else {
          _formModel.get(id).setValue(this.result.data.relativeStorePath);
        }
      }
    });
  }
  initImageFileUpload(id , initialPreview, initialPreviewConfig) {
    const _formModel = this.formGroup;
    const fileUpload = $('#' + id + 'Upload').fileinput({
      theme: 'fa',
      language: 'zh',
      allowedPreviewTypes : [ 'image' ],
      allowedFileExtensions : ['jpg', 'png', 'gif'],
      uploadUrl: '/api/upload',
      uploadAsync: false,
      initialPreviewAsData: true,
      initialPreviewFileType: 'image',
      initialPreview: initialPreview ,
      initialPreviewConfig: initialPreviewConfig ,
      uploadExtraData: {
        moduleName: 'user'
      }
    }).on('filebatchselected', function(event, files) {
      fileUpload.fileinput('upload');
    }).on('filebatchuploadsuccess', function(event, data, previewId, index) {
      console.log(data.response);
      this.result = data.response;
      if (this.result.code == 0) {
        const relativeStorePath =  $('#' + id).val() ;
        console.log(relativeStorePath);
        if (relativeStorePath != '' ) {
          _formModel.get(id).setValue(relativeStorePath + ',' + this.result.data.relativeStorePath);
        } else {
          _formModel.get(id).setValue(this.result.data.relativeStorePath);
        }
      }
    });
  }

}
