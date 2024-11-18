import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KitcosmeticosPage } from './kitcosmeticos.page';

describe('KitcosmeticosPage', () => {
  let component: KitcosmeticosPage;
  let fixture: ComponentFixture<KitcosmeticosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KitcosmeticosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
