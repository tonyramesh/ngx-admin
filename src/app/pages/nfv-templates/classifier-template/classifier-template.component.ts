import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'classifier-template',
  templateUrl: './classifier-template.component.html',
  styleUrls: ['./classifier-template.component.scss']
})
export class ClassifierTemplateComponent implements OnInit {
  @Input() nodeDetails = [];
  constructor() { }

  ngOnInit() {
  }

}
