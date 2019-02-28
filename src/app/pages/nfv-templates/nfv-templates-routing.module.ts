import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NfvHomeComponent } from './nfv-home/nfv-home.component';
// import { GmapsComponent } from './gmaps/gmaps.component';
// import { LeafletComponent } from './leaflet/leaflet.component';
// import { BubbleMapComponent } from './bubble/bubble-map.component';
// import { SearchMapComponent } from './search-map/search-map.component';
// import { MapComponent } from './search-map/map/map.component';
// import { SearchComponent } from './search-map/search/search.component';
import { ClassifierTemplateComponent } from './classifier-template/classifier-template.component';
import { VnfTemplateComponent } from './vnf-template/vnf-template.component';
import { ClientServerTemplateComponent } from './client-server-template/client-server-template.component';

const routes: Routes = [{
  path: '',
  component: NfvHomeComponent,
  children: []
  ,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NFVTemplatesRoutingModule { }

export const routedComponents = [
  NfvHomeComponent,
  ClassifierTemplateComponent,
  VnfTemplateComponent,
  ClientServerTemplateComponent
];
