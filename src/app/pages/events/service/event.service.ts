import { environment } from './../../../../environments/environment';
import { Event } from './../model/event.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  protected http: HttpClient;
  API_PATH: string = '/subscription/v1/event';
  baseUrl = environment.baseUrl + this.API_PATH;

  constructor(http: HttpClient,
    ) {
    this.http = http;
  }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl)
  }

  getById(id: number): Observable<Event> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError)
    )
  }

  create(event: Event): Observable<Event> {
    return this.http.post(this.baseUrl, event).pipe(
      catchError(this.handleError)
    )
  }

  update(event: Event): Observable<Event> {
    const url = `${this.baseUrl}/${event.id}`;

    return this.http.put(url, event).pipe(
      catchError(this.handleError)
    )
  }


  protected handleError(error: any): Observable<any>{
    return throwError(error);
  }
}
