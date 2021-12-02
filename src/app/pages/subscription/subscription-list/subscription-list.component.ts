import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Component, OnInit } from '@angular/core';
import { Subscription } from './../model/subscription.model';
import { SubscriptionService } from './../service/subscription.service';
import { User } from '../../../../shared/model/user.model';

@Component({
  selector: 'ngx-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {

  subscripitons: Array<Subscription> = [];
  user: User;

  constructor(private subscriptionService: SubscriptionService,
              private authService: NbAuthService,


  ) { }

  ngOnInit(): void {
    this.getPayloadFromToken()
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptionService.getAll(this.user.sub).subscribe(
      res => {
        this.subscripitons = res
        console.log(res)
      }
    )
  }

  getPayloadFromToken() {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });
  }

}
