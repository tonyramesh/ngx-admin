import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NfvHomeComponent } from './nfv-home/nfv-home.component';
import { NfvImageFormComponent } from './nfv-home/nfv-image-form/nfv-image-form.component';
// import { GmapsComponent } from './gmaps/gmaps.component';
// import { LeafletComponent } from './leaflet/leaflet.component';
// import { BubbleMapComponent } from './bubble/bubble-map.component';
// import { SearchMapComponent } from './search-map/search-map.component';
// import { MapComponent } from './search-map/map/map.component';
// import { SearchComponent } from './search-map/search/search.component';

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
export class NFVConfigurationRoutingModule { }

export const routedComponents = [
  NfvHomeComponent,
  NfvImageFormComponent
];
