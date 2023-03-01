import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListCardComponent } from './orders-list-card.component';

describe('OrdersListCardComponent', () => {
  let component: OrdersListCardComponent;
  let fixture: ComponentFixture<OrdersListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
