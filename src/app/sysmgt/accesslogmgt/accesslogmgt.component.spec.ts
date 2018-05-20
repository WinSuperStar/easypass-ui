import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesslogmgtComponent } from './accesslogmgt.component';

describe('AccesslogmgtComponent', () => {
  let component: AccesslogmgtComponent;
  let fixture: ComponentFixture<AccesslogmgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesslogmgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesslogmgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
