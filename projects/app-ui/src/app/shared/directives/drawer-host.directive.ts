import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ standalone: true, selector: '[appDrawerHost]' })
export class DrawerHostDirective {
	constructor(public viewContainerRef: ViewContainerRef) {}
}
