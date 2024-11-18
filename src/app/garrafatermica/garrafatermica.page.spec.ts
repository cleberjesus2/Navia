import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GarrafatermicaPage } from './garrafatermica.page';

describe('GarrafatermicaPage', () => {
  let component: GarrafatermicaPage;
  let fixture: ComponentFixture<GarrafatermicaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GarrafatermicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
