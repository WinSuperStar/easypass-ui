import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {User, UserServiceService} from "../../../service/user-service.service";
import {DateService} from "../../../shared/services/date.service";
import {Role, RoleService} from "../../../service/role.service";

declare var $: any;

@Component({
  selector: 'app-usermgt',
  templateUrl: './usermgt.component.html',
  styleUrls: ['./usermgt.component.css']
})
export class UsermgtComponent implements OnInit {

  public formGroup: FormGroup;
  public users: Observable<User[]>;
  public roles: Observable<Role[]>;


  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserServiceService,
              private date: DateService,
              private roleService: RoleService
  ) {
    this.formGroup = fb.group({
      username: [''],
      phone: [''],
      roleid: [''],
      state: ['']
    });
  }

  ngOnInit(){
    this.roles = this.roleService.getRoles();
    const date = this.date;
    $('#usermgtTable').DataTable({

      'processing': true,
      'serverSide': true,
      'paging': true,
      lengthMenu: [
        [ 10 , 20 , 30, 50, 80, 100 ],
        [ '10 页', '20 页', '30 页', '50 页', '80 页', '100页' ]
      ],
      ordering: false,
      'ajax': {
        'url': '/api/userPage',
        'type': 'POST',
        'data': function (d) {
          for (const key in d) {
            if (key.indexOf('columns') == 0 || key.indexOf('order') == 0 || key.indexOf('search') == 0 ) {
              delete d[key];
            }
          }
          const searchParams = {};
          if (searchParams) {
            $.extend( d, searchParams );
          }
        },
        'dataType' : 'json',
        'dataFilter': function (json) {
          console.log(json)
          json = JSON.parse(json);
          console.log(json);
          return JSON.stringify(json);
        }
      },

      'searching': false,
      'columns': [
        { 'data': 'userid' },
        { 'data': 'username' },
        { 'data': 'gender' },
        { 'data': 'phone' },
        { 'data': 'roleid' },
        { 'data': 'password' },
        { 'data': 'createdate',
          'render': function ( data, type, row ) {
            data = date.dateFmt(data);
            return data;
          }}
      ],
      "columnDefs": [
        {
          "render": function ( data, type, row ) {

           // const u = us.getUser(row.userid);
           // console.log("xinxishi:"+u);
            return '<a class="btn btn-warning btn-xs"  click="edit(u)" ><span class="glyphicon glyphicon-pencil" ></span>编辑</a>';
          },
          "targets": 7
        },
      ],
      'columns': [
        { 'data': 'userid' },
        { 'data': 'username' },
        { 'data': 'gender' },
        { 'data': 'phone' },
        { 'data': 'roleid' },
        { 'data': 'password' },
        { 'data': 'createdate',
          'render': function ( data, type, row ) {
            data = date.dateFmt(data);
            return data;
          }}
      ],
      "columnDefs": [
        {
          "render": function ( data, type, row ) {

            // const u = us.getUser(row.userid);
            // console.log("xinxishi:"+u);
            return '<a class="btn btn-warning btn-xs"  click="edit(u)" ><span class="glyphicon glyphicon-pencil" ></span>编辑</a>';
          },
          "targets": 7
        },
      ],
      'info': true,
      'autoWidth': false,
      'oLanguage': { //国际化配置
        'sProcessing': '正在获取数据，请稍后...',
        'sLengthMenu': '显示 _MENU_ 条',
        'sZeroRecords': '没有您要搜索的内容',
        'sInfo': '从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条',
        'sInfoEmpty': '记录数为0',
        'sInfoFiltered': '(全部记录数 _MAX_ 条)',
        'sInfoPostFix': '',
        'sSearch': '搜索',
        'sUrl': '',
        'oPaginate': {
          'sFirst': '第一页',
          'sPrevious': '上一页',
          'sNext': '下一页',
          'sLast': '最后一页'
        }
      }
    });

  }

  create() {
    this.router.navigateByUrl('/home/userform/0');
  }

  search(value:any){
    this.users = this.userService.getUsers(value);
  }

  edit(user:User){
    console.log(user.userid);
    this.router.navigateByUrl('/home/userform/'+user.userid);
  }
}
