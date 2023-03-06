import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-shell-connection-issue',
	templateUrl: './shell-connection-issue.component.html',
	styleUrls: ['./shell-connection-issue.component.scss']
})
export class ShellConnectionIssueComponent {
	constructor(private router: Router) {}
	reload() {
		this.router.navigate([this.router.url]);
	}
}
