import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActionButton } from '../../models/actionButton';
import { BreadcrumbItem } from '../../models/breadcrumbItem';

@Component({
	selector: 'app-page-header',
	templateUrl: './page-header.component.html',
	styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
	@Input() breadcrumbItems!: BreadcrumbItem[];
	@Input() title: string = 'undefined';
	@Input() actionButtons: ActionButton[] = [];
	@Input() isDrawerMode: boolean = false;

	@Output() buttonClick = new EventEmitter<string>();

	constructor() {}

	onActionSubmit(text: any) {
		this.buttonClick.emit(text);
	}
}
