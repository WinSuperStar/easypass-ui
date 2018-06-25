import { TestBed, inject } from '@angular/core/testing';

import { OdrLeaveGuardService } from './odr-leave-guard.service';

describe('OdrLeaveGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OdrLeaveGuardService]
    });
  });

  it('should be created', inject([OdrLeaveGuardService], (service: OdrLeaveGuardService) => {
    expect(service).toBeTruthy();
  }));
});
