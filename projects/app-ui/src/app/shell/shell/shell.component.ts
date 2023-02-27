import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild, ComponentRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { DrawerHostDirective } from '../../shared/directives/drawer-host.directive';
import { DrawerComponentItem } from '../../shared/models/drawerComponentItem';
import { AppFormSharingService } from '../../shared/services/app-form-sharging.service';

@Component({
	selector: 'app-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnDestroy {
	@ViewChild(DrawerHostDirective) appDrawerHost!: DrawerHostDirective;
	@ViewChild('drawerEnd') drawer!: MatDrawer;
	mobileQuery: MediaQueryList;
	componentRef!: ComponentRef<any>;
	drawerComponents: any[] = [];
	dialogComponents: any[] = [];

	private _mobileQueryListener: () => void;

	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private appFormSharingService: AppFormSharingService) {
		this.mobileQuery = media.matchMedia('(max-width: 576px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addEventListener('change', this._mobileQueryListener, false);

		this.appFormSharingService.drawerCompoents$.subscribe((res: DrawerComponentItem[]) => {
			this.drawerComponents = res;
		});
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeEventListener('change', this._mobileQueryListener, false);
	}

	toggleDrawer() {
		this.drawer.opened = !this.drawer.opened;
	}

	onSubmit() {}
}
