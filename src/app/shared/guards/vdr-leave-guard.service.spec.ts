import { TestBed, inject } from '@angular/core/testing';

import { VdrLeaveGuardService } from './vdr-leave-guard.service';

describe('VdrLeaveGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VdrLeaveGuardService]
    });
  });

  it('should be created', inject([VdrLeaveGuardService], (service: VdrLeaveGuardService) => {
    expect(service).toBeTruthy();
  }));
});
