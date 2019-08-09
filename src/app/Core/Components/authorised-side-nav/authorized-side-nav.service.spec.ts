import { TestBed } from '@angular/core/testing';

import { AuthorizedSideNavService } from './authorized-side-nav.service';

describe('AuthorizedSideNavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizedSideNavService = TestBed.get(AuthorizedSideNavService);
    expect(service).toBeTruthy();
  });
});
