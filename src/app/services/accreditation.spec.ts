import { TestBed } from '@angular/core/testing';

import { AccreditationService } from './accreditation';

describe('Accreditation', () => {
  let service: AccreditationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccreditationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
