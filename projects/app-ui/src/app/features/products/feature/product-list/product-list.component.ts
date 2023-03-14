import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/app-ui/src/app/core/services/auth.service';
import { BaseComponent } from 'projects/app-ui/src/app/shared/bases/base.component';
import { AppErrorService } from 'projects/app-ui/src/app/shared/services/app-error.service';

import { ProductsStore } from '../../data-access/products.store';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseComponent implements OnInit {
	displayedColumns: string[] = ['ProductTitle'];

	constructor(public productsStore: ProductsStore, private router: Router, authService: AuthService, appErrorService: AppErrorService) {
		super(authService, appErrorService);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.productsStore.loadProducts();
	}

	viewRecord(row: any) {
		this.router.navigate(['/products', row.Id, 'view']);
	}

	onPageHeaderActionClick(value: any) {
		switch (value) {
			case 'Add Product':
				this.router.navigate(['/products/add']);
				break;
		}
	}
}
