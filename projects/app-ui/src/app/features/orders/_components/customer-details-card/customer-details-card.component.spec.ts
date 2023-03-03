import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsCardComponent } from './customer-details-card.component';

describe('CustomerDetailsCardComponent', () => {
	let component: CustomerDetailsCardComponent;
	let fixture: ComponentFixture<CustomerDetailsCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CustomerDetailsCardComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(CustomerDetailsCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
