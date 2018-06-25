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
    // $(function() {
    //   let num = 0;
    //   function goLeft() {
    //     //750是根据你给的尺寸，可变的
    //     if (num == -450) {
    //       num = 0;
    //     }
    //     num -= 1;
    //     $(".scroll").css({
    //       left: num
    //     })
    //   }
    //   //设置滚动速度
    //   var timer = setInterval(goLeft, 30);
    // })
    // $(function () {
    //   var demo = $("#demo")[0];
    //   var demo1 = $("#demo1")[0];
    //   var demo2 = $("#demo2")[0];
    //   var speed = 10;    //滚动速度值，值越大速度越慢
    //   var nnn = 200 / demo1.offsetHeight;
    //   for (let i = 0; i < nnn; i++) {
    //     demo1.innerHTML += "<br />" + demo1.innerHTML
    //   }
    //   demo2.innerHTML = demo1.innerHTML    //克隆demo2为demo1
    //   function Marquee() {
    //     if (demo2.offsetTop - demo.scrollTop <= 0)    //当滚动至demo1与demo2交界时
    //       demo.scrollTop -= demo1.offsetHeight    //demo跳到最顶端
    //     else {
    //       demo.scrollTop++
    //     }
    //   }
    //
    //   var MyMar = setInterval(Marquee, speed);        //设置定时器
    //   demo.onmouseover = function () {
    //     clearInterval(MyMar)
    //   }    //鼠标经过时清除定时器达到滚动停止的目的
    //   demo.onmouseout = function () {
    //     MyMar = setInterval(Marquee, speed)
    //   }    //鼠标移开时重设定时器
    // });
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
