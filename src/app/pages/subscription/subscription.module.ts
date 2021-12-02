import { NgModule } from '@angular/core';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [SubscriptionListComponent],
  imports: [
    SharedModule,
    SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }
