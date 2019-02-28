import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'client-server-template',
  templateUrl: './client-server-template.component.html',
  styleUrls: ['./client-server-template.component.scss']
})
export class ClientServerTemplateComponent implements OnInit {
  @Input() nodeDetails = [];
  constructor() { }

  ngOnInit() {
  }

}
