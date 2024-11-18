import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OleonaturalPage } from './oleonatural.page';

describe('OleonaturalPage', () => {
  let component: OleonaturalPage;
  let fixture: ComponentFixture<OleonaturalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OleonaturalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
