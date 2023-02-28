import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as packageInfo from '../../../../package.json';
import { AppUpdateService } from './shared/services/app-update.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	private _packageInfo = (packageInfo as any).default;
	version = this._packageInfo.version;
	online!: boolean;
	constructor(translate: TranslateService, private appUpdateService: AppUpdateService) {
		console.log('Version: ' + this.version);
		// this language will be used as a fallback when a translation isn't found in the current language
		translate.addLangs(['en', 'ar']);
		translate.setDefaultLang('en');
		translate.use('en');

		// the lang to use, if the lang isn't available, it will use the current loader to get them
	}

	ngOnInit(): void {
		console.log('test 6');
		this.appUpdateService.checkForUpdates();
		this.connectionCheck();
	}

	connectionCheck() {
		if (typeof Worker !== 'undefined') {
			// Create a new
			const worker = new Worker(new URL('./app.worker', import.meta.url));

			worker.addEventListener('message', (event) => {
				this.online = event.data;
			});

			worker.postMessage('check');
			// Create a new
		} else {
			// Web Workers are not supported in this environment.
			// You should add a fallback so that your program still executes correctly.
		}
	}
}
