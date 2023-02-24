import { OnInit, Input, ComponentRef, ViewChild, Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { DrawerHostDirective } from '../../shared/directives/drawer-host.directive';
import { ComponentItem } from '../../shared/models/componentItem';
import { DrawerComponentItem } from '../../shared/models/drawerComponentItem';
import { ShellDrawerSharingService } from '../../shared/services/shell-drawer-sharging.service';

@Component({
	selector: 'app-drawer',
	templateUrl: './drawer.component.html',
	styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
	@ViewChild(DrawerHostDirective) appDrawerHost!: DrawerHostDirective;
	@ViewChild('drawerEnd') drawer!: MatDrawer;
	@Input() index = 0;
	// @Input() component = '';
	@Input() component!: DrawerComponentItem;
	private componentRef!: ComponentRef<any>;
	drawerComponents: DrawerComponentItem[] = [];
	targetComponent: any;

	constructor(private shellDrawerSharingService: ShellDrawerSharingService) {}

	ngOnInit(): void {
		console.log('test');
		// this.shellDrawerSharingService.drawerCompoents$.subscribe((res: DrawerComponentItem[]) => {
		// 	if (res) {
		// 		this.drawerComponents = res;

		// 		if (!this.componentRef) {
		// 			setTimeout(() => {
		// 				this.createDrawerComponent(res[this.index]);
		// 			}, 100);
		// 		}
		// 	}
		// });
		this.createDrawerComponent(this.component);
	}

	private createDrawerComponent(res: DrawerComponentItem) {
		this.targetComponent = res.component;
		this.targetComponent.then((m: any) => {
			const comp = new ComponentItem(m);
			const viewContainerRef = this.appDrawerHost.viewContainerRef;
			this.componentRef = viewContainerRef.createComponent<any>(comp.component);
			this.componentRef.instance.isDrawerMode = true;
			this.componentRef.instance.formMode = res.formMode;
			this.componentRef.instance.formData = res.data;
			this.componentRef.instance.index = res.index;
			this.componentRef.instance.closeDrawer.subscribe((res: any) => {
				this.shellDrawerSharingService.closeComponent();
				this.appDrawerHost.viewContainerRef.clear();
				this.toggleDrawer();
			});
		});
	}

	toggleDrawer() {
		this.drawer.opened = !this.drawer.opened;
	}

	// @HostListener('document:keydown.enter', ['$event']) onEnterHandler(): void {
	// 	// this.onSubmit();
	// }

	// @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(): void {
	// 	if (this.drawer.opened) {
	// 		if (this.drawerComponents.length - 1 == this.index) {
	// 			this.shellDrawerSharingService.closeComponent();
	// 			this.appDrawerHost.viewContainerRef.clear();
	// 			this.toggleDrawer();
	// 		}
	// 	}
	// }
}
