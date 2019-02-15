import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NbWindowService } from '@nebular/theme';
import { NfvImageFormComponent } from './nfv-image-form/nfv-image-form.component';
import * as shape from 'd3-shape';
import { NgxGraphModule } from '@swimlane/ngx-graph';

@Component({
  selector: 'ngx-nfv-home',
  templateUrl: './nfv-home.component.html',
  styleUrls: ['./nfv-home.component.scss']
})
export class NfvHomeComponent implements OnInit {
  constructor(private windowService: NbWindowService) {

  }

  hierarchialGraph = { nodes: [], links: [] };
  curve = shape.curveBundle.beta(1);
  // curve = shape.curveLinear;
  id = 0;
  public ngOnInit(): void {
    let data = {
      id: 'das',
      label: 'sda',
      position: 'x0'
    };
    this.hierarchialGraph.nodes = [
    ];

    this.hierarchialGraph.links = [
    ];
    // this.showGraph(data);
  }

  showGraphLink(link) {
    this.hierarchialGraph.links.push(link);
  }

  todo = [
    'IMAGE',
    'INSTANCE',
    'NS',
    'VNFD',
    'VIM ACCOUNT'
  ];

  done = [];



  showGraph(data, link) {
    let final;
    if (this.hierarchialGraph.nodes.length <= 0) {
      final = [
      ];
    }
    else {
      final = this.hierarchialGraph.links.push(link);
      this.hierarchialGraph.links.push(link);
    }
    this.hierarchialGraph.links = [
    ];
    this.hierarchialGraph.nodes.push(data);
  }

  drop(event: CdkDragDrop<string[]>) {
    let id;
    let data = {
      id: id,
      label: this.todo[event.previousIndex],
      position: 'x' + this.id
    };
    let link = {
      source: 'start',
      target: id,
      label: 'Process#1'
    };
    if (this.todo[event.previousIndex] == 'IMAGE') {
      data.id = 'start';
      this.showGraph(data, {});
    } else {
      link.target = this.id.toString();
      data.id = link.target;
      this.showGraph(data, link);
      // this.showGraphLink(link);
    }
    this.id++;
    // if (this.hierarchialGraph.nodes.length > 1) {
    //   this.showGraphLink(link);
    // }
    // this.showGraph(data);
    this.todo.push(this.todo[event.previousIndex]);
    console.log('event.container', JSON.stringify(this.hierarchialGraph.nodes));
    console.log(JSON.stringify(this.hierarchialGraph.links));
    this.windowService.open(NfvImageFormComponent, { title: this.todo[event.previousIndex] });
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
