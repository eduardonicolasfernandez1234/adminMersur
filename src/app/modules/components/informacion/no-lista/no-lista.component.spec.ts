import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoListaComponent } from './no-lista.component';

describe('NoListaComponent', () => {
  let component: NoListaComponent;
  let fixture: ComponentFixture<NoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
