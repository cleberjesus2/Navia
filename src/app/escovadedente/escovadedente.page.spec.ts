import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscovadedentePage } from './escovadedente.page';

describe('EscovadedentePage', () => {
  let component: EscovadedentePage;
  let fixture: ComponentFixture<EscovadedentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EscovadedentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
