import { Component, OnInit } from '@angular/core';
import { HomeService } from 'projects/app-api/src/api/home.service';

@Component({
	selector: 'app-orders-list-card',
	templateUrl: './orders-list-card.component.html',
	styleUrls: ['./orders-list-card.component.scss']
})
export class OrdersListCardComponent implements OnInit {
	data: any;
	constructor(private homeService: HomeService) {}

	ngOnInit(): void {
		this.homeService.apiLastestOrdersGet(5).subscribe((res) => {
			this.data = res;
		});
	}
}
