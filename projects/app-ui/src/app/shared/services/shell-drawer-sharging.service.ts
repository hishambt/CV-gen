import { Injectable } from '@angular/core';
import { Customer } from 'projects/app-api/src/model/customer';
import { Subject } from 'rxjs';

export interface DrawerDetails {
	controlName?: string;
	rowIndex?: string;
}

@Injectable({ providedIn: 'root' })
export class ShellDrawerSharingService {
	private openCreateCustomerDrawer = new Subject<Customer>();
	openCreateCustomerDrawer$ = this.openCreateCustomerDrawer.asObservable();

	private publishDataOnClose = new Subject<any>();
	publishDataOnClose$ = this.publishDataOnClose.asObservable();

	private targetComponentDetails: DrawerDetails = {};

	openCreateCustomerDrawerData(customer: Customer): void {
		this.openCreateCustomerDrawer.next(customer);
	}

	sendDataOnClose(data: any): void {
		this.publishDataOnClose.next(data);
	}
}
