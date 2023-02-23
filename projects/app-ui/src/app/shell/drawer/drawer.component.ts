import { HostListener, OnInit, Input, ComponentRef, ViewChild, Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { CustomerFormComponent } from '../../features/customers/customer-form/customer-form.component';
import { DrawerHostDirective } from '../../shared/directives/drawer-host.directive';
import { ComponentItem } from '../../shared/models/componentItem';
import { ShellDrawerSharingService } from '../../shared/services/shell-drawer-sharging.service';
import { DrawerEmptyComponent } from './drawer-empty.component';

@Component({
	selector: 'app-drawer',
	templateUrl: './drawer.component.html',
	styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
	@ViewChild(DrawerHostDirective) appDrawerHost!: DrawerHostDirective;
	@ViewChild('drawerEnd') drawer!: MatDrawer;
	@Input() index = 0;
	@Input() componentName = '';

	componentRef!: ComponentRef<any>;
	drawerComponents: any[] = [];
	targetComponent: any;

	constructor(private shellDrawerSharingService: ShellDrawerSharingService) {}

	ngOnInit(): void {
		this.shellDrawerSharingService.drawerCompoents$.subscribe((res: any[]) => {
			if (res) {
				this.drawerComponents = res;

				if (!this.componentRef) {
					setTimeout(() => {
						this.createDrawerComponent(res);
					}, 100);
				}
			}
		});
	}

	private createDrawerComponent(res: any) {
		this.targetComponent = this.getComponent(res[this.index].name);

		const comp = new ComponentItem(this.targetComponent);
		const viewContainerRef = this.appDrawerHost.viewContainerRef;

		this.componentRef = viewContainerRef.createComponent<CustomerFormComponent>(comp.component);
		this.componentRef.instance.isDrawerMode = true;
		this.componentRef.instance.formMode = 'add';
		// componentRef.instance.data = adItem.data;
	}

	getComponent(name: string): any {
		let target;
		switch (name) {
			case 'CustomerFormComponent':
				target = CustomerFormComponent;
				break;

			default:
				target = DrawerEmptyComponent;
				break;
		}

		return target;
	}

	toggleDrawer() {
		this.drawer.opened = !this.drawer.opened;
	}

	@HostListener('document:keydown.enter', ['$event']) onEnterHandler(): void {
		// this.onSubmit();
	}

	@HostListener('document:keydown.escape', ['$event']) onEscapeHandler(): void {
		if (this.drawer.opened) {
			if (this.drawerComponents.length - 1 == this.index) {
				this.shellDrawerSharingService.closeComponent();
				this.appDrawerHost.viewContainerRef.clear();
				this.toggleDrawer();
			}
		}
	}
}
