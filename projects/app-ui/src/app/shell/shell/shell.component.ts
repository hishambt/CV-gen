import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild, ComponentRef, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { AuthService } from '../../core/services/auth.service';
import { BaseComponent } from '../../shared/bases/base.component';
import { DrawerHostDirective } from '../../shared/directives/drawer-host.directive';
import { DrawerComponentItem } from '../../shared/models/drawerComponentItem';
import { AppFormSharingService } from '../../shared/services/app-form-sharging.service';
import { AppSettingsService } from '../../shared/services/app-settings.service';
import { ErrorService } from '../../shared/services/error.service';

@Component({
	selector: 'app-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss']
})
export class ShellComponent extends BaseComponent implements OnInit, OnDestroy {
	@ViewChild(DrawerHostDirective) appDrawerHost!: DrawerHostDirective;
	@ViewChild('drawerEnd') drawer!: MatDrawer;
	mobileQuery: MediaQueryList;
	componentRef!: ComponentRef<any>;
	drawerComponents: any[] = [];
	dialogComponents: any[] = [];
	isConnectionOK: boolean = true;

	private _mobileQueryListener: () => void;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private media: MediaMatcher,
		private appFormSharingService: AppFormSharingService,
		private appSettingsService: AppSettingsService,
		errorService: ErrorService,
		authService: AuthService
	) {
		super(errorService, authService);
		this.mobileQuery = media.matchMedia('(max-width: 576px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addEventListener('change', this._mobileQueryListener, false);

		this.appFormSharingService.drawerCompoents$.subscribe((res: DrawerComponentItem[]) => {
			this.drawerComponents = res;
		});

		this.appSettingsService.connectionStatus$.subscribe((res) => {
			this.isConnectionOK = res;
		});
	}

	override ngOnInit(): void {
		super.ngOnInit();
	}

	toggleDrawer() {
		this.drawer.opened = !this.drawer.opened;
	}

	onSubmit() {}

	override ngOnDestroy(): void {
		super.ngOnDestroy();
		this.mobileQuery.removeEventListener('change', this._mobileQueryListener, false);
	}
}
