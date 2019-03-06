import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { NfvImageFormComponent } from './nfv-image-form/nfv-image-form.component';
import * as shape from 'd3-shape';
import { DragulaService } from 'ng2-dragula';

declare var vis: any
@Component({
  selector: 'ngx-nfv-home',
  templateUrl: './nfv-home.component.html',
  styleUrls: ['./nfv-home.component.scss']
})
export class NfvHomeComponent implements OnInit {

  vnf = [{ name: "VNF" }];
  vnfContainer = [];
  visVnfNodes: any;
  vnfNetwork: any;

  client = [{ name: "CLIENT" }];
  clientContainer = [];
  visClientNodes: any;
  clientNetwork: any;

  server = [{ name: "SERVER" }];
  serverContainer = [];
  visServerNodes: any;
  serverNetwork: any;

  classifier = [{ name: "CLASSIFIER" }];
  classifierContainer = [];
  visclassifierNodes: any = [];
  classifierNetwork: any;

  constructor(private dragulaService: DragulaService) {
    this.initializeDragulaVnfService();
    this.initializeDragulaClientService();
    this.initializeDragulaServerService();
    this.initializeDragulaClassifierService();
  }

  public ngOnInit(): void {
    this.renderVisVnfGraph();
    this.renderVisClientGraph();
    this.renderVisServerGraph();
    this.renderVisClassifierGraph();
  }

  renderVisVnfGraph() {
    this.visVnfNodes = new vis.DataSet([]);
    var edges = new vis.DataSet([]);
    var container = document.getElementById('vnfNetwork');
    var data = {
      nodes: this.visVnfNodes,
      edges: edges
    };
    var options = {
      nodes: {
        shape: 'dot',
        size: 20,
        font: {
          size: 10,
          color: '#ffffff'
        },
        borderWidth: 2
      },
      edges: {
        width: 2
      },
      groups: {
        vnf: {
          shape: 'icon',
          icon: {
            face: 'FontAwesome',
            code: '\uf1b3',
            size: 20,
            color: 'white'
          }
        }
      }
    };
    this.vnfNetwork = new vis.Network(container, data, options);
  }

  initializeDragulaVnfService() {
    const vnfs: any = this.dragulaService.find('VNFS');
    if (vnfs !== undefined) this.dragulaService.destroy('VNFS');

    this.dragulaService.createGroup('VNFS', {
      copy: (el, source) => {
        return source.id === 'source';
      },
      copyItem: (data) => {
        return data;
      },
      accepts: (el, target, source, sibling) => {
        return target.id !== 'source';
      }
    });
    this.dragulaService.dropModel("VNFS").subscribe(args => {
      this.visVnfNodes.add({
        id: Date.now(),
        label: args.item.name,
        group: "vnf"
      });
      this.visGraphFitToScreen(this.vnfNetwork);
      // this.windowService.open(NfvImageFormComponent, { title: args.item.name });
    });
  }

  renderVisClientGraph() {
    this.visClientNodes = new vis.DataSet([]);
    var edges = new vis.DataSet([]);
    var container = document.getElementById('clientNetwork');
    var data = {
      nodes: this.visClientNodes,
      edges: edges
    };
    var options = {
      nodes: {
        shape: 'dot',
        size: 20,
        font: {
          size: 10,
          color: '#ffffff'
        },
        borderWidth: 2
      },
      edges: {
        width: 2
      },
      groups: {
        client: {
          shape: 'icon',
          icon: {
            face: 'FontAwesome',
            code: '\uf108',
            size: 20,
            color: 'white'
          }
        }
      }
    };
    this.clientNetwork = new vis.Network(container, data, options);
  }

