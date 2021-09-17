import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlazoComponent } from './lista-plazo.component';

describe('ListaPlazoComponent', () => {
  let component: ListaPlazoComponent;
  let fixture: ComponentFixture<ListaPlazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPlazoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
