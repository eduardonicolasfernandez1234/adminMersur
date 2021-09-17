import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaDocComponent } from './entrega-doc.component';

describe('EntregaDocComponent', () => {
  let component: EntregaDocComponent;
  let fixture: ComponentFixture<EntregaDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
