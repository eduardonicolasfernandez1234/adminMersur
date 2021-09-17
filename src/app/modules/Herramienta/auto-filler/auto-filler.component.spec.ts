import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFillerComponent } from './auto-filler.component';

describe('AutoFillerComponent', () => {
  let component: AutoFillerComponent;
  let fixture: ComponentFixture<AutoFillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoFillerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
