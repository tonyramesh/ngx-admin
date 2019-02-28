import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'vnf-template',
  templateUrl: './vnf-template.component.html',
  styleUrls: ['./vnf-template.component.scss']
})
export class VnfTemplateComponent implements OnInit {
  @Input() nodeDetails = [];
  constructor() { }

  ngOnInit() {
  }

}
