import {Injectable} from '@angular/core';

@Injectable()
export class DateService {

  constructor() {
  }

  dateFmt(val: any) {
    if (val == '' || val == null) {
      return '';
    } else {
      var crtTime = new Date(val);
      return this.dateFtt('yyyy-MM-dd', crtTime);
    }
  }

  dateTimeFmt(val: any) {
    if (val == '' || val == null) {
      return '';
    } else {
      var crtTime = new Date(val);
      return this.dateFtt('yyyy-MM-dd hh:mm:ss', crtTime);
    }
  }

  ngDateFmt(val: any) {
    if (val == '' || val == null) {
      return null;
    } else {
      var crtTime = new Date(val);
      crtTime.getFullYear();
      crtTime.getMonth();
      crtTime.getDate();
      // return JSON.parse('{"year":"' + crtTime.getFullYear() + '", "month":"' + crtTime.getMonth() + '", "day":"' + crtTime.getDay() + '"}');
      let a = {'year': crtTime.getFullYear(), 'month': crtTime.getMonth() + 1, 'day': crtTime.getDate()};
      return a;
    }

  }

  autoCompleteDate() {
    let date = new Date();
    // let uom = new Date(date-0+15*86400000);
    date.setDate(date.getDate() + 15);
    // uom = uom.getFullYear() + "-" + (uom.getMonth()+1) + "-" + uom.getDate();
    return this.dateFmt(date);
  }

  comDate(date: any) {
    if (date == '') {
      return '';
    } else {
      return date;
    }
  }

  dateFtt(fmt, date) {
    var o = {
      'M+': date.getMonth() + 1,                 //月份
      'd+': date.getDate(),                    //日
      'h+': date.getHours(),                   //小时
      'm+': date.getMinutes(),                 //分
      's+': date.getSeconds(),                 //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      'S': date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
  }
}
