import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtensilioscozinhaPage } from './utensilioscozinha.page';

describe('UtensilioscozinhaPage', () => {
  let component: UtensilioscozinhaPage;
  let fixture: ComponentFixture<UtensilioscozinhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UtensilioscozinhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
