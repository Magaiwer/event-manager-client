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
  baseUrl = environment.baseUrl + this.API_PATH;

  constructor(http: HttpClient,
    ) {
    this.http = http;
  }

  getAll(userEmail: String): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.baseUrl} /user/all/${userEmail}`)
  }

  getById(id: number): Observable<Event> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError)
    )
  }

  register(subscription: Subscription): Observable<Subscription> {
    return this.http.post(this.baseUrl, subscription)

  }

  cancel(subscription: Subscription): Observable<Subscription> {
    const url = `${this.baseUrl}/${subscription.id}/cancel`;

    return this.http.put(url, subscription).pipe(
      catchError(this.handleError)
    )
  }

  protected handleError(error: any): Observable<any>{
    return throwError(error);
  }
}
