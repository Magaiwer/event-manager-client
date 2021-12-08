import { NbComponentStatus } from '@nebular/theme';
import { Subscription } from './../model/subscription.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  protected http: HttpClient;
  API_PATH: string = '/subscription/v1/subscription';
  baseUrl = environment.baseUrl;

  constructor(http: HttpClient,
  ) {
    this.http = http;
  }

  getAll(userEmail: String): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.baseUrl + this.API_PATH}/user/all/${userEmail}`)
  }

  getById(id: number): Observable<Event> {
    const url = `${this.baseUrl + this.API_PATH}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError)
    )
  }

  register(subscription: Subscription): Observable<Subscription> {
    return this.http.post(this.baseUrl + this.API_PATH, subscription)

  }

  cancel(id: String): Observable<Subscription> {
    const url = `${this.baseUrl + this.API_PATH}/${id}/cancel`;
    return this.http.put(url, {}).pipe(
      catchError(this.handleError)
    )
  }

  generateCertificate(sub: Subscription): Observable<Blob | any> {
    const url = `${this.baseUrl + this.API_PATH}/certificate`;
    return this.http.post(url, sub, {responseType: 'blob'}).pipe(
      map(res => new Blob([res], { type: 'application/pdf' })),
      catchError(this.handleError)
    )
  }

  protected handleError(error: any): Observable<any> {
    return throwError(error);
  }

}
