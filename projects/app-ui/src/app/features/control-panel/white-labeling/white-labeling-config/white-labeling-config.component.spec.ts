import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteLabelingConfigComponent } from './white-labeling-config.component';

describe('WhiteLabelingConfigComponent', () => {
  let component: WhiteLabelingConfigComponent;
  let fixture: ComponentFixture<WhiteLabelingConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiteLabelingConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteLabelingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
