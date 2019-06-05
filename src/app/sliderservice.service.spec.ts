import { TestBed } from '@angular/core/testing';

import { SliderserviceService } from './sliderservice.service';

describe('SliderserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SliderserviceService = TestBed.get(SliderserviceService);
    expect(service).toBeTruthy();
  });
});
