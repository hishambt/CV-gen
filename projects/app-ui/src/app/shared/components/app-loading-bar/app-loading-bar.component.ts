import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from '../../services/app-settings.service';

@Component({
	selector: 'app-loading-bar',
	templateUrl: './app-loading-bar.component.html',
	styleUrls: ['./app-loading-bar.component.scss']
})
export class AppLoadingBarComponent implements OnInit {
	public isLoading = false;

	constructor(private appSettingsService: AppSettingsService) {}

	ngOnInit(): void {
		this.appSettingsService.isAppLoading$.subscribe((res: boolean) => {
			this.isLoading = res;
		});
	}
}
