import { Component, EventEmitter, Output } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	@Output() toggleDrawer = new EventEmitter();

	constructor(private authService: AuthService) {}

	logout() {
		this.authService.logout();
	}
}
