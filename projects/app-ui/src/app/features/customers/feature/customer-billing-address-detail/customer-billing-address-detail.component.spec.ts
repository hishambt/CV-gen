import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBillingAddressDetailComponent } from './customer-billing-address-detail.component';

describe('CustomerAddressBookDetailComponent', () => {
	let component: CustomerBillingAddressDetailComponent;
	let fixture: ComponentFixture<CustomerBillingAddressDetailComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CustomerBillingAddressDetailComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(CustomerBillingAddressDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
