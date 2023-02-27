import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {
	constructor(private swUpdate: SwUpdate, private router: Router) {}

	public checkForUpdates(): void {
		if (this.swUpdate.isEnabled) {
			this.swUpdate.versionUpdates.pipe(filter((evt) => evt.type === 'VERSION_READY')).subscribe(() => {
				if (confirm('New version available. Load New Version?')) {
					this.swUpdate.activateUpdate().then(() => {
						window.location.reload();
					});
				}
			});
		}

		this.setUpdateCheck();
	}

	public setUpdateCheck() {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
			} else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
				this.swUpdate.checkForUpdate();
			}
		});
	}
}
