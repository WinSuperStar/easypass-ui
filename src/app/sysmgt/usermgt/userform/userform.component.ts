import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  chineseValidator, mobileUniqueValidator, mobileValidator, passwordValidator,
  passwordValidatorLength
} from '../../../shared/validators/Validators';
import {ValidationService} from '../../../shared/services/validation.service';
import {User, UserServiceService} from "../../../service/user-service.service";
import {Role, RoleService} from "../../../service/role.service";
import {Observable} from "rxjs/Observable";
import {Result} from "../../../service/result.service";

declare var bootbox:any;

declare var $: any;

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  public formModel: FormGroup;
  public user: User;
  public result: Result;
  // public confirmDialog;
  public userid: number;
  public roles: Observable<Role[]>;
  constructor(private routeInfo: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              public validation: ValidationService,
              private userService: UserServiceService,
              private roleService: RoleService) {

  }


  ngOnInit() {

    this.roles = this.roleService.getRoles();
    this.userid = this.routeInfo.snapshot.params['id'];
    this.formModel = this.fb.group({
      userName: ['', [Validators.required, chineseValidator]],
      phone: ['', [Validators.required, mobileValidator], mobileUniqueValidator],
      passwordInfo: this.fb.group({
        password: ['', [Validators.required, passwordValidatorLength]],
        passwordConfirm: ['', Validators.required]
      }, {validator: passwordValidator}),
      position: ['', Validators.required],
      gender: ['女'],
      state: ['失效'],
      certpath: ['']
    });

    const initialPreview = new Array();
    const initialPreviewConfig  = new Array();
    if (this.userid != 0) {
      this.userService.getUser(this.userid).subscribe(
        data => {
          this.user = data;
          this.formModel.reset({
            userName: data.username,
            phone: data.phone,
            passwordInfo: {
              password: data.password,
              passwordConfirm: data.password
            },
            position: data.roleid,
            gender: data.gender,
            state: data.state,
            certpath: data.certpath
          });
          const paths = this.user.certpath.split(',');
          paths.forEach(function(path, i) {
            console.log(path);
            // const realDomainPath =  'D:/data/files' + path;
            const realDomainPath = 'http://a.hiphotos.baidu.com/image/pic/item/10dfa9ec8a136327f216788d9d8fa0ec09fac791.jpg';
            console.log(realDomainPath);
            initialPreview.push(realDomainPath);
            const showName = path.substring(path.lastIndexOf('/') + 1);
            console.log(showName);
            initialPreviewConfig.push({caption: '证件照', downloadUrl: realDomainPath ,  key: i });
          })
          this.initFileUpload( initialPreview , initialPreviewConfig );
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.initFileUpload(initialPreview , initialPreviewConfig);
    }
    this.canEdit();
  }

  initFileUpload(initialPreview, initialPreviewConfig) {
    const _formModel = this.formModel;
    $('#userCertUpload').fileinput({
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
      $('#userCertUpload').fileinput('upload');
    }).on('filebatchuploadsuccess', function(event, data, previewId, index) {
      console.log(data.response);
      this.result = data.response;
      if (this.result.code == 0) {
        const relativeStorePath =  $('#certpath').val() ;
        console.log(relativeStorePath);
        if (relativeStorePath != '' ) {

          _formModel.get('certpath').setValue(relativeStorePath + ',' + this.result.data.relativeStorePath);
          // $('#certpath').val(relativeStorePath + ',' + this.result.data.relativeStorePath);
          // user.certpath = relativeStorePath + ',' + this.result.data.relativeStorePath ;
        } else {
          // $('#certpath').val(this.result.data.relativeStorePath);
          _formModel.get('certpath').setValue(this.result.data.relativeStorePath);
          // user.certpath = this.result.data.relativeStorePath;

        }
      }

    });
  }
  canEdit() {
    let roleid = JSON.parse(localStorage.getItem('currentUser'))['roleid'];
    if(roleid!=18){
       $("#userName").attr("readonly","readonly");
       $("#position").attr("disabled","disabled");
       $("#womanGender").attr("disabled","disabled");
       $("#activeState").attr("disabled","disabled");
    }

  }




  cancel() {
    let c = confirm('确定要返回？');
    if(c == true) {
      this.router.navigateByUrl('/home/usermgt');
    }
  }

  createUser() {
    console.log(this.formModel.value);
    console.log(this.formModel.errors);
  }

  save() {
    if (this.formModel.valid) {
      console.log('form submitted');
      if (this.user == null) {
        console.log('url:' + this.formModel.value['certpath']);
        this.user = new User(null,
          this.formModel.value['userName'],
          this.formModel.controls['passwordInfo'].value['password'],
          this.formModel.value['gender'],
          this.formModel.value['state'],
          this.formModel.value['phone'],
          this.formModel.value['certpath'],
          0,
          null,
          JSON.parse(localStorage.getItem('currentUser'))['username'],
          '',
          '',
          '',
          this.formModel.value['position'],
        );
        console.log('新建用户：');
        console.log(this.user);
        this.userService.addUser(this.user).subscribe(
          res => {
            console.log(res);
            // 告诉用户创建成功或者失败
            alert('用户创建成功： ' + this.user.username);
            this.router.navigateByUrl('/home/usermgt');
          },
          err => {
            console.log(err);
            if(err.message.indexOf('phone_UNIQUE')){
              alert('创建失败，手机号码已存在');
              this.user = null;
            }
          }
        );
      } else {
        // update user
        this.user.username = this.formModel.value['userName'];
        this.user.phone = this.formModel.value['phone'];
        this.user.password = this.formModel.controls['passwordInfo'].value['password'];
        this.user.roleid = this.formModel.value['position'];
        this.user.gender = this.formModel.value['gender'];
        this.user.state = this.formModel.value['state'];
        this.user.certpath = this.formModel.value['certpath'];
        console.log('更新用户：');
        console.log(this.user);
        this.userService.updateUser(this.user).subscribe(
          res => {
            console.log(res);
            // 告诉用户创建成功或者失败
            alert('用户更新成功： ' + this.user.username);
            this.router.navigateByUrl('/home/usermgt');
          },
          err => {
            console.log(err);
            if (err.message.indexOf('phone_UNIQUE') !== -1 ) {
              alert('更新失败，手机号码已存在');
              this.user = null;
            }
          }
        );
      }
    } else {
      this.validation.validateAllFormFields(this.formModel);
    }
  }

  fileuploaderFileChange(files: FileList) {

  }

}
