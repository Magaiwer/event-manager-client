import { MailModel } from './../../../../shared/model/mail.model';
import { MailService } from './../../../../shared/service/mail.service';
import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { User } from '../../../../shared/model/user.model';
import { Event } from '../model/event.model';
import { Subscription } from './../../subscription/model/subscription.model';
import { SubscriptionService } from './../../subscription/service/subscription.service';
import { EventService } from './../service/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Array<Event> = [];
  user: User;
  mailModel: MailModel = {};
  subscription: Subscription;

  constructor(private eventService: EventService,
    private subscriptionService: SubscriptionService,
    private toastService: NbToastrService,
    private authService: NbAuthService,
    private mailService: MailService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.loadEvents();
    this.getPayloadFromToken();
  }

  loadEvents() {
    this.eventService.getAll().subscribe(
      data => this.events = data,
      error => this.showToast('danger', 'Erro ao carregar a lista' + error)
    )
  }

  register(event: Event) {
    this.subscription.eventId = event.id;
    this.subscription.userEmail = this.user.sub;
    this.subscriptionService.register(this.subscription).subscribe(
      () => {
        this.showToast('success','Inscrição realizada com sucesso')
        this.sendMail(event);
      },
      error => this.showToast('danger', error.error.userMessage)
    )
  }

  protected showToast(status: NbComponentStatus, message: String) {
    this.toastService.show(message, null, { status });
  }

  private sendMail(event) {
    this.mailModel.emailTo = this.user.sub;
    this.mailModel.message = `Inscrição realizada no evento ${event.name}`;
    this.mailModel.subject =  `Inscrição no evento ${event.name}`;
    this.mailService.send(this.mailModel).subscribe();
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
