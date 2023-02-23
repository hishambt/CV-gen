import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as packageInfo from '../../../../package.json';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	private _packageInfo = (packageInfo as any).default;
	version = this._packageInfo.version;
	constructor(translate: TranslateService) {
		console.log('Version: ' + this.version);
		// this language will be used as a fallback when a translation isn't found in the current language
		translate.addLangs(['en', 'ar']);
		translate.setDefaultLang('en');
		translate.use('en');

		// the lang to use, if the lang isn't available, it will use the current loader to get them
	}
}
