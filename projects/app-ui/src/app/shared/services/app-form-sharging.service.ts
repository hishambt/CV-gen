import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'projects/app-api/src/model/customer';
import { BehaviorSubject, Subject } from 'rxjs';

import { DialogComponent } from '../../shell/_components/dialog/dialog.component';
import { DrawerComponentItem } from '../models/drawerComponentItem';

export interface DrawerDetails {
	controlName?: string;
	rowIndex?: string;
}

@Injectable({ providedIn: 'root' })
export class AppFormSharingService {
	private openCreateCustomerDrawer = new Subject<Customer>();
	openCreateCustomerDrawer$ = this.openCreateCustomerDrawer.asObservable();

	private publishDataOnClose = new Subject<any>();
	publishDataOnClose$ = this.publishDataOnClose.asObservable();

	private onCloseComponentInDrawer = new Subject<any>();
	onCloseComponentInDrawer$ = this.onCloseComponentInDrawer.asObservable();

	private drawerCompoents = new BehaviorSubject<DrawerComponentItem[]>([]);
	drawerCompoents$ = this.drawerCompoents.asObservable();

	private activeComponents: DrawerComponentItem[] = [];

	private dialogRef!: MatDialogRef<any> | null;

	private activeDialogComponents: DrawerComponentItem[] = [];

	private dialogCompoents = new BehaviorSubject<DrawerComponentItem[]>([]);
	dialogCompoents$ = this.dialogCompoents.asObservable();

	constructor(private dialog: MatDialog) {}

	/**
	 * Send and Open component in drawer
	 * @param componentName component reference
	 * @param data any
	 * @param formMode 'edit' | 'add'
	 */
	openComponentInDrawer(componentName: any, data: any, formMode: 'edit' | 'add') {
		const activeComponent: DrawerComponentItem = {
			component: componentName,
			index: this.activeComponents.length,
			data: data,
			formMode: formMode
		};

		this.activeComponents.push(activeComponent);
		this.drawerCompoents.next(this.activeComponents);
	}

	sendDataOnClose(data: any): void {
		this.publishDataOnClose.next(data);
	}

	closeComponent(data?: any): void {
		this.onCloseComponentInDrawer.next(data);
		this.activeComponents.pop();
		setTimeout(() => {
			this.drawerCompoents.next(this.activeComponents);
		}, 50);
	}

	//#endregion Dialog
	openComponentInDialog(component: any, formMode: 'edit' | 'add', data?: any) {
		const activeComponent: DrawerComponentItem = {
			component: component,
			index: this.activeDialogComponents.length,
			data: data,
			formMode: formMode
		};
		this.activeDialogComponents.push(activeComponent);
		this.dialogCompoents.next(this.activeDialogComponents);
		this.openDialog(activeComponent);
	}

	private openDialog(comp: DrawerComponentItem) {
		const data = { data: comp };
		this.dialogRef = this.dialog.open(DialogComponent, data);

		this.dialogRef.afterClosed().subscribe((result: any) => {
			this.dialogRef = null;

			return result;
		});
	}

	//#region

	get activeComponentsCount(): number {
		return this.activeComponents.length;
	}

	get activeDialogComponentsCount(): number {
		return this.activeDialogComponents.length;
	}
}
