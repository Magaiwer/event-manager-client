import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';

import { EventRoutingModule } from './event-list-routing.module';
import { EventListComponent } from './event-list/event-list.component';

@NgModule({
  declarations: [EventListComponent],
  imports: [
    SharedModule,
    EventRoutingModule
  ]
})
export class EventModule { }
