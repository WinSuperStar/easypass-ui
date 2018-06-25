import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdrmgtSavedComponent } from './odrmgt-saved.component';

describe('OdrmgtSavedComponent', () => {
  let component: OdrmgtSavedComponent;
  let fixture: ComponentFixture<OdrmgtSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdrmgtSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdrmgtSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
