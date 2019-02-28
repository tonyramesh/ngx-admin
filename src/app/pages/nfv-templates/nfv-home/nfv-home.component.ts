
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'ngx-nfv-home',
  templateUrl: './nfv-home.component.html',
  styleUrls: ['./nfv-home.component.scss']
})
export class NfvHomeComponent implements AfterViewInit {
  @ViewChild('myDiagramDiv') div;
  vnfd: any;
  nodeDetails: any;
  selectedNode: string;
  constructor() {
  }
  ngAfterViewInit() {
    var ptr = this;
    this.nodeDetails = null;
    const diagramDiv = this.div.nativeElement;

    var $ = go.GraphObject.make;
    let myDiagram = $(go.Diagram, diagramDiv,
      {
        "undoManager.isEnabled": true,
        initialContentAlignment: go.Spot.Center
      });

    var classifierTemplate =
      $(go.Node, "Auto",
        $(go.Shape, "Ellipse", { strokeWidth: 0, fill: "white" },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 8 },
          new go.Binding("text", "key")),
        { click: function (e, obj) { ptr.classifierTemplateOnClick(obj.part.data); } }
      );

    var vnfTemplate =
      $(go.Node, "Auto",
        $(go.Shape, "Diamond", { strokeWidth: 0, fill: "white" },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 8 },
          new go.Binding("text", "key")),
        { click: function (e, obj) { ptr.vnfTemplateOnClick(obj.part.data); } }
      );

    var clientServertemplate =
      $(go.Node, "Spot",
        $(go.Panel, "Auto",
          $(go.Shape, "Ellipse",
            new go.Binding("fill", "color")),
          $(go.TextBlock,
            new go.Binding("text", "key")),
          { click: function (e, obj) { ptr.clientServertemplateOnClick(obj.part.data); } }
        )
      );



    var detailtemplate =
      $(go.Node, "Spot",
        $(go.Panel, "Auto",
          $(go.Shape, "RoundedRectangle",
            new go.Binding("fill", "color")),
          $(go.Panel, "Table",
            { defaultAlignment: go.Spot.Left },
            $(go.TextBlock, { row: 0, column: 0, columnSpan: 2, font: "bold 12pt sans-serif" },
              new go.Binding("text", "key")),
            $(go.TextBlock, { row: 1, column: 0 }, "Description:"),
            $(go.TextBlock, { row: 1, column: 1 }, new go.Binding("text", "desc")),
            $(go.TextBlock, { row: 2, column: 0 }, "Color:"),
            $(go.TextBlock, { row: 2, column: 1 }, new go.Binding("text", "color"))
          )
        )
      );

    var templmap = new go.Map<string, go.Node>();
    templmap.add("simple", clientServertemplate);
    templmap.add("detailed", detailtemplate);
    templmap.add("classifierTemplate", classifierTemplate);
    templmap.add("vnfTemplate", vnfTemplate);
    myDiagram.nodeTemplateMap = templmap;

    myDiagram.layout = $(go.TreeLayout);
    myDiagram.linkTemplate =
      $(go.Link,
        {
          curve: go.Link.Bezier, adjusting: go.Link.Stretch,
          relinkableFrom: true, relinkableTo: true, reshapable: true
        },
        $(go.Shape,
          { strokeWidth: 2, stroke: "black" }),
        $(go.Shape,
          {
            toArrow: "standard",
            fill: "blue", stroke: null
          })
      );

    this.vnfd = [{
      "nsd:nsd-catalog": {
        "nsd": [
          {
            "id": "3vdu_2vnf_1vnffg_nsd",
            "name": "3vdu_2vnf_1vnffg_ns-name",
            "short-name": "3vdu_2vnf_1vnffg-sname",
            "description": "3 vnfs, each one with 2 cirros vdu, with 1 vnffg connecting the vnfs",
            "vendor": "OSM",
            "version": "1.0",
            "logo": "osm_2x.png",
            "constituent-vnfd": [
              {
                "member-vnf-index": 1,
                "vnfd-id-ref": "2vdu_vnfd"
              },
              {
                "member-vnf-index": 2,
                "vnfd-id-ref": "2vdu_vnfd"
              },
              {
                "member-vnf-index": 3,
                "vnfd-id-ref": "2vdu_vnfd"
              },
              {
                "member-vnf-index": 4,
                "vnfd-id-ref": "2vdu_vnfd"
              }
            ],
            "ip-profiles": [
              {
                "description": "Inter VNF Link",
                "ip-profile-params": {
                  "gateway-address": "31.31.31.210",
                  "ip-version": "ipv4",
                  "subnet-address": "31.31.31.0/24",
                  "dns-server": [
                    {
                      "address": "8.8.8.8"
                    },
                    {
                      "address": "8.8.8.9"
                    }
                  ],
                  "dhcp-params": {
                    "count": 200,
                    "start-address": "31.31.31.2"
                  }
                },
                "name": "ipprofileA"
              }
            ],
            "vld": [
              {
                "id": "vld1",
                "name": "vld1-name",
                "short-name": "vld1-sname",
                "type": "ELAN",
                "ip-profile-ref": "ipprofileA",
                "vnfd-connection-point-ref": [
                  {
                    "member-vnf-index-ref": 1,
                    "vnfd-id-ref": "2vdu_vnfd",
                    "vnfd-connection-point-ref": "eth0"
                  },
                  {
                    "member-vnf-index-ref": 2,
                    "vnfd-id-ref": "2vdu_vnfd",
                    "vnfd-connection-point-ref": "eth0"
                  },
                  {
                    "member-vnf-index-ref": 3,
                    "vnfd-id-ref": "2vdu_vnfd",
                    "vnfd-connection-point-ref": "eth0"
                  }
                ]
              }
            ],
            "vnffgd": [
              {
                "id": "vnffg1",
                "name": "vnffg1-name",
                "short-name": "vnffg1-sname",
                "description": "vnffg1-description",
                "vendor": "vnffg1-vendor",
                "version": "1.0",
                "rsp": [
                  {
                    "id": "rsp1",
                    "name": "rsp1-name",
                    "vnfd-connection-point-ref": [
                      {
                        "member-vnf-index-ref": 2,
                        "order": 3,
                        "vnfd-id-ref": "2vdu_vnfd",
                        "vnfd-ingress-connection-point-ref": "eth0",
                        "vnfd-egress-connection-point-ref": "eth0"
                      },
                      {
                        "member-vnf-index-ref": 3,
                        "order": 2,
                        "vnfd-id-ref": "2vdu_vnfd",
                        "vnfd-ingress-connection-point-ref": "eth0",
                        "vnfd-egress-connection-point-ref": "eth0"
                      },
                      {
                        "member-vnf-index-ref": 4,
                        "order": 1,
                        "vnfd-id-ref": "2vdu_vnfd",
                        "vnfd-ingress-connection-point-ref": "eth0",
                        "vnfd-egress-connection-point-ref": "eth0"
                      }
                    ]
                  },
                  {
                    "id": "rsp1",
                    "name": "rsp1-name",
                    "vnfd-connection-point-ref": [
                      {
                        "member-vnf-index-ref": 1,
                        "order": 0,
                        "vnfd-id-ref": "2vdu_vnfd",
                        "vnfd-ingress-connection-point-ref": "eth0",
                        "vnfd-egress-connection-point-ref": "eth0"
                      },
                      {
                        "member-vnf-index-ref": 3,
                        "order": 1,
                        "vnfd-id-ref": "2vdu_vnfd",
                        "vnfd-ingress-connection-point-ref": "eth0",
                        "vnfd-egress-connection-point-ref": "eth0"
                      }
                    ]
                  }
                ],
                "classifier": [
                  {
                    "id": "class1",
                    "name": "class1-name",
                    "rsp-id-ref": "rsp1",
                    "member-vnf-index-ref": 1,
                    "vnfd-id-ref": "2vdu_vnfd",
                    "vnfd-connection-point-ref": "eth0",
                    "match-attributes": [
                      {
                        "id": "match1",
                        "ip-proto": 6,
                        "source-ip-address": "10.0.0.1",
                        "destination-ip-address": "10.0.0.2",
                        "source-port": 0,
                        "destination-port": 80
                      },
                      {
                        "id": "match2",
                        "ip-proto": 6,
                        "source-ip-address": "10.0.0.4",
                        "destination-ip-address": "10.0.0.3",
                        "source-port": 0,
                        "destination-port": 80
                      },
                      {
                        "id": "match2",
                        "ip-proto": 6,
                        "source-ip-address": "10.0.0.2",
                        "destination-ip-address": "10.0.0.13",
                        "source-port": 0,
                        "destination-port": 80
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }];

    let nodes = [];
    this.vnfd = JSON.parse(JSON.stringify(this.vnfd));
    this.vnfd = this.vnfd[0]['nsd:nsd-catalog'];
    this.vnfd.nsd[0]['constituent-vnfd'].forEach(element => {
      nodes.push({ key: element["vnfd-id-ref"] + element["member-vnf-index"], color: "lightblue", category: "vnfTemplate", data: element })
    });
    if (this.vnfd.nsd[0].vnffgd) {
      this.vnfd.nsd[0].vnffgd[0].classifier[0]['match-attributes'].forEach(element => {
        nodes.push({ key: "Server: " + element["destination-ip-address"], color: "green", category: "simple", data: element });
        nodes.push({ key: "Client: " + element["source-ip-address"], color: "green", category: "simple", data: element });
      });
      this.vnfd.nsd[0].vnffgd[0].classifier.forEach(element => {
        nodes.push({ key: "Classifier Start: " + element.name, color: "lightyellow", category: "classifierTemplate", data: element });
        nodes.push({ key: "Classifier End: " + element.name, color: "lightyellow", category: "classifierTemplate", data: element });
      });
    }
    let links = [];

    if (this.vnfd.nsd[0].vnffgd) {

      this.vnfd.nsd[0].vnffgd[0].classifier.forEach(classifier => {
        classifier['match-attributes'].forEach(element => {
          links.push({ from: "Client: " + element["source-ip-address"], to: "Classifier Start: " + classifier.name, category: "simple" })
          links.push({ from: "Classifier End: " + classifier.name, to: "Server: " + element["destination-ip-address"], category: "simple" })
        });
      });
      this.vnfd.nsd[0].vnffgd[0].rsp.forEach((eachRsp, rspIndex) => {
        eachRsp['vnfd-connection-point-ref'].sort(function (a, b) {
          return a.order - b.order;
        });
        eachRsp['vnfd-connection-point-ref'].forEach((connectionPoint, index) => {
          let classifierIndex = null;
          this.vnfd.nsd[0].vnffgd[0].classifier.forEach((classifier, classifier_Index) => {
            if (classifier["rsp-id-ref"] == eachRsp.id) {
              classifierIndex = classifier_Index;
            }
          });
          if (classifierIndex !== null) {
            if (index == 0) {
              if (eachRsp['vnfd-connection-point-ref'].length == 1) {
                links.push({ from: "Classifier Start: " + this.vnfd.nsd[0].vnffgd[0].classifier[classifierIndex].name, to: connectionPoint["vnfd-id-ref"] + connectionPoint["member-vnf-index-ref"], category: "simple" });
                links.push({ from: connectionPoint["vnfd-id-ref"] + connectionPoint["member-vnf-index-ref"], to: "Classifier End: " + this.vnfd.nsd[0].vnffgd[0].classifier[classifierIndex].name, category: "simple" });
              } else {
                links.push({ from: "Classifier Start: " + this.vnfd.nsd[0].vnffgd[0].classifier[0].name, to: connectionPoint["vnfd-id-ref"] + connectionPoint["member-vnf-index-ref"], category: "simple" });
              }
            } else if (index == eachRsp['vnfd-connection-point-ref'].length - 1) {
              links.push({ from: connectionPoint["vnfd-id-ref"] + connectionPoint["member-vnf-index-ref"], to: "Classifier End: " + this.vnfd.nsd[0].vnffgd[0].classifier[classifierIndex].name, category: "simple" });
              links.push({ from: eachRsp['vnfd-connection-point-ref'][index - 1]["vnfd-id-ref"] + eachRsp['vnfd-connection-point-ref'][index - 1]["member-vnf-index-ref"], to: connectionPoint["vnfd-id-ref"] + connectionPoint["member-vnf-index-ref"], category: "simple" });
            } else {
              links.push({ from: eachRsp['vnfd-connection-point-ref'][index - 1]["vnfd-id-ref"] + eachRsp['vnfd-connection-point-ref'][index - 1]["member-vnf-index-ref"], to: connectionPoint["vnfd-id-ref"] + connectionPoint["member-vnf-index-ref"], category: "simple" });
            }
          }
        });
      });
    }
    myDiagram.model = new go.GraphLinksModel(
      nodes, links);
  }


  classifierTemplateOnClick(classifier) {
    this.nodeDetails = classifier.data;
    this.selectedNode = "classifier";
  }

  vnfTemplateOnClick(vnf) {
    this.nodeDetails = vnf.data;
    this.selectedNode = "vnf";
  }

  clientServertemplateOnClick(clientServer) {
    this.nodeDetails = clientServer.data;
    this.selectedNode = "clientServer";
  }

}
