import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
	template: ''
})
export abstract class DrawerBaseComponent implements OnInit, OnDestroy {
	abstract closeSideDrawer(data?: any): void;

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	ngOnDestroy(): void {
		throw new Error('Method not implemented.');
	}
}
