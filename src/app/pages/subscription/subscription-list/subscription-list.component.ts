import { MailService } from './../../../../shared/service/mail.service';
import { MailModel } from './../../../../shared/model/mail.model';
import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { User } from '../../../../shared/model/user.model';
import { Subscription } from './../model/subscription.model';
import { SubscriptionService } from './../service/subscription.service';


@Component({
  selector: 'ngx-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {

  subscriptions: Array<Subscription> = [];
  user: User;
  mailModel: MailModel = {};

  constructor(private subscriptionService: SubscriptionService,
    private authService: NbAuthService,
    private toastService: NbToastrService,
    private mailService: MailService
  ) { }

  ngOnInit(): void {
    this.getPayloadFromToken()
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptionService.getAll(this.user.sub).subscribe(
      res => {
        this.subscriptions = res
        this.subscriptions.sort((a, b) => b.status > a.status ? 1:-1 )
      }
    )
  }

  unsubscribeEvent(subscripiton: Subscription) {
    this.subscriptionService.cancel(subscripiton.id).subscribe(
      () => {
        this.showToast('success', 'Inscrição cancelada com sucesso')
        this.loadSubscriptions();
        this.sendMail(subscripiton.event);
      },
      error => this.showToast('danger', error.error.userMessage)
    )
  }

  generateCertificate(sub: Subscription) {
    this.subscriptionService.generateCertificate(sub).subscribe(
      res => window.open(URL.createObjectURL(res), '_blank'),
      error => this.showToast('danger', 'No check In found for this subscription')
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

  getStatusLabel(status: string): String {
    let statusType: String;
    switch (status) {
      case 'ENABLED': statusType = 'Ativa'
        break;
      case 'CANCELED': statusType = 'Cancelada'
        break;
      case 'PRESENT': statusType = 'Presente'
        break;
    }
    return statusType;
  }

  enabledActionButton(status: String): boolean {
    return status == 'ENABLED';
  }

  enableCertificate(status: String): boolean {
    return status == 'PRESENT';
  }

  private sendMail(event) {
    this.mailModel.emailTo = this.user.sub;
    this.mailModel.message = `Inscrição do evento ${event.name} cancelada`;
    this.mailModel.subject =  `Inscrição Cancelada`;
    this.mailService.send(this.mailModel).subscribe();
  }

  protected showToast(status: NbComponentStatus, message: String) {
    this.toastService.show(message, null, { status });
  }
}
