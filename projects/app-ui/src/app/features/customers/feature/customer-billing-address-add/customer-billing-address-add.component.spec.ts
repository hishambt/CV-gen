import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBillingAddressAddComponent } from './customer-billing-address-add.component';

describe('CustomerBillingAddressAddComponent', () => {
	let component: CustomerBillingAddressAddComponent;
	let fixture: ComponentFixture<CustomerBillingAddressAddComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CustomerBillingAddressAddComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(CustomerBillingAddressAddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
