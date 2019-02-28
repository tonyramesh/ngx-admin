import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { NFVTemplatesRoutingModule, routedComponents } from './nfv-templates-routing.module';
import { NbWindowService } from '@nebular/theme';
// import {FormlyMaterialModule} from '@ngx-formly/material';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
const ENTRY_COMPONENTS = [
];


@NgModule({
  imports: [
    ThemeModule,
    NFVTemplatesRoutingModule,
    NgxEchartsModule,
    NgxGraphModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule
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
export class NfvTemplatesConfigurationModule { }
