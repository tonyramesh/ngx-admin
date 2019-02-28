import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-nfv-image-form',
  templateUrl: './nfv-image-form.component.html',
  styleUrls: ['./nfv-image-form.component.scss']
})
export class NfvImageFormComponent implements OnInit {

  constructor(public windowRef: NbWindowRef) { }


  submit(model) {
    console.log(model);
    this.close();
  }
  ngOnInit() {
  }
  close() {
    this.windowRef.close();
  }

}
