import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellConnectionIssueComponent } from './shell-connection-issue.component';

describe('ShellConnectionIssueComponent', () => {
  let component: ShellConnectionIssueComponent;
  let fixture: ComponentFixture<ShellConnectionIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellConnectionIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShellConnectionIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
