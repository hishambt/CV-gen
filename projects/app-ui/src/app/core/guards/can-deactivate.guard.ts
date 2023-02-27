import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

import { CanDeactivateDialogComponent } from '../../shared/components/dialogs/can-deactivate-dialog/can-deactivate-dialog.component';
import { ComponentCanDeactivate } from '../../shared/models/componentCanDeactivate';

@Injectable({
	providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
	private dialogRef!: MatDialogRef<any> | null;

	constructor(private dialog: MatDialog) {}

	canDeactivate(component: ComponentCanDeactivate): any {
		if (component.canDeactivate()) {
			return true;
		} else {
			if (!this.dialogRef) {
				return new Observable((observer: Subscriber<unknown>) => {
					this.dialogRef = this.dialog.open(CanDeactivateDialogComponent);

					this.dialogRef.afterClosed().subscribe((result: any) => {
						observer.next(Boolean(result));
						observer.complete();
						this.dialogRef = null;

						return result;
					});
				});
			} else {
				this.dialogRef = null;
			}
		}
	}
}
