import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresapprComponent } from './presappr.component';

describe('PresapprComponent', () => {
  let component: PresapprComponent;
  let fixture: ComponentFixture<PresapprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresapprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresapprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
