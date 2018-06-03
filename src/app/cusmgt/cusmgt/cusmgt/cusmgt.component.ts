import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Customer, CustomerService} from "../../../service/customer.service";
import {Observable} from "rxjs/Observable";
import {DateService} from "../../../shared/services/date.service";
import {FormBuilder, FormGroup} from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-cusmgt',
  templateUrl: './cusmgt.component.html',
  styleUrls: ['./cusmgt.component.css']
})
export class CusmgtComponent implements OnInit {

  public customers: Observable<Customer[]>;
  public formGroup: FormGroup;

  constructor(private router: Router,
              private cusService: CustomerService,
              public date: DateService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    const date = this.date;
    this.formGroup = this.fb.group({
        cusname: [''],
        cusmode: [''],
        contact: [''],
        contactPhone: [''],
        province: [''],
        city: [''],
        area: [''],
        state:['正常']
      }
    )
    // $('#cusmgtTable').DataTable({
    //   'processing': true,
    //   'serverSide': true,
    //   'paging': true,
    //   lengthMenu: [
    //     [ 10 , 20 , 30, 50, 80, 100 ],
    //     [ '10 页', '20 页', '30 页', '50 页', '80 页', '100页' ]
    //   ],
    //   ordering: false,
    //   'ajax': {
    //     'url': '/api/cusPage',
    //     'type': 'POST',
    //     'data': function (d) {
    //       for (const key in d) {
    //         if (key.indexOf('columns') == 0 || key.indexOf('order') == 0 || key.indexOf('search') == 0 ) {
    //           delete d[key];
    //         }
    //       }
    //       const searchParams = {};
    //       if (searchParams) {
    //         $.extend( d, searchParams );
    //       }
    //     },
    //     'dataType' : 'json',
    //     'dataFilter': function (json) {
    //       console.log(json)
    //       json = JSON.parse(json);
    //       console.log(json);
    //       return JSON.stringify(json);
    //     }
    //   },
    //   'columns': [
    //     { 'data': 'cusid' },
    //     { 'data': 'cusname' },
    //     { 'data': 'contactPhone' },
    //     { 'data': 'cusmode' },
    //     { 'data': 'address' },
    //     { 'data': 'createdate',
    //       'render': function ( data, type, row ) {
    //         data = date.dateFmt(data);
    //         return data;
    //        }
    //     },
    //     { 'data': 'creator'}
    //   ],
    //   'searching': false,
    //   "columnDefs": [
    //     {
    //       "render": function ( data, type, row ) {
    //         return ' <a class="btn btn-warning btn-xs" (click)="edit('+row+')"><span class="glyphicon glyphicon-pencil"></span>编辑</a>';
    //       },
    //       "targets": 7
    //     },
    //   ],
    //   'info': true,
    //   'autoWidth': false,
    //   'oLanguage': { //国际化配置
    //     'sProcessing': '正在获取数据，请稍后...',
    //     'sLengthMenu': '显示 _MENU_ 条',
    //     'sZeroRecords': '没有您要搜索的内容',
    //     'sInfo': '从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条',
    //     'sInfoEmpty': '记录数为0',
    //     'sInfoFiltered': '(全部记录数 _MAX_ 条)',
    //     'sInfoPostFix': '',
    //     'sSearch': '搜索',
    //     'sUrl': '',
    //     'oPaginate': {
    //       'sFirst': '第一页',
    //       'sPrevious': '上一页',
    //       'sNext': '下一页',
    //       'sLast': '最后一页'
    //     }
    //   }
    // });
  }

  edit(cus: Customer) {
    this.router.navigateByUrl('/home/cusform/' + cus.cusid);
  }

  create() {
    this.router.navigateByUrl('/home/cusform/0');
  }

  search(form: any) {
    this.customers = this.cusService.getCustomers(form);
  }
}
