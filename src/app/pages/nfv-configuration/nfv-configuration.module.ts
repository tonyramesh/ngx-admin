import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { NFVConfigurationRoutingModule, routedComponents } from './nfv-configuration-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NfvImageFormComponent } from './nfv-home/nfv-image-form/nfv-image-form.component';
import { NbWindowService } from '@nebular/theme';
import { FormlyModule } from '@ngx-formly/core';
// import {FormlyMaterialModule} from '@ngx-formly/material';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
const ENTRY_COMPONENTS = [
  NfvImageFormComponent
];


@NgModule({
  imports: [
    ThemeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k',
      libraries: ['places'],
    }),
    LeafletModule.forRoot(),
    NFVConfigurationRoutingModule,
    NgxEchartsModule,
    DragDropModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    NgxGraphModule,
    NgxChartsModule
    // FormlyMaterialModule
  ],
  exports: [],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [NbWindowService]
})
export class NfvConfigurationModule { }
