import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from '../../../shared/services/app-settings.service';

@Component({
	selector: 'app-shell-loading-bar',
	templateUrl: './shell-loading-bar.component.html',
	styleUrls: ['./shell-loading-bar.component.scss']
})
export class ShellLoadingBarComponent implements OnInit {
	public isLoading = false;

	constructor(private appSettingsService: AppSettingsService) {}

	ngOnInit(): void {
		this.appSettingsService.isAppLoading$.subscribe((res: boolean) => {
			this.isLoading = res;
		});
	}
}
