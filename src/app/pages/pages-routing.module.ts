import { SubscriptionModule } from './subscription/subscription.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { PagesComponent } from './pages.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
    },
    {
      path: 'events',
      canActivate: [AuthGuard],
      loadChildren: () => import('../pages/events/event.module')
        .then(m => m.EventModule)
    },
    {
      path: 'subscriptions',
      canActivate: [AuthGuard],
      loadChildren: () => import('../pages/subscription/subscription.module')
        .then(m => m.SubscriptionModule)
    },
    { path: '', redirectTo: '/events', pathMatch: 'full' }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
