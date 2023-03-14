import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/app-ui/src/app/core/services/auth.service';
import { BaseComponent } from 'projects/app-ui/src/app/shared/bases/base.component';
import { AppErrorService } from 'projects/app-ui/src/app/shared/services/app-error.service';
import { map, shareReplay, switchMap } from 'rxjs';

import { ProductsStore } from '../../data-access/products.store';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent extends BaseComponent implements OnInit {
	product$ = this.route.paramMap.pipe(
		switchMap((params) =>
			this.productsStore.products$.pipe(
				shareReplay(1),
				map((products) => (products ? products.find((product: any) => product.Id === Number(params.get('id'))) : null))
			)
		)
	);

	constructor(
		private productsStore: ProductsStore,
		private router: Router,
		private route: ActivatedRoute,
		authService: AuthService,
		appErrorService: AppErrorService
	) {
		super(authService, appErrorService);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.productsStore.loadProducts();
	}

	onActionClick(value: any, _mode?: string) {
		switch (value) {
			case 'Back':
				this.router.navigate(['/orders']);
				break;
		}
	}

	onPageHeaderActionClick(value: any) {
		switch (value) {
			case 'Edit':
				this.router.navigate(['../edit'], { relativeTo: this.route });
				break;
		}
	}
}
