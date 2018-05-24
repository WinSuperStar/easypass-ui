import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/Rx';
import {AddrSelectService, Area, City, Province} from '../shared/services/addr-select.service';
import {Observable} from 'rxjs/Observable';
import {Vendor, VendorService} from '../service/vendor.service';
import {DateService} from '../shared/services/date.service';

declare var $: any;

@Component({
  selector: 'app-vdrmgt',
  templateUrl: './vdrmgt.component.html',
  styleUrls: ['./vdrmgt.component.css']
})
export class VdrmgtComponent implements OnInit {
  private vdrs: Vendor[];
  private nameFilter: FormControl = new FormControl();
  private keyWord: string;
  public formGroup: FormGroup;
  public vendors: Observable<Vendor[]>;
  province: Observable<Province[]>;
  city: Observable<City[]>;
  area: Observable<Area[]>;
  itemlist: any[] = [{state: '0', name: '提档'},{state: '0', name: '过户'},{state: '0', name: '上牌'},
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
              private vendorService: VendorService,
              private addrService: AddrSelectService,
              private date: DateService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
<<<<<<< HEAD
    var data = ['aaa','bbb','ccc'];
    $("#vdrcontact").typehead({source:data});
=======
    const date = this.date;
    // sid = this.showItemDetail(Vendor);
>>>>>>> 74cb8473519bec45573253bff021d6b9e55941c9
    this.province = this.addrService.getPros();
    // this.vdrs = this.vendorService.getVendors();
    this.nameFilter.valueChanges
      .debounceTime(500)
      .subscribe(value => this.keyWord = value);
    $('#vdrmgt_form_dp').daterangepicker({
      'locale': {
        format: 'YYYY-MM-DD',
        separator: ' ~ ',
        applyLabel: '应用',
        cancelLabel: '取消',
        resetLabel: '重置',
      }
    });
    this.formGroup = this.fb.group({
      vdraddr1: [''],
      vdraddr2: [''],
      vdraddr3: [''],
      vdrplate1: [''],
      vdrplate2: [''],
      firstdate: [''],
      state: [''],
      contact: [''],
      contactphone: [''],
      itemlist: this.fb.array([])
    });
    this.formGroup.setControl('itemlist', this.initItemList());
    // this.formGroup.get('itemlist').valueChanges.subscribe(values => {
    //   values.forEach((selected: boolean, i: number) => {
    //     if (selected === true) {
    //       this.itemlist[i].state = '1';
    //     } else {
    //       this.itemlist[i].state = '0';
    //     }
    //   });
    // });
    $('#vdrmgtTable').DataTable({

      'processing': true,
      'serverSide': true,
      'paging': true,
      lengthMenu: [
        [ 10 , 20 , 30, 50, 80, 100 ],
        [ '10 页', '20 页', '30 页', '50 页', '80 页', '100页' ]
      ],
      ordering: false,
      'ajax': {
        'url': '/api/vendorPage',
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
      'columns':[
        { 'data': 'vdrid' },
        { 'data': 'vdraddr' },
        { 'data': 'vdrplate' },
        { 'data': 'vdrname' },
        { 'data': 'vdrid',
          'render': function ( data, type, row ) {
                    let list:string ='' ;
                    let v:Vendor = row;
            if(v.itemTidang == 'true'){
              list = '提档'+',';
            }else if (v.itemGuohu == 'true'){
              list = list + '过户' +',';
            }else if (v.itemShangpai == 'true'){
              list = list + '上牌' +',';
            }else if (v.itemWeizhang == 'true'){
              list = list + '违章' +',';
            }else if (v.itemDiya == 'true'){
              list = list + '抵押' +',';
            }else if (v.itemJiechudiya == 'true'){
              list = list + '解除抵押' +',';
            }else if (v.itemWeituo == 'true'){
              list = list + '委托' +',';
            }else if (v.itemNianjian == 'true'){
              list = list + '年检' +',';
            }else if (v.itemBuhuan == 'true'){
              list = list + '换补牌证' +',';
            }else if (v.itemQita == 'true'){
              list = list + '其他';
            }
            return list;
          }
        },
        { 'data': 'contact' },
        { 'data': 'contactphone' },
        { 'data': 'createdate','render': function ( data, type, row ) {
            data = date.dateFmt(data);
            return data;
          } },
        { 'data': 'state' },
        { 'data': 'creator' },
        { 'data': 'contactphone'},
      ],
      "columnDefs": [
        {
          "render": function ( data, type, row ) {
            return  ''
            +'<p>'
            +'<a class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-pencil" (click)="submit('+row.vdrid+')"></span>提交</a>'
            +'<a class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-pencil" (click)="view('+row.vdrid+')"></span>查看</a>'
            +'</p>'
            +'<p>'
            +'<a class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-pencil" (click)="edit('+row.vdrid+')"></span>编辑</a>'
            +'<a class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove" (click)="delete('+row.vdrid+')"></span>删除</a>'
            +'</p>;'
          },
          "targets": 10
        },
      ],
      'info': true,
      'autoWidth': false,
      'oLanguage': {
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
    // 需要新建代办商并且返回新建代办商的id，作为参数传入初始化form
    let creator = JSON.parse(localStorage.getItem('currentUser'))['username'];
    this.vendorService.createVdr(creator).subscribe(
      res => {
        let id = res;
        console.log(id);
        this.router.navigateByUrl('/home/vdrmgt/' + id);
      },
      err => {

      }
    );
  }

  // update(vdr: Vdr) {
  //   this.router.navigateByUrl('/home/vdrmgt/' + vdr.id);
  // }

  showCity(item) {
    let p = item.target.value;
    console.log(p);
    this.addrService.getProCode(p).subscribe(
      res => {
        this.formGroup.get('vdrplate1').setValue(res);
      }
    );
    this.city = this.addrService.getCities(p);
    // this.formGroup.get('vdraddr3').reset();
    this.area = this.addrService.getAreas('');
  }

  showArea(item) {
    let c = item.target.value;
    this.addrService.getShotCode(c).subscribe(
      res => {
        if (res === '' || res == null) {
        } else {
          this.formGroup.get('vdrplate2').setValue(res);
        }
      }
    );
    this.area = this.addrService.getAreas(c);
  }

  search(form: any) {
    // console.log(form['itemlist']);
    this.vendors = this.vendorService.getVdrs(form);
  }

  showItemDetail(v: Vendor){
    let list:string = '';
    if(v.itemTidang == 'true'){
      list = '提档'+',';
    }else if (v.itemGuohu == 'true'){
      list = list + '过户' +',';
    }else if (v.itemShangpai == 'true'){
      list = list + '上牌' +',';
    }else if (v.itemWeizhang == 'true'){
      list = list + '违章' +',';
    }else if (v.itemDiya == 'true'){
      list = list + '抵押' +',';
    }else if (v.itemJiechudiya == 'true'){
      list = list + '解除抵押' +',';
    }else if (v.itemWeituo == 'true'){
      list = list + '委托' +',';
    }else if (v.itemNianjian == 'true'){
      list = list + '年检' +',';
    }else if (v.itemBuhuan == 'true'){
      list = list + '换补牌证' +',';
    }else if (v.itemQita == 'true'){
      list = list + '其他';
    }
    return list;
  }

  edit(id:any){
    this.router.navigateByUrl('/home/vdrmgt/'+id);
  }

  submit(id:any){
    //提交
  }

  view(id:any){
    this.router.navigateByUrl('/home/vdrmgt/'+id);
  }
  delete(id:any){
    //删除
  }
}
