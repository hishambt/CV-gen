import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsNextListComponent } from './whats-next-list.component';

describe('WhatsNextListComponent', () => {
  let component: WhatsNextListComponent;
  let fixture: ComponentFixture<WhatsNextListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsNextListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsNextListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
