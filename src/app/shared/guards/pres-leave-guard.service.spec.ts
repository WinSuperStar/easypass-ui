import { TestBed, inject } from '@angular/core/testing';

import { PresLeaveGuardService } from './pres-leave-guard.service';

describe('PresLeaveGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PresLeaveGuardService]
    });
  });

  it('should be created', inject([PresLeaveGuardService], (service: PresLeaveGuardService) => {
    expect(service).toBeTruthy();
  }));
});
