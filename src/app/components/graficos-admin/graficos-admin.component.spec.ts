import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosAdminComponent } from './graficos-admin.component';

describe('GraficosAdminComponent', () => {
  let component: GraficosAdminComponent;
  let fixture: ComponentFixture<GraficosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
