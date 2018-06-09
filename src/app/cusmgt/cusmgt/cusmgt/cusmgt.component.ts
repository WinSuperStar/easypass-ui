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
    this.search(this.formGroup.value);
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
