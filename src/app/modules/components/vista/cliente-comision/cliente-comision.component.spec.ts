import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteComisionComponent } from './cliente-comision.component';

describe('ClienteComisionComponent', () => {
  let component: ClienteComisionComponent;
  let fixture: ComponentFixture<ClienteComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteComisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
