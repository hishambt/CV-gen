import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ComponentRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ComponentItem } from '../../../shared/models/componentItem';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
	@ViewChild('target', { read: ViewContainerRef, static: true }) vcRef!: ViewContainerRef;

	targetComponent: any;
	private componentRef!: ComponentRef<any>;
	portal!: ComponentPortal<any>;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) {}

	ngOnInit(): void {
		this.targetComponent = this.data.component;
		this.targetComponent.then((m: any) => {
			const comp = new ComponentItem(m);
			const viewContainerRef = this.vcRef;
			this.componentRef = viewContainerRef.createComponent<any>(comp.component);
			this.componentRef.instance.isDialogMode = true;
			this.componentRef.instance.formMode = this.data.formMode;
			this.componentRef.instance.formData = this.data.data;
			this.componentRef.instance.index = this.data.index;
			this.componentRef.instance.closeDrawer.subscribe((res: any) => {
				// this.appFormSharingService.closeComponent();
				viewContainerRef.clear();
				// this.toggleDrawer();
				this.onNoClick(res);
			});
		});
	}

	onNoClick(res?: any): void {
		this.dialogRef.close(res);
	}
}
