import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvertiseProductPage } from './advertise-product.page';

describe('AdvertiseProductPage', () => {
  let component: AdvertiseProductPage;
  let fixture: ComponentFixture<AdvertiseProductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
