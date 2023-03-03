import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-connection-issue',
	templateUrl: './app-connection-issue.component.html',
	styleUrls: ['./app-connection-issue.component.scss']
})
export class AppConnectionIssueComponent {
	constructor(private router: Router) {}
	reload() {
		this.router.navigate([this.router.url]);
	}
}
