import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MailModel } from '../model/mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  protected http: HttpClient;

  API_PATH: string = '/mail/v1/mail';
  baseUrl = environment.baseUrl + this.API_PATH;

  constructor(http: HttpClient) {
    this.http = http;
  }

  send(mailModel: MailModel): Observable<any> {
    return this.http.post(this.baseUrl, mailModel);
  }
}
