import { TestBed } from '@angular/core/testing';

import { APISerService } from './api-ser.service';

describe('APISerService', () => {
  let service: APISerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APISerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
