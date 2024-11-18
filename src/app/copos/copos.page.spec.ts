import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoposPage } from './copos.page';

describe('CoposPage', () => {
  let component: CoposPage;
  let fixture: ComponentFixture<CoposPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CoposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
