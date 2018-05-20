import { TestBed, inject } from '@angular/core/testing';

import { PresaleService } from './presale.service';

describe('PresaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PresaleService]
    });
  });

  it('should be created', inject([PresaleService], (service: PresaleService) => {
    expect(service).toBeTruthy();
  }));
});
