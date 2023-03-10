import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLinksComponent } from './customer-links.component';

describe('CustomerLinksComponent', () => {
  let component: CustomerLinksComponent;
  let fixture: ComponentFixture<CustomerLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
