import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteLabelingThemeComponent } from './white-labeling-theme.component';

describe('WhiteLabelingThemeComponent', () => {
  let component: WhiteLabelingThemeComponent;
  let fixture: ComponentFixture<WhiteLabelingThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiteLabelingThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteLabelingThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
