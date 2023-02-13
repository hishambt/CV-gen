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

@Injectable()
export class CustomerService {
    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * Get all Customers
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @returns Array<Customer>
     */
    public apiCustomerGet(observe?: 'body'): Observable<Array<Customer>> {
        return this.httpClient.request<Array<Customer>>('get', `${this.basePath}/customers`,
            {
                headers: this.defaultHeaders,
                observe: observe
            }
        );
    }


    /**
     * Get Customer by Id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @returns Customer
     */
    public apiCustomerIdGet(id: string, observe?: 'body'): Observable<Customer> {
        return this.httpClient.request<Customer>('get', `${this.basePath}/customers/${encodeURIComponent(String(id))}`,
            {
                headers: this.defaultHeaders,
                observe: observe
            }
        );
    }

    /**
     * Post Customer
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @returns Customer
     */
    public apiCustomerPost(body?: Customer, observe?: 'body'): Observable<Customer> {
        return this.httpClient.request<Customer>('post', `${this.basePath}/customers`,
            {
                body: body,
                headers: this.defaultHeaders,
                observe: observe
            }
        );
    }

    /**
     * Update Customer by Id
     * @param id record id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @returns Customer
     */
    public apiCustomerPut(id: string, body?: Customer, observe: any = 'body'): Observable<HttpEvent<Customer>> {
        return this.httpClient.request<Customer>('put', `${this.basePath}/customers/${encodeURIComponent(String(id))}`,
            {
                body: body,
                headers: this.defaultHeaders,
                observe: observe
            }
        );
    }


    /**
     * Delete Customer by Id
     * @param id record id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @returns Customer
     */
    public apiCustomerIdDelete(id: string, observe: any = 'body'): Observable<HttpEvent<Customer>> {
        return this.httpClient.request<Customer>('delete', `${this.basePath}/customers/${encodeURIComponent(String(id))}`,
            {
                headers: this.defaultHeaders,
                observe: observe
            }
        );
    }

}