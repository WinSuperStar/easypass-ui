import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {DateService} from '../../shared/services/date.service';
import {Page} from '../../shared/page.service';
import {AccessLog, AccessLogService} from '../../service/access-log.service';


declare var $: any;
let myTable;


@Component({
  selector: 'app-accesslogmgt',
  templateUrl: './accesslogmgt.component.html',
  styleUrls: ['./accesslogmgt.component.css']
})

export class AccesslogmgtComponent implements OnInit {

  public accessLogs: Observable<Page<AccessLog>>;

  constructor(private router: Router,
              public dateServie: DateService,
              private accessLogService: AccessLogService) { }

  ngOnInit() {
    const date = this.dateServie;
    myTable = $('#accessLogmgtTable').DataTable( {
      'processing': true,
      'serverSide': true,
      'paging': true,
      lengthMenu: [
        [ 10 , 20 , 30, 50, 80, 100 ],
        [ '10 页', '20 页', '30 页', '50 页', '80 页', '100页' ]
      ],
      ordering: false,
      'ajax': {
        'url': '/api/accessLogs',
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
      'searching' : false,
      'columns': [
        { 'data': 'id' },
        { 'data': 'username' },
        { 'data': 'operatorTime' ,
           'render': function ( data, type, row ) {
             data = date.dateFmt(data);
             return data;
          }},
        { 'data': 'method' },
        { 'data': 'url' },
        { 'data': 'ip' }
      ],
      'oLanguage' : {
        'sProcessing' : '正在获取数据，请稍后...',
        'sLengthMenu' : '显示 _MENU_ 条',
        'sZeroRecords' : '没有找到数据',
        'sInfo' : '从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条',
        'sInfoEmpty' : '记录数为0',
        'sInfoFiltered' : '(全部记录数 _MAX_ 条)',
        'sInfoPostFix' : '',
        'sSearch' : '查询',
        'sUrl' : '',
        'oPaginate' : {
          'sFirst' : '第一页',
          'sPrevious' : '上一页',
          'sNext' : '下一页',
          'sLast' : '最后一页'
        }
      }
    });
  }

  search(currentPageIndex: string, pageSize: string) {
    this.accessLogs = this.accessLogService.getAccessLog(currentPageIndex, pageSize);
  }
}
