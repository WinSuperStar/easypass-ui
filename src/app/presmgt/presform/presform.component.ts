import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-presform',
  templateUrl: './presform.component.html',
  styleUrls: ['./presform.component.css']
})
export class PresformComponent implements OnInit {
  private fb: FormBuilder = new FormBuilder();
  // private checkboxShangpai:any;

  private formModel: FormGroup = this.fb.group({
    checkboxShangpai: [''],
    checkboxWeizhang: [''],
    checkboxDiya: [''],
    checkboxWeituo: [''],
    checkboxNianjian: [''],
    checkboxHuanbu: [''],
    checkboxQita: [''],
    contacts: this.fb.array([{}])
  });
  constructor(private router: Router) { }

  ngOnInit() {
    $('#fileUpload').fileinput({
      theme: 'fa',
      language: 'zh',
      allowedPreviewTypes : [ 'image' ],
      allowedFileExtensions : ['jpg', 'png', 'gif'],
      uploadUrl: '/api/upload',
      uploadAsync: false,
      uploadExtraData: {
        moduleName: 'customer'
      }
    }).on('filebatchselected', function(event, files) {
      $('#fileUpload').fileinput('upload');
    }).on('fileuploaded', function(event, data, previewId, index) {
      // ssss
    });
  }
  cancel() {
    this.router.navigateByUrl('/presmgt' );
  }
}
