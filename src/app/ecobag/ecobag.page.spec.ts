import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcobagPage } from './ecobag.page';

describe('EcobagPage', () => {
  let component: EcobagPage;
  let fixture: ComponentFixture<EcobagPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EcobagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
