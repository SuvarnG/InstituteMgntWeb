import { TestBed } from '@angular/core/testing';

import { InstituteAdminService } from '../Services/institute-admin.service';

describe('InstituteAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstituteAdminService = TestBed.get(InstituteAdminService);
    expect(service).toBeTruthy();
  });
});
