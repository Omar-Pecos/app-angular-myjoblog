import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJornadasComponent } from './all-jornadas.component';

describe('AllJornadasComponent', () => {
  let component: AllJornadasComponent;
  let fixture: ComponentFixture<AllJornadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllJornadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllJornadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
