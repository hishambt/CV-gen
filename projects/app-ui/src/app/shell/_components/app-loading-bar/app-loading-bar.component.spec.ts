import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoadingBarComponent } from './app-loading-bar.component';

describe('AppLoadingBarComponent', () => {
  let component: AppLoadingBarComponent;
  let fixture: ComponentFixture<AppLoadingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLoadingBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLoadingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
