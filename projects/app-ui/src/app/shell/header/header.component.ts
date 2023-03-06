import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	@Output() toggleDrawer = new EventEmitter();
	@Input() isOnline!: boolean;
	constructor(private authService: AuthService) {}

	logout() {
		this.authService.logout();
	}
}
