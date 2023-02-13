/**
 * Taxi Operator - WebAPI
 * Developed by Elias Sharbim July 2022
 * version: v1
 * */

 import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
 import { Inject, Injectable, Optional } from '@angular/core';
 import { Observable } from 'rxjs';
 
 import { BASE_PATH } from '../variables';
 import { Customer } from '../model/customer';
import { Winner } from '../model/winner';
 
 @Injectable()
 export class WinnerService {
     protected basePath = '/';
     public defaultHeaders = new HttpHeaders();
 
     constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string) {
         if (basePath) {
             this.basePath = basePath;
         }
     }
 
     /**
      * Get all Winners
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @returns Array<Winner>
      */
     public apiWinnerGet(observe?: 'body'): Observable<Array<Winner>> {
         return this.httpClient.request<Array<Winner>>('get', `${this.basePath}/winners`,
             {
                 headers: this.defaultHeaders,
                 observe: observe
             }
         );
     }
 
     /**
      * Post Winner
      * @param body Winner
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @returns Winner
      */
     public apiWinnerPost(body?: Winner, observe?: 'body'): Observable<Winner> {
         return this.httpClient.request<Winner>('post', `${this.basePath}/winners`,
             {
                 body: body,
                 headers: this.defaultHeaders,
                 observe: observe
             }
         );
     }
 }