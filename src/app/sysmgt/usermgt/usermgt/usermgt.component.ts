import {ChangeDetectorRef, Component, ElementRef, OnInit, AfterViewInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {User, UserServiceService} from '../../../service/user-service.service';
import {DateService} from '../../../shared/services/date.service';
import {Role, RoleService} from '../../../service/role.service';

declare var $: any;

let usermgtDatatable;

@Component({
  selector: 'app-usermgt',
  templateUrl: './usermgt.component.html',
  styleUrls: ['./usermgt.component.css']
})
export class UsermgtComponent implements OnInit {

  public formGroup: FormGroup;
  public users: User[];
  public roles: Observable<Role[]>;

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserServiceService,
              public date: DateService,
              private roleService: RoleService,
              private elementRef: ElementRef,
              private ref: ChangeDetectorRef) {
    this.formGroup = fb.group({
      username: [''],
      phone: [''],
      roleid: [''],
      state: ['']
    });
  }

  ngOnInit() {
    this.roles = this.roleService.getRoles();
    // this.init(this.formGroup.value);
    this.search(this.formGroup.value);
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     console.dir(usermgtDatatable);
  //   }, 5000);
  // }


  // ngAfterViewInit() {
  ngOnChanges() {
    // setTimeout(() => { // 此处需要使用箭头函数哈，你懂的...
    //   let a = this.elementRef.nativeElement.querySelectorAll('.btn-warning');
    //   // a.map(aa=>{
    //   //   aa.addEventListener('click', this.edit.bind(this));
    //   // });
    //   for(let i=0;i<a.length;i++){
    //     console.dir(a[i]);
    //     a[i].addEventListener('click', this.edit.bind(this));
    //   }
    // }, 0);
  }


  create() {
    this.router.navigateByUrl('/home/userform/0');
  }

  search(value: any) {
    // usermgtDatatable.ajax.reload();
    this.userService.getUsers(value).subscribe(res=>{
      if(res == null){
        this.users.length = 0;
      }else{
        this.users = res;
      }
    });
  }

  edit(a: any) {
    // console.log(userid);
    console.log(a);
    this.router.navigateByUrl('/home/userform/' + a);
  }

  // init(value: any) {
  //   const date = this.date;
  //   const comp = this;
  //   if (usermgtDatatable) {
  //     usermgtDatatable.ajax.reload();
  //   }
  //   usermgtDatatable = $('#usermgtTable').DataTable({
  //     'processing': true,
  //     'serverSide': true,
  //     'paging': true,
  //     lengthMenu: [
  //       [10, 20, 30, 50, 80, 100],
  //       ['10 页', '20 页', '30 页', '50 页', '80 页', '100页']
  //     ],
  //     ordering: false,
  //     'ajax': {
  //       'url': '/api/users',
  //       'type': 'POST',
  //       'data': function (d) {
  //         for (const key in d) {
  //           if (key.indexOf('columns') == 0 || key.indexOf('order') == 0 || key.indexOf('search') == 0) {
  //             delete d[key];
  //           }
  //         }
  //         const username = $('#username').val();
  //         const phone = $('#phone').val();
  //         const roleid = $('#roleid').val();
  //         const state = $('#state').val();
  //         const searchParams = {username: username, phone: phone, roleid: roleid, state: state};
  //         if (searchParams) {
  //           $.extend(d, searchParams);
  //         }
  //       },
  //       'dataType': 'json'
  //     },
  //
  //     'searching': false,
  //     'columns': [
  //       {'data': 'userid'},
  //       {'data': 'username'},
  //       {'data': 'gender'},
  //       {'data': 'phone'},
  //       {'data': 'rolename'},
  //       {'data': 'password'},
  //       {
  //         'data': 'createdate',
  //         'render': function (data, type, row) {
  //           data = date.dateFmt(data);
  //           return data;
  //         }
  //       }
  //     ],
  //     'columnDefs': [
  //       {
  //         'render': function (data, type, row) {
  //           console.log(row);
  //           const userid = row.userid;
  //           return '<a class="btn btn-warning btn-xs" value="' + userid + '" ><span class="glyphicon glyphicon-pencil" ></span>编辑</a>';
  //         },
  //         'targets': 7
  //       },
  //     ],
  //     'info': true,
  //     'autoWidth': false,
  //     'oLanguage': {
  //       'sProcessing': '正在获取数据，请稍后...',
  //       'sLengthMenu': '显示 _MENU_ 条',
  //       'sZeroRecords': '没有您要搜索的内容',
  //       'sInfo': '从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条',
  //       'sInfoEmpty': '记录数为0',
  //       'sInfoFiltered': '(全部记录数 _MAX_ 条)',
  //       'sInfoPostFix': '',
  //       'sSearch': '搜索',
  //       'sUrl': '',
  //       'oPaginate': {
  //         'sFirst': '第一页',
  //         'sPrevious': '上一页',
  //         'sNext': '下一页',
  //         'sLast': '最后一页'
  //       }
  //     }
  //   });
  //   setTimeout(() => { // 此处需要使用箭头函数哈，你懂的...
  //     let a = this.elementRef.nativeElement.querySelectorAll('.btn-warning');
  //     // a.map(aa=>{
  //     //   aa.addEventListener('click', this.edit.bind(this));
  //     // });
  //     for(let i=0;i<a.length;i++){
  //       console.dir(a[i]);
  //       a[i].addEventListener('click', this.edit.bind(this));
  //     }
  //   }, 0);
  //   // this.users = this.userService.getUsers(value);
  // }

}
