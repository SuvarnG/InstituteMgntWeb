import { TestBed } from '@angular/core/testing';

import { BanktransactionService } from './banktransaction.service';

describe('BanktransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BanktransactionService = TestBed.get(BanktransactionService);
    expect(service).toBeTruthy();
  });
});
