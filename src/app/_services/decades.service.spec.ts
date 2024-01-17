import { TestBed } from '@angular/core/testing';

import { DecadesService } from './decades.service';

describe('DecadesService', () => {
  let service: DecadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
