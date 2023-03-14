import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CabService } from './api/cab.service';
import { CustomerService } from './api/customer.service';
import { LoginService } from './api/login.service';
import { WinnerService } from './api/winner.service';
import { HomeService } from './api/home.service';
import { OrderService } from './api/order.service';
import { ProductService } from './api/product.service';

@NgModule({
	imports: [],
	declarations: [],
	exports: [],
	providers: [CabService, CustomerService, LoginService, WinnerService, HomeService, OrderService, ProductService]
})
export class ApiModule {
	constructor(@Optional() @SkipSelf() parentModule: ApiModule, @Optional() http: HttpClient) {
		if (parentModule) {
			throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
		}
		if (!http) {
			throw new Error(
				'You need to import the HttpClientModule in your AppModule! \n' + 'See also https://github.com/angular/angular/issues/20575'
			);
		}
	}
}
