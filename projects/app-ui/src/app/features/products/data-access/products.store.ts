import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ProductService } from 'projects/app-api/src/api/product.service';
import { first, switchMap, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ProductsStore extends ComponentStore<any> {
	readonly products$ = this.select((state) => state.Data);

	loadProducts = this.effect(($) =>
		$.pipe(
			first(),
			switchMap(() =>
				this.productService.apiProductsGet().pipe(
					tap({
						next: (products) => {
							return this.patchState(products);
						}
					})
				)
			)
		)
	);

	constructor(private productService: ProductService) {
		super({
			Data: [],
			Count: 0,
			HasData: false,
			SearchInfo: null
		});
	}
}
