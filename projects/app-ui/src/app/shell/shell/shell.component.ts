import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, Type, ComponentRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

import { CustomerFormComponent } from '../../features/customers/customer-form/customer-form.component';
import { DrawerHostDirective } from '../../shared/directives/drawer-host.directive';
import { ComponentItem } from '../../shared/models/componentItem';
import { ShellDrawerSharingService } from '../../shared/services/shell-drawer-sharging.service';

@Component({
	selector: 'app-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
	@ViewChild(DrawerHostDirective) appDrawerHost!: DrawerHostDirective;
	@ViewChild('drawerEnd') drawer!: MatDrawer;
	mobileQuery: MediaQueryList;
	openCreateCustomerDrawerSubscription!: Subscription;
	componentRef!: ComponentRef<any>;
	drawerComponent: any[] = [];

	private _mobileQueryListener: () => void;

	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private shellDrawerSharingService: ShellDrawerSharingService) {
		this.mobileQuery = media.matchMedia('(max-width: 576px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addEventListener('change', this._mobileQueryListener, false);

		this.shellDrawerSharingService.drawerCompoents$.subscribe((res) => {
			this.drawerComponent = res;
		});
	}

	ngOnInit(): void {
		this.openCreateCustomerDrawerSubscription = this.shellDrawerSharingService.openCreateCustomerDrawer$.subscribe((payload) => {
			this.createDrawerComponent(CustomerFormComponent);
			this.componentRef.instance.isDrawerMode = true;
			this.componentRef.instance.formMode = 'add';
			this.componentRef.instance.customer = payload;
			this.componentRef.instance.closeDrawer.subscribe((res: any) => {
				this.shellDrawerSharingService.sendDataOnClose(res);
				this.appDrawerHost.viewContainerRef.clear();
				this.toggleDrawer();
			});
		});
	}

	private createDrawerComponent(component: Type<any>) {
		const comp = new ComponentItem(component);
		const viewContainerRef = this.appDrawerHost.viewContainerRef;
		viewContainerRef.clear();
		this.drawer.opened = true;
		this.componentRef = viewContainerRef.createComponent<CustomerFormComponent>(comp.component);
		// componentRef.instance.data = adItem.data;
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeEventListener('change', this._mobileQueryListener, false);

		if (this.openCreateCustomerDrawerSubscription) {
			this.openCreateCustomerDrawerSubscription.unsubscribe();
		}
	}

	toggleDrawer() {
		this.drawer.opened = !this.drawer.opened;
	}

	onSubmit() {}

	// @HostListener('document:keydown.enter', ['$event']) onEnterHandler(): void {
	// 	this.onSubmit();
	// }

	// @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(): void {
	// 	if (this.drawer.opened) {
	// 		this.toggleDrawer();
	// 	}
	// }
}
