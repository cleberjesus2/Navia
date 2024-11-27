import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarOrganizadorPage } from './registrar-organizador.page';

describe('RegistrarOrganizadorPage', () => {
  let component: RegistrarOrganizadorPage;
  let fixture: ComponentFixture<RegistrarOrganizadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarOrganizadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
