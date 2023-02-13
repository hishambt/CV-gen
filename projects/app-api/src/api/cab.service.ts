/**
 * Taxi Operator - WebAPI
 * Developed by Elias Sharbim July 2022
 * version: v1
 * */

import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_PATH } from '../variables';
import { Cab } from '../model/cab';

@Injectable()
export class CabService {
    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * Get all Cabs
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @returns Array<Cab>
     */
    public apiCabsGet(observe?: 'body'): Observable<Array<Cab>> {
        return this.httpClient.request<Array<Cab>>('get', `${this.basePath}/cabs`,
            {
                headers: this.defaultHeaders,
                observe: observe
            }
        );
    }


    /**
    * Get Cab by Id
    * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
    * @returns Cab
    */
    public apiCabIdGet(id: string, observe?: 'body'): Observable<Cab> {
        return this.httpClient.request<Cab>('get', `${this.basePath}/cabs/${encodeURIComponent(String(id))}`,
            {
                headers: this.defaultHeaders,
                observe: observe
            }
        );
    }

    /**
     * Post Cab 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @returns Cab
     */
    public apiCabPost(body?: Cab, observe?: 'body'): Observable<Cab> {
        return this.httpClient.request<Cab>('post', `${this.basePath}/cabs`,
            {
                body: body,
                headers: this.defaultHeaders,
                observe: observe
            }
        );
    }

    /**
     * Update Cab by Id
     * @param id record id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @returns Cab
     */
    public apiCabPut(id: string, body?: Cab, observe: any = 'body'): Observable<HttpEvent<Cab>> {
        return this.httpClient.request<Cab>('put', `${this.basePath}/cabs/${encodeURIComponent(String(id))}`,
            {
                body: body,
                headers: this.defaultHeaders,
                observe: observe
            }
        );
    }


    /**
     * Delete by Id
     * @param id record id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @returns Cab
     */
    public apiCabIdDelete(id: string, observe: any = 'body'): Observable<HttpEvent<Cab>> {
        return this.httpClient.request<Cab>('delete', `${this.basePath}/cabs/${encodeURIComponent(String(id))}`,
            {
                headers: this.defaultHeaders,
                observe: observe
            }
        );
    }

}