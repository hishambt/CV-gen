import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConnectionIssueComponent } from './app-connection-issue.component';

describe('AppConnectionIssueComponent', () => {
  let component: AppConnectionIssueComponent;
  let fixture: ComponentFixture<AppConnectionIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppConnectionIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppConnectionIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
