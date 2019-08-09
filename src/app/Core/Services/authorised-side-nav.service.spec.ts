import { TestBed } from '@angular/core/testing';

import { AuthorisedSideNavService } from './authorised-side-nav.service';

describe('AuthorisedSideNavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorisedSideNavService = TestBed.get(AuthorisedSideNavService);
    expect(service).toBeTruthy();
  });
});
