import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
	@Input() name!: string;
	@Input() src!: string;
	@Input() size: number = 50;
	constructor() {}
}