  initializeDragulaClientService() {
    const client: any = this.dragulaService.find('CLIENT');
    if (client !== undefined) this.dragulaService.destroy('CLIENT');

    this.dragulaService.createGroup('CLIENT', {
      copy: (el, source) => {
        return source.id === 'clientSource';
      },
      copyItem: (data) => {
        return data;
      },
      accepts: (el, target, source, sibling) => {
        return target.id !== 'clientSource';
      }
    });
    this.dragulaService.dropModel("CLIENT").subscribe(args => {
      this.visClientNodes.add({
        id: Date.now(),
        label: args.item.name,
        group: "client"
      });
      // this.windowService.open(NfvImageFormComponent, { title: args.item.name });
      this.visGraphFitToScreen(this.clientNetwork);
    });
  }

  renderVisServerGraph() {
    this.visServerNodes = new vis.DataSet([]);
    var edges = new vis.DataSet([]);
    var container = document.getElementById('serverNetwork');
    var data = {
      nodes: this.visServerNodes,
      edges: edges
    };
    var options = {
      nodes: {
        shape: 'dot',
        size: 20,
        font: {
          size: 10,
          color: '#ffffff'
        },
        borderWidth: 2
      },
      edges: {
        width: 2
      },
      groups: {
        server: {
          shape: 'icon',
          icon: {
            face: 'FontAwesome',
            code: '\uf1c0',
            size: 20,
            color: 'white'
          }
        }
      }
    };
    this.serverNetwork = new vis.Network(container, data, options);
  }

  initializeDragulaServerService() {
    const server: any = this.dragulaService.find('SERVER');
    if (server !== undefined) this.dragulaService.destroy('SERVER');

    this.dragulaService.createGroup('SERVER', {
      copy: (el, source) => {
        return source.id === 'serverSource';
      },
      copyItem: (data) => {
        return data;
      },
      accepts: (el, target, source, sibling) => {
        return target.id !== 'serverSource';
      }
    });
    this.dragulaService.dropModel("SERVER").subscribe(args => {
      this.visServerNodes.add({
        id: Date.now(),
        label: args.item.name,
        group: "server"
      });
      // this.windowService.open(NfvImageFormComponent, { title: args.item.name });
      this.visGraphFitToScreen(this.serverNetwork);
    });
  }

  renderVisClassifierGraph() {
    this.visclassifierNodes = new vis.DataSet([]);
    var edges = new vis.DataSet([]);
    var container = document.getElementById('classifierNetwork');
    var data = {
      nodes: this.visclassifierNodes,
      edges: edges
    };
    var options = {
      nodes: {
        shape: 'dot',
        size: 20,
        font: {
          size: 10,
          color: '#ffffff'
        },
        borderWidth: 2
      },
      edges: {
        width: 2
      },
      groups: {
        classifier: {
          shape: 'icon',
          icon: {
            face: 'FontAwesome',
            code: '\uf258',
            size: 20,
            color: 'white'
          }
        }
      }
    };
    this.classifierNetwork = new vis.Network(container, data, options);
  }

  initializeDragulaClassifierService() {
    const classifier: any = this.dragulaService.find('CLASSIFIER');
    if (classifier !== undefined) this.dragulaService.destroy('CLASSIFIER');

    this.dragulaService.createGroup('CLASSIFIER', {
      copy: (el, source) => {
        return source.id === 'classifierSource';
      },
      copyItem: (data) => {
        return data;
      },
      accepts: (el, target, source, sibling) => {
        return target.id !== 'classifierSource';
      }
    });
    this.dragulaService.dropModel("CLASSIFIER").subscribe(args => {
      this.visclassifierNodes.add({
        id: Date.now(),
        label: args.item.name,
        group: "classifier"
      });
      // this.windowService.open(NfvImageFormComponent, { title: args.item.name });
      this.visGraphFitToScreen(this.classifierNetwork);
    });
  }

  visGraphFitToScreen(network) {
    var options = {
      offset: { x: 0, y: 0 },
      duration: 1000,
      easingFunction: "easeInOutQuad"
    };
    network.fit({ animation: options });
  }

}
