import {Component, Input, OnInit} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-hometest',
  templateUrl: './hometest.component.html',
  styleUrls: ['./hometest.component.css']
})
export class HometestComponent implements OnInit {

  @Input()
  public searchKeyword: string;

  constructor() {
  }

  ngOnInit() {
    $(function() {
      let num = 0;
      function goLeft() {
        //750是根据你给的尺寸，可变的
        if (num == -450) {
          num = 0;
        }
        num -= 1;
        $(".scroll").css({
          left: num
        })
      }
      //设置滚动速度
      var timer = setInterval(goLeft, 30);
    })
  }

  createUser(formInfo: any, valid:any) {
    console.log(valid);
    console.log(formInfo);
  }
}

export class StockInfo {
  constructor(public name: string,
              public price: number) {
  }
}
